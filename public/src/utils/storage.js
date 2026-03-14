// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — utils/storage.js
//  LocalStorage backup, versioning, safe save/load
// ═══════════════════════════════════════════════

const STORAGE_KEY = 'roforger-v4';
const VERSIONS_KEY = 'roforger-versions';
const MAX_VERSIONS = 10;

export const Storage = {
  // Safe save with backup-before-write
  save(projId, data) {
    const key = projId ? `rf-proj-${projId}` : STORAGE_KEY;
    const backup = localStorage.getItem(key);
    try {
      const serialized = JSON.stringify(data);
      if (serialized.length > 4.5 * 1024 * 1024) {
        console.warn('[Storage] Projeto muito grande para localStorage — apenas nuvem');
        return false;
      }
      localStorage.setItem(key, serialized);
      return true;
    } catch(e) {
      console.error('[Storage] Erro ao salvar:', e.message);
      if (backup) {
        try { localStorage.setItem(key, backup); } catch {}
      }
      return false;
    }
  },

  load(projId) {
    const key = projId ? `rf-proj-${projId}` : STORAGE_KEY;
    try {
      const raw = localStorage.getItem(key) || localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch(e) {
      console.error('[Storage] Erro ao carregar:', e.message);
      return null;
    }
  },

  // Version snapshots
  saveVersion(projId, label, data) {
    try {
      const raw = localStorage.getItem(VERSIONS_KEY);
      const versions = raw ? JSON.parse(raw) : {};
      if (!versions[projId]) versions[projId] = [];
      versions[projId].unshift({
        label: label || `v${versions[projId].length + 1}`,
        time: Date.now(),
        data: JSON.stringify(data)
      });
      // Keep only last N versions
      versions[projId] = versions[projId].slice(0, MAX_VERSIONS);
      localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
      console.info(`[Storage] Versão salva: ${label}`);
      return true;
    } catch(e) {
      console.error('[Storage] Erro ao salvar versão:', e.message);
      return false;
    }
  },

  getVersions(projId) {
    try {
      const raw = localStorage.getItem(VERSIONS_KEY);
      if (!raw) return [];
      const versions = JSON.parse(raw);
      return versions[projId] || [];
    } catch { return []; }
  },

  restoreVersion(projId, index) {
    const versions = this.getVersions(projId);
    if (!versions[index]) return null;
    try {
      return JSON.parse(versions[index].data);
    } catch { return null; }
  },

  deleteVersion(projId, index) {
    try {
      const raw = localStorage.getItem(VERSIONS_KEY);
      if (!raw) return;
      const versions = JSON.parse(raw);
      if (versions[projId]) {
        versions[projId].splice(index, 1);
        localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
      }
    } catch {}
  },

  getUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length + key.length) * 2;
      }
    }
    return {
      used: total,
      usedKB: Math.round(total / 1024),
      usedMB: (total / 1024 / 1024).toFixed(2),
      limitMB: 5,
      pct: Math.round(total / (5 * 1024 * 1024) * 100)
    };
  }
};
