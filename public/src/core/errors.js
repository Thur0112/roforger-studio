// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — core/errors.js
//  Global error handling, debug console
// ═══════════════════════════════════════════════

export const DebugConsole = {
  logs: [],
  maxLogs: 200,
  _panel: null,
  _visible: false,

  init() {
    // Global error capture
    window.onerror = (msg, src, line, col, err) => {
      this.error(`[JS Error] ${msg} @ ${src}:${line}`);
      return false;
    };
    window.addEventListener('unhandledrejection', e => {
      this.error(`[Promise] ${e.reason}`);
    });
    // Override console methods to also capture in panel
    const orig = {log: console.log, warn: console.warn, error: console.error, info: console.info};
    console.log   = (...a) => { orig.log(...a);   this.log(a.join(' ')); };
    console.warn  = (...a) => { orig.warn(...a);  this.warn(a.join(' ')); };
    console.error = (...a) => { orig.error(...a); this.error(a.join(' ')); };
    console.info  = (...a) => { orig.info(...a);  this.info(a.join(' ')); };
  },

  _add(type, msg) {
    const entry = { type, msg, time: new Date().toLocaleTimeString('pt-BR', {hour12:false}) };
    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) this.logs.pop();
    this._render();
    // Badge on button
    const badge = document.getElementById('debug-badge');
    if (badge && type === 'error') {
      badge.style.display = 'flex';
      badge.textContent = (parseInt(badge.textContent)||0) + 1;
    }
  },

  log(msg)   { this._add('log', msg); },
  warn(msg)  { this._add('warn', msg); },
  error(msg) { this._add('error', msg); },
  info(msg)  { this._add('info', msg); },

  clear() { this.logs = []; this._render(); },

  _render() {
    const el = document.getElementById('debug-log-body');
    if (!el) return;
    const colors = { log:'var(--dim)', warn:'var(--yellow)', error:'var(--acc)', info:'var(--blue)' };
    const icons  = { log:'›', warn:'⚠', error:'✖', info:'ℹ' };
    el.innerHTML = this.logs.map(e =>
      `<div style="display:flex;gap:8px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.03)">
        <span style="color:var(--dark);font-size:9px;flex-shrink:0;width:52px">${e.time}</span>
        <span style="color:${colors[e.type]};flex-shrink:0">${icons[e.type]}</span>
        <span style="color:${colors[e.type]};font-size:10px;word-break:break-all">${e.msg}</span>
      </div>`
    ).join('');
  },

  toggle() {
    const panel = document.getElementById('debug-panel');
    if (!panel) return;
    this._visible = !this._visible;
    panel.style.display = this._visible ? 'flex' : 'none';
    if (this._visible) {
      const badge = document.getElementById('debug-badge');
      if (badge) badge.style.display = 'none';
      this._render();
    }
  }
};
