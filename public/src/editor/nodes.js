// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — editor/nodes.js
//  Node lifecycle: create, render, drag, delete
//  Performance: createElement instead of innerHTML
// ═══════════════════════════════════════════════

import { Canvas } from './canvas.js';

export const Nodes = {
  _state: null,
  _history: null,

  init(state, history) {
    this._state = state;
    this._history = history;
    this._setupDragDrop();
  },

  // ── Create a node from an explorer item ──
  create(item, x, y) {
    const s = this._state;
    const node = {
      uid: ++s.nc,
      id: item.id,
      type: item.name,
      icon: item.icon,
      color: item.color,
      props: { ...item.props },
      scripts: [],
      logic: [],
      x: Canvas.snapToGrid(x, 24),
      y: Canvas.snapToGrid(y, 24),
    };
    s.nodes.push(node);
    this.renderOne(node);
    this.updateCount();
    this._history?.push({
      desc: 'Add ' + item.name,
      undo: () => this.remove(node.uid, true),
      redo: () => { s.nodes.push(node); this.renderOne(node); this.updateCount(); }
    });
    document.dispatchEvent(new CustomEvent('rf:autosave'));
    return node;
  },

  // ── Render a single node to DOM using createElement (no innerHTML) ──
  renderOne(node) {
    const vp = document.getElementById('canvas-vp');
    let div = document.getElementById('n-' + node.uid);

    if (!div) {
      div = document.createElement('div');
      div.className = 'cnode';
      div.id = 'n-' + node.uid;
      vp?.appendChild(div);
    }

    div.style.left = node.x + 'px';
    div.style.top  = node.y + 'px';

    // Clear and rebuild with createElement
    div.innerHTML = '';

    // ── Header ──
    const head = document.createElement('div');
    head.className = 'nd-head';

    const ico = document.createElement('div');
    ico.className = 'nd-ico';
    ico.style.background = (node.color || '#4d8fff') + '22';
    ico.textContent = node.icon || '📦';

    const ta = document.createElement('div');
    ta.className = 'nd-ta';

    const nameEl = document.createElement('div');
    nameEl.className = 'nd-name';
    nameEl.textContent = node.type;

    const typeEl = document.createElement('div');
    typeEl.className = 'nd-type';
    typeEl.textContent = node.id;

    ta.appendChild(nameEl);
    ta.appendChild(typeEl);

    // Action buttons
    const acts = document.createElement('div');
    acts.className = 'nd-acts';

    const btnScript = document.createElement('div');
    btnScript.className = 'nd-act';
    btnScript.title = 'Script';
    btnScript.textContent = '📜';
    btnScript.addEventListener('click', e => {
      e.stopPropagation();
      document.dispatchEvent(new CustomEvent('rf:openScript', {detail: node}));
    });

    const btnDup = document.createElement('div');
    btnDup.className = 'nd-act';
    btnDup.title = 'Duplicar';
    btnDup.textContent = '⧉';
    btnDup.addEventListener('click', e => {
      e.stopPropagation();
      this.duplicate(node.uid);
    });

    const btnDel = document.createElement('div');
    btnDel.className = 'nd-act danger';
    btnDel.title = 'Deletar';
    btnDel.textContent = '✕';
    btnDel.addEventListener('click', e => {
      e.stopPropagation();
      this.remove(node.uid);
    });

    acts.appendChild(btnScript);
    acts.appendChild(btnDup);
    acts.appendChild(btnDel);

    head.appendChild(ico);
    head.appendChild(ta);
    head.appendChild(acts);
    div.appendChild(head);

    // ── Body: props ──
    if (node.props && Object.keys(node.props).length) {
      const body = document.createElement('div');
      body.className = 'nd-body';

      Object.entries(node.props).slice(0, 5).forEach(([key, val]) => {
        if (key === 'Name') return;
        const row = document.createElement('div');
        row.className = 'nd-prop-row';

        const lbl = document.createElement('div');
        lbl.className = 'nd-prop-lbl';
        lbl.textContent = key;

        const inp = document.createElement('input');
        inp.className = 'nd-prop-in';
        inp.value = val;
        inp.addEventListener('change', ev => {
          const old = node.props[key];
          const newVal = isNaN(ev.target.value) || ev.target.value === '' ? ev.target.value : Number(ev.target.value);
          node.props[key] = newVal;
          this._history?.push({
            desc: 'Edit ' + key,
            undo: () => { node.props[key] = old; this.renderOne(node); },
            redo: () => { node.props[key] = newVal; this.renderOne(node); }
          });
          document.dispatchEvent(new CustomEvent('rf:autosave'));
        });

        row.appendChild(lbl);
        row.appendChild(inp);
        body.appendChild(row);
      });

      // Script badge
      const badge = document.createElement('div');
      badge.className = 'nd-sbadge' + (node.scripts?.length ? ' has' : '');
      badge.textContent = node.scripts?.length ? `📜 ${node.scripts.length} script(s)` : '+ Adicionar Script';
      badge.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('rf:openScript', {detail: node}));
      });
      body.appendChild(badge);
      div.appendChild(body);
    }

    // ── Drag ──
    this._makeDraggable(div, node);

    // ── Click to select ──
    div.addEventListener('mousedown', e => {
      if (e.target.closest('.nd-act')) return;
      this.select(node.uid);
    });

    return div;
  },

  _makeDraggable(div, node) {
    const head = div.querySelector('.nd-head');
    if (!head) return;
    let dragging = false, startX, startY, startNodeX, startNodeY;

    head.addEventListener('mousedown', e => {
      if (e.button !== 0 || e.target.closest('.nd-act')) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startNodeX = node.x;
      startNodeY = node.y;
      div.style.zIndex = 100;
      this.select(node.uid);
      e.stopPropagation();
    });

    // Use requestAnimationFrame for smooth drag
    let rafId = null;
    const onMove = e => {
      if (!dragging) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const s = this._state;
        const dx = (e.clientX - startX) / s.cz;
        const dy = (e.clientY - startY) / s.cz;
        node.x = Canvas.snapToGrid(startNodeX + dx, 24);
        node.y = Canvas.snapToGrid(startNodeY + dy, 24);
        div.style.left = node.x + 'px';
        div.style.top  = node.y + 'px';
        document.dispatchEvent(new CustomEvent('rf:connectionsUpdate'));
        Canvas.minimap.renderThrottled();
        rafId = null;
      });
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      div.style.zIndex = '';
      if (node.x !== startNodeX || node.y !== startNodeY) {
        const fx = node.x, fy = node.y;
        this._history?.push({
          desc: 'Move',
          undo: () => { node.x = startNodeX; node.y = startNodeY; this.renderOne(node); },
          redo: () => { node.x = fx; node.y = fy; this.renderOne(node); }
        });
        document.dispatchEvent(new CustomEvent('rf:autosave'));
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  },

  select(uid) {
    const s = this._state;
    s.selId = uid;
    document.querySelectorAll('.cnode').forEach(d => d.classList.remove('sel'));
    const div = document.getElementById('n-' + uid);
    if (div) div.classList.add('sel');
    const node = s.nodes.find(n => n.uid === uid);
    document.dispatchEvent(new CustomEvent('rf:nodeSelected', {detail: node}));
  },

  deselect() {
    this._state.selId = null;
    document.querySelectorAll('.cnode').forEach(d => d.classList.remove('sel'));
    document.dispatchEvent(new CustomEvent('rf:nodeSelected', {detail: null}));
  },

  remove(uid, silent = false) {
    const s = this._state;
    const idx = s.nodes.findIndex(n => n.uid === uid);
    if (idx === -1) return;
    const node = s.nodes[idx];
    s.nodes.splice(idx, 1);
    document.getElementById('n-' + uid)?.remove();
    if (s.selId === uid) this.deselect();
    this.updateCount();
    if (!silent) {
      this._history?.push({
        desc: 'Delete ' + node.type,
        undo: () => { s.nodes.push(node); this.renderOne(node); this.updateCount(); },
        redo: () => this.remove(uid, true)
      });
    }
    document.dispatchEvent(new CustomEvent('rf:autosave'));
    document.dispatchEvent(new CustomEvent('rf:connectionsUpdate'));
  },

  duplicate(uid) {
    const s = this._state;
    const node = s.nodes.find(n => n.uid === uid);
    if (!node) return;
    const copy = JSON.parse(JSON.stringify(node));
    copy.uid = ++s.nc;
    copy.x += 30;
    copy.y += 30;
    s.nodes.push(copy);
    this.renderOne(copy);
    this.updateCount();
    this.select(copy.uid);
    this._history?.push({
      desc: 'Duplicate',
      undo: () => this.remove(copy.uid, true),
      redo: () => { s.nodes.push(copy); this.renderOne(copy); this.updateCount(); }
    });
    document.dispatchEvent(new CustomEvent('rf:autosave'));
  },

  deleteSelected() {
    const s = this._state;
    if (s.selId) this.remove(s.selId);
  },

  duplicateSelected() {
    const s = this._state;
    if (s.selId) this.duplicate(s.selId);
  },

  updateCount() {
    const el = document.getElementById('node-count');
    if (el) el.textContent = this._state.nodes.length + ' elemento(s)';
  },

  // ── Drag and drop from Explorer panel ──
  _setupDragDrop() {
    const canvas = document.getElementById('inf-canvas');
    if (!canvas) return;

    canvas.addEventListener('dragover', e => e.preventDefault());
    canvas.addEventListener('drop', e => {
      e.preventDefault();
      const data = e.dataTransfer.getData('application/rf-item');
      if (!data) return;
      const item = JSON.parse(data);
      const rect = canvas.getBoundingClientRect();
      const s = this._state;
      const x = (e.clientX - rect.left - s.cx) / s.cz;
      const y = (e.clientY - rect.top  - s.cy) / s.cz;
      this.create(item, x, y);
    });
  }
};
