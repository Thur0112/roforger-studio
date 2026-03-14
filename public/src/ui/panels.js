// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — ui/panels.js
//  Props panel, debug console panel, version panel
// ═══════════════════════════════════════════════

import { Storage } from '../utils/storage.js';
import { fmtDate } from '../utils/helpers.js';

// ── Debug console panel builder ──
export function buildDebugPanel() {
  const existing = document.getElementById('debug-panel');
  if (existing) return;

  const panel = document.createElement('div');
  panel.id = 'debug-panel';
  panel.style.cssText = `
    display:none;position:fixed;bottom:0;left:0;right:0;height:220px;
    background:#04060f;border-top:2px solid var(--acc);z-index:8000;
    flex-direction:column;font-family:'JetBrains Mono',monospace;
  `;

  const header = document.createElement('div');
  header.style.cssText = 'height:32px;background:rgba(8,12,24,.98);border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;padding:0 12px;gap:8px;flex-shrink:0';
  header.innerHTML = `
    <span style="font-size:10px;font-weight:700;color:var(--acc);letter-spacing:1px">🐛 DEBUG CONSOLE</span>
    <span style="flex:1"></span>
    <button onclick="window._DebugConsole?.clear()" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:var(--dim);padding:2px 8px;border-radius:4px;cursor:pointer;font-size:10px">Limpar</button>
    <button onclick="window._DebugConsole?.toggle()" style="background:rgba(255,77,26,.1);border:1px solid rgba(255,77,26,.3);color:var(--acc);padding:2px 8px;border-radius:4px;cursor:pointer;font-size:10px">✕ Fechar</button>
  `;

  const storage_bar = document.createElement('div');
  const usage = Storage.getUsage();
  storage_bar.style.cssText = 'padding:4px 12px;border-bottom:1px solid rgba(255,255,255,.04);display:flex;align-items:center;gap:8px;font-size:9px;color:var(--dark);flex-shrink:0';
  storage_bar.innerHTML = `
    <span>LocalStorage: <span style="color:${usage.pct > 80 ? 'var(--acc)' : 'var(--green)'}">${usage.usedMB}MB / ${usage.limitMB}MB (${usage.pct}%)</span></span>
    <div style="flex:1;height:3px;background:rgba(255,255,255,.06);border-radius:2px">
      <div style="width:${usage.pct}%;height:100%;background:${usage.pct > 80 ? 'var(--acc)' : 'var(--green)'};border-radius:2px"></div>
    </div>
  `;

  const body = document.createElement('div');
  body.id = 'debug-log-body';
  body.style.cssText = 'flex:1;overflow-y:auto;padding:6px 12px;font-size:10px;line-height:1.7';

  panel.appendChild(header);
  panel.appendChild(storage_bar);
  panel.appendChild(body);
  document.body.appendChild(panel);

  // Debug button in topbar
  const topbar = document.getElementById('ed-topbar');
  if (topbar) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-ghost btn-sm';
    btn.style.position = 'relative';
    btn.title = 'Debug Console';
    btn.textContent = '🐛';
    btn.addEventListener('click', () => window._DebugConsole?.toggle());

    const badge = document.createElement('span');
    badge.id = 'debug-badge';
    badge.style.cssText = 'display:none;position:absolute;top:-2px;right:-2px;width:14px;height:14px;background:var(--acc);border-radius:50%;font-size:8px;color:#fff;align-items:center;justify-content:center;font-family:"JetBrains Mono",monospace';
    btn.appendChild(badge);

    // Insert before the last button (🏠)
    const lastBtn = topbar.querySelector('button:last-child');
    topbar.insertBefore(btn, lastBtn);
  }
}

// ── Version history panel ──
export function buildVersionPanel(projId) {
  const existing = document.getElementById('version-panel-overlay');
  if (existing) { existing.remove(); return; }

  const overlay = document.createElement('div');
  overlay.id = 'version-panel-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:7000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)';

  const panel = document.createElement('div');
  panel.style.cssText = 'background:#080d1c;border:1px solid var(--brd2);border-radius:14px;width:500px;max-width:95vw;max-height:70vh;display:flex;flex-direction:column;box-shadow:var(--slg)';

  const head = document.createElement('div');
  head.style.cssText = 'padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between;flex-shrink:0';
  head.innerHTML = `
    <span style="font-family:'Orbitron',monospace;font-size:12px;font-weight:700;color:var(--txt);letter-spacing:1px">🕐 HISTÓRICO DE VERSÕES</span>
    <button onclick="document.getElementById('version-panel-overlay').remove()" style="background:none;border:none;color:var(--dim);cursor:pointer;font-size:16px">✕</button>
  `;

  const body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px';

  const versions = Storage.getVersions(projId);

  if (!versions.length) {
    body.innerHTML = '<div style="text-align:center;padding:32px;color:var(--dark);font-size:12px;font-family:\'JetBrains Mono\',monospace">Nenhuma versão salva.<br><br>Use Ctrl+S para criar versões.</div>';
  } else {
    versions.forEach((v, i) => {
      const item = document.createElement('div');
      item.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,.06);margin-bottom:6px;background:var(--card)';
      item.innerHTML = `
        <div style="flex:1">
          <div style="font-size:12px;color:var(--txt);font-weight:600">${v.label}</div>
          <div style="font-size:10px;color:var(--dark);font-family:'JetBrains Mono',monospace;margin-top:2px">${fmtDate(v.time)}</div>
        </div>
        <button onclick="window._restoreVersion(${i})" style="padding:5px 12px;border-radius:6px;background:rgba(0,255,157,.1);border:1px solid rgba(0,255,157,.3);color:var(--green);cursor:pointer;font-size:11px">↩ Restaurar</button>
        <button onclick="window._deleteVersion(${i},this.closest('[style]'))" style="padding:5px 10px;border-radius:6px;background:rgba(255,77,26,.08);border:1px solid rgba(255,77,26,.2);color:var(--acc);cursor:pointer;font-size:11px">✕</button>
      `;
      body.appendChild(item);
    });
  }

  const foot = document.createElement('div');
  foot.style.cssText = 'padding:10px 18px;border-top:1px solid rgba(255,255,255,.07);display:flex;gap:8px;justify-content:flex-end;flex-shrink:0';
  foot.innerHTML = `
    <button onclick="document.getElementById('version-panel-overlay').remove()" style="padding:8px 16px;border-radius:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:var(--mid);cursor:pointer;font-size:12px">Fechar</button>
  `;

  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  panel.appendChild(head);
  panel.appendChild(body);
  panel.appendChild(foot);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
}
