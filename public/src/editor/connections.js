// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — editor/connections.js
//  SVG connections between nodes
// ═══════════════════════════════════════════════

export const Connections = {
  _state: null,
  _visible: true,

  init(state) {
    this._state = state;
    document.addEventListener('rf:connectionsUpdate', () => this.render());
  },

  render() {
    if (!this._visible) return;
    const svg = document.getElementById('conn-svg');
    if (!svg) return;
    svg.innerHTML = '';
    const s = this._state;
    if (!s.connections) return;

    s.connections.forEach(conn => {
      const fromNode = s.nodes.find(n => n.uid === conn.from);
      const toNode   = s.nodes.find(n => n.uid === conn.to);
      if (!fromNode || !toNode) return;

      const x1 = fromNode.x + 220, y1 = fromNode.y + 40;
      const x2 = toNode.x,         y2 = toNode.y + 40;
      const cx = (x1 + x2) / 2;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`);
      path.setAttribute('class', 'conn-line');
      path.setAttribute('stroke', fromNode.color || 'var(--acc)');
      svg.appendChild(path);
    });
  },

  toggle() {
    this._visible = !this._visible;
    const svg = document.getElementById('conn-svg');
    if (svg) svg.style.display = this._visible ? 'block' : 'none';
  },

  add(fromUid, toUid) {
    const s = this._state;
    if (!s.connections) s.connections = [];
    const exists = s.connections.find(c => c.from === fromUid && c.to === toUid);
    if (!exists) {
      s.connections.push({from: fromUid, to: toUid});
      this.render();
    }
  },

  remove(fromUid, toUid) {
    const s = this._state;
    if (!s.connections) return;
    s.connections = s.connections.filter(c => !(c.from === fromUid && c.to === toUid));
    this.render();
  }
};
