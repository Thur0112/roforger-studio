// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — ui/explorer.js
//  Left panel: system browser with drag to canvas
// ═══════════════════════════════════════════════

export const Explorer = {
  _data: null,
  _filter: '',

  init(data) {
    this._data = data;
    this.render();
  },

  render(query = '') {
    const body = document.getElementById('exp-body');
    if (!body || !this._data) return;

    const q = query.toLowerCase().trim();
    body.innerHTML = '';

    this._data.forEach(group => {
      const items = q
        ? group.items.filter(i => i.name.toLowerCase().includes(q) || i.desc?.toLowerCase().includes(q))
        : group.items;

      if (!items.length) return;

      // Group header - using createElement
      const gh = document.createElement('div');
      gh.className = 'exp-gh open';
      gh.innerHTML = `<span class="exp-gi">${group.icon}</span><span>${group.group}</span><span class="exp-cnt">${items.length}</span><span class="exp-chev">›</span>`;
      gh.addEventListener('click', () => {
        gh.classList.toggle('open');
        children.style.display = gh.classList.contains('open') ? 'block' : 'none';
      });

      const children = document.createElement('div');
      children.className = 'exp-children';

      items.forEach(item => {
        const d = document.createElement('div');
        d.className = 'exp-item';
        d.draggable = true;

        const ico = document.createElement('span');
        ico.className = 'exp-ico';
        ico.textContent = item.icon;

        const name = document.createElement('span');
        name.className = 'exp-name';
        name.textContent = item.name;

        d.appendChild(ico);
        d.appendChild(name);

        // Drag to canvas
        d.addEventListener('dragstart', e => {
          e.dataTransfer.setData('application/rf-item', JSON.stringify(item));
          e.dataTransfer.effectAllowed = 'copy';
        });

        // Click to add at center
        d.addEventListener('click', () => {
          document.dispatchEvent(new CustomEvent('rf:addItemAtCenter', {detail: item}));
        });

        children.appendChild(d);
      });

      const groupEl = document.createElement('div');
      groupEl.className = 'exp-group';
      groupEl.appendChild(gh);
      groupEl.appendChild(children);
      body.appendChild(groupEl);
    });
  },

  filter(q) {
    this._filter = q;
    this.render(q);
  }
};
