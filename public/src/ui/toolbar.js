// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — ui/toolbar.js
//  Top toolbar, keyboard shortcuts
// ═══════════════════════════════════════════════

export const Toolbar = {
  init(app) {
    this._app = app;
    this._setupKeyboard();
    this._setupTabs();
  },

  _setupKeyboard() {
    document.addEventListener('keydown', e => {
      const active = document.activeElement;
      const inInput = ['INPUT','TEXTAREA','SELECT'].includes(active?.tagName);

      if (inInput) {
        if (e.key === 'Escape') active.blur();
        return;
      }

      const ctrl = e.ctrlKey || e.metaKey;

      if (ctrl && e.key === 'k') { e.preventDefault(); document.dispatchEvent(new Event('rf:cmdOpen')); }
      if (ctrl && e.key === 'z') { e.preventDefault(); this._app.history.undo(); }
      if (ctrl && e.key === 'y') { e.preventDefault(); this._app.history.redo(); }
      if (ctrl && e.key === 's') { e.preventDefault(); document.dispatchEvent(new Event('rf:save')); }
      if (ctrl && e.key === 'd') { e.preventDefault(); document.dispatchEvent(new Event('rf:duplicateSelected')); }
      if (e.key === 'Delete' || e.key === 'Backspace') { document.dispatchEvent(new Event('rf:deleteSelected')); }
      if (e.key === 'f' || e.key === 'F') { document.dispatchEvent(new Event('rf:focusSelected')); }
      if (e.key === 'Escape') { document.dispatchEvent(new Event('rf:deselect')); }
    });
  },

  _setupTabs() {
    const wrap = document.getElementById('main-tabs');
    if (!wrap || !this._app.data?.tabs) return;
    wrap.innerHTML = '';
    this._app.data.tabs.forEach((t, i) => {
      const d = document.createElement('div');
      d.className = 'main-tab' + (i === 0 ? ' active' : '');
      d.textContent = t.label;
      d.addEventListener('click', () => this._app.switchView(t.id, d));
      wrap.appendChild(d);
    });
  }
};
