// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — editor/canvas.js
//  Infinite canvas: pan, zoom, grid snap, minimap
//  Performance: throttled dragMove, RAF minimap
// ═══════════════════════════════════════════════

export const Canvas = {
  // State is passed in from App.state
  _state: null,

  init(state) {
    this._state = state;
    const cvs = document.getElementById('inf-canvas');
    const vp  = document.getElementById('canvas-vp');
    if (!cvs || !vp) return;

    // ── Pan with middle mouse or space+drag ──
    cvs.addEventListener('mousedown', e => {
      if (e.button === 1 || (e.button === 0 && state.tool === 'pan')) {
        state.panning = true;
        state.px = e.clientX - state.cx;
        state.py = e.clientY - state.cy;
        cvs.style.cursor = 'grabbing';
        e.preventDefault();
      } else if (e.button === 0 && (e.target === cvs || e.target === vp)) {
        // Deselect on canvas click
        state.selId = null;
        document.dispatchEvent(new CustomEvent('rf:deselect'));
      }
    });

    window.addEventListener('mousemove', e => {
      if (!state.panning) return;
      state.cx = e.clientX - state.px;
      state.cy = e.clientY - state.py;
      this.applyTransform();
      this.minimap.renderThrottled();
    });

    window.addEventListener('mouseup', e => {
      if (state.panning) {
        state.panning = false;
        cvs.style.cursor = state.tool === 'pan' ? 'grab' : '';
      }
    });

    // ── Zoom with wheel ──
    cvs.addEventListener('wheel', e => {
      e.preventDefault();
      const rect = cvs.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const delta = e.deltaY < 0 ? 0.12 : -0.12;
      const newZ = Math.min(Math.max(state.cz + delta, 0.15), 3);
      // Zoom toward mouse position
      state.cx = mx - (mx - state.cx) * (newZ / state.cz);
      state.cy = my - (my - state.cy) * (newZ / state.cz);
      state.cz = newZ;
      this.applyTransform();
      this.minimap.renderThrottled();
    }, {passive: false});

    // Touch pan/zoom (mobile)
    let lastTouches = null;
    cvs.addEventListener('touchstart', e => {
      lastTouches = e.touches;
      e.preventDefault();
    }, {passive: false});

    cvs.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 1 && lastTouches?.length === 1) {
        const dx = e.touches[0].clientX - lastTouches[0].clientX;
        const dy = e.touches[0].clientY - lastTouches[0].clientY;
        state.cx += dx; state.cy += dy;
        this.applyTransform();
      } else if (e.touches.length === 2 && lastTouches?.length === 2) {
        const d1 = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        const d2 = Math.hypot(lastTouches[0].clientX - lastTouches[1].clientX, lastTouches[0].clientY - lastTouches[1].clientY);
        if (d2 > 0) {
          const scale = d1 / d2;
          state.cz = Math.min(Math.max(state.cz * scale, 0.15), 3);
          this.applyTransform();
        }
      }
      lastTouches = e.touches;
    }, {passive: false});
  },

  applyTransform() {
    const vp = document.getElementById('canvas-vp');
    const zl = document.getElementById('zoom-lbl');
    if (vp) vp.style.transform = `translate(${this._state.cx}px,${this._state.cy}px) scale(${this._state.cz})`;
    if (zl) zl.textContent = Math.round(this._state.cz * 100) + '%';
  },

  zoom(delta) {
    const s = this._state;
    s.cz = Math.min(Math.max(s.cz + delta, 0.15), 3);
    this.applyTransform();
    this.minimap.renderThrottled();
  },

  resetView() {
    const s = this._state;
    s.cx = 0; s.cy = 0; s.cz = 1;
    this.applyTransform();
    this.minimap.render();
  },

  setTool(t, el) {
    this._state.tool = t;
    document.querySelectorAll('.tb-btn[id^=tb-]').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');
    const cvs = document.getElementById('inf-canvas');
    if (cvs) cvs.style.cursor = t === 'pan' ? 'grab' : '';
  },

  toggleGrid() {
    this._state.gridSnap = !this._state.gridSnap;
    const btn = document.getElementById('tb-grid');
    if (btn) btn.classList.toggle('active', this._state.gridSnap);
  },

  snapToGrid(val, size = 24) {
    if (!this._state.gridSnap) return val;
    return Math.round(val / size) * size;
  },

  // ── Minimap ──
  minimap: {
    _visible: true,
    _rafPending: false,

    render() {
      const s = window._rfState;
      if (!s) return;
      const cvs = document.getElementById('mm-canvas');
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      const W = cvs.width, H = cvs.height;
      ctx.clearRect(0, 0, W, H);

      if (!s.nodes.length) return;

      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      s.nodes.forEach(n => {
        minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x + 240); maxY = Math.max(maxY, n.y + 120);
      });
      const pad = 20;
      minX -= pad; minY -= pad; maxX += pad; maxY += pad;
      const scX = W / (maxX - minX), scY = H / (maxY - minY);
      const sc = Math.min(scX, scY) * 0.9;
      const ox = (W - (maxX - minX) * sc) / 2 - minX * sc;
      const oy = (H - (maxY - minY) * sc) / 2 - minY * sc;

      // Draw nodes
      s.nodes.forEach(n => {
        ctx.fillStyle = n.color ? n.color + '55' : 'rgba(255,77,26,.3)';
        ctx.strokeStyle = n.color ? n.color + 'aa' : 'rgba(255,77,26,.6)';
        ctx.lineWidth = 1;
        const x = n.x * sc + ox, y = n.y * sc + oy;
        ctx.beginPath();
        ctx.roundRect(x, y, 240 * sc, 80 * sc, 2);
        ctx.fill(); ctx.stroke();
      });

      // Draw viewport indicator
      const inf = document.getElementById('inf-canvas');
      if (inf) {
        const vW = inf.clientWidth / s.cz, vH = inf.clientHeight / s.cz;
        const vX = -s.cx / s.cz, vY = -s.cy / s.cz;
        const vp = document.getElementById('mm-vp');
        if (vp) {
          vp.style.left   = (vX * sc + ox) + 'px';
          vp.style.top    = (vY * sc + oy) + 'px';
          vp.style.width  = (vW * sc) + 'px';
          vp.style.height = (vH * sc) + 'px';
        }
      }
    },

    renderThrottled() {
      if (this._rafPending) return;
      this._rafPending = true;
      requestAnimationFrame(() => { this.render(); this._rafPending = false; });
    },

    toggle() {
      this._visible = !this._visible;
      const mm = document.getElementById('minimap');
      if (mm) mm.style.display = this._visible ? 'block' : 'none';
    }
  }
};
