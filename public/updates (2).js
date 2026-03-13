// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — updates.js
//  Histórico de atualizações do sistema
//  Para adicionar uma nova: inclua no array UPDATES
// ═══════════════════════════════════════════════

const UPDATES = [
  {
    version: "1.3.0",
    date: "13/03/2026",
    title: "Instalação como App + Correções",
    tag: "feature",
    changes: [
      { type: "new",  text: "Botão 'Baixar App' na sidebar — instala como PWA no celular e PC" },
      { type: "new",  text: "Banner de instalação aparece automaticamente na primeira visita" },
      { type: "fix",  text: "Corrigido erro SyntaxError 'PP' no editor (objeto App não fechado)" },
      { type: "fix",  text: "Corrigido erro 'Unexpected token export' no shared.js" },
      { type: "new",  text: "Projetos agora salvos localmente — persistem entre atualizações do site" },
      { type: "new",  text: "Aba de Atualizações adicionada ao painel" },
    ]
  },
  {
    version: "1.2.0",
    date: "13/03/2026",
    title: "Página de Erros Universal",
    tag: "feature",
    changes: [
      { type: "new",  text: "Página error.html detecta automaticamente o tipo de erro (404, 401, 403, 500, offline, firebase)" },
      { type: "new",  text: "Cores diferentes por severidade: vermelho=500, amarelo=401/403, cinza=offline" },
      { type: "new",  text: "Efeito glitch animado no código do erro" },
      { type: "new",  text: "Detalhes técnicos expansíveis na página de erro" },
      { type: "new",  text: "API window.RFError(código) disponível em todo o app" },
      { type: "new",  text: "Detecção automática de conexão offline em tempo real" },
    ]
  },
  {
    version: "1.1.0",
    date: "13/03/2026",
    title: "Ícones & Deploy",
    tag: "improvement",
    changes: [
      { type: "new",  text: "Ícones gerados para todas as plataformas: PWA, Android, iOS, Windows, macOS" },
      { type: "new",  text: "favicon.ico e apple-touch-icon adicionados" },
      { type: "new",  text: "manifest.json atualizado com todos os tamanhos corretos" },
      { type: "new",  text: "Deploy automático via GitHub Actions configurado" },
      { type: "new",  text: "Estrutura de pastas reorganizada com roforger-studio-completo.zip" },
    ]
  },
  {
    version: "1.0.0",
    date: "13/03/2026",
    title: "Lançamento Inicial",
    tag: "release",
    changes: [
      { type: "new",  text: "Home dashboard com sidebar de navegação" },
      { type: "new",  text: "Editor visual com canvas infinito e nós arrastáveis" },
      { type: "new",  text: "Sistema de efeitos com preview em tempo real" },
      { type: "new",  text: "Biblioteca de sistemas Lua prontos para usar" },
      { type: "new",  text: "Templates de projetos" },
      { type: "new",  text: "Documentação integrada" },
      { type: "new",  text: "Login com Google via Firebase" },
      { type: "new",  text: "Salvamento na nuvem (Firestore)" },
      { type: "new",  text: "PWA com suporte offline via Service Worker" },
    ]
  }
];

// ── Tag colors ──
const TAG_STYLES = {
  release:     { bg: 'rgba(255,77,26,.15)',  border: 'rgba(255,77,26,.4)',  color: '#ff8c42',  label: '🚀 RELEASE'     },
  feature:     { bg: 'rgba(0,255,157,.1)',   border: 'rgba(0,255,157,.3)',  color: '#00ff9d',  label: '✨ FEATURE'     },
  improvement: { bg: 'rgba(26,140,255,.1)',  border: 'rgba(26,140,255,.3)', color: '#42b3ff',  label: '⚡ MELHORIA'    },
  fix:         { bg: 'rgba(255,214,0,.1)',   border: 'rgba(255,214,0,.3)',  color: '#ffd600',  label: '🔧 CORREÇÃO'    },
  hotfix:      { bg: 'rgba(255,59,59,.12)',  border: 'rgba(255,59,59,.35)', color: '#ff3b3b',  label: '🔥 HOTFIX'     },
};

const CHANGE_ICONS = {
  new:     { icon: '✦', color: '#00ff9d' },
  fix:     { icon: '⚙', color: '#ffd600' },
  remove:  { icon: '✕', color: '#ff3b3b' },
  improve: { icon: '↑', color: '#42b3ff' },
};

// ── Render updates view ──
function renderUpdates(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const latest = UPDATES[0]?.version;

  container.innerHTML = `
    <div style="padding:24px 20px 8px">
      <div style="font-family:'Orbitron',monospace;font-size:17px;font-weight:700;color:var(--txt);margin-bottom:4px;letter-spacing:1px">
        📋 Atualizações
      </div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--dim);margin-bottom:20px">
        Versão atual: <span style="color:var(--acc2)">${latest}</span> — ${UPDATES.length} versões lançadas
      </div>
    </div>
    <div style="padding:0 16px 32px;display:flex;flex-direction:column;gap:14px">
      ${UPDATES.map((u, idx) => {
        const tag = TAG_STYLES[u.tag] || TAG_STYLES.feature;
        const isLatest = idx === 0;
        return `
          <div style="
            background:rgba(12,17,32,.8);
            border:1px solid ${isLatest ? 'rgba(255,77,26,.35)' : 'rgba(255,255,255,.07)'};
            border-radius:12px;overflow:hidden;
            ${isLatest ? 'box-shadow:0 0 20px rgba(255,77,26,.08)' : ''}
          ">
            <!-- Header -->
            <div style="
              padding:14px 16px 12px;
              border-bottom:1px solid rgba(255,255,255,.06);
              display:flex;align-items:center;gap:10px;
              background:${isLatest ? 'rgba(255,77,26,.05)' : 'transparent'}
            ">
              <div style="
                font-family:'Orbitron',monospace;font-size:18px;font-weight:900;
                color:${isLatest ? 'var(--acc)' : 'var(--mid)'};letter-spacing:2px
              ">v${u.version}</div>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:700;color:var(--txt);margin-bottom:3px">${u.title}</div>
                <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--dim)">${u.date}</div>
              </div>
              <div style="
                display:inline-flex;align-items:center;padding:4px 12px;border-radius:20px;
                background:${tag.bg};border:1px solid ${tag.border};
                font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:700;
                color:${tag.color};letter-spacing:1px;white-space:nowrap
              ">${tag.label}</div>
              ${isLatest ? '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9px;padding:3px 10px;border-radius:20px;background:rgba(255,77,26,.2);color:var(--acc);border:1px solid rgba(255,77,26,.4)">ATUAL</div>' : ''}
            </div>
            <!-- Changes -->
            <div style="padding:12px 16px;display:flex;flex-direction:column;gap:6px">
              ${u.changes.map(c => {
                const ci = CHANGE_ICONS[c.type] || CHANGE_ICONS.new;
                return `
                  <div style="display:flex;align-items:flex-start;gap:10px;font-size:11px">
                    <span style="
                      color:${ci.color};font-size:13px;font-weight:700;
                      flex-shrink:0;margin-top:1px;width:16px;text-align:center
                    ">${ci.icon}</span>
                    <span style="color:var(--mid);line-height:1.6">${c.text}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Expor globalmente
window.UPDATES = UPDATES;
window.renderUpdates = renderUpdates;
