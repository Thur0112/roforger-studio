// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — core/firebase.js
//  Firebase state, auth watcher, fb-ready handling
// ═══════════════════════════════════════════════

export const HS = {user:null,projects:[],delTarget:null,emoji:'🎮',fbReady:false};

export function initFirebase() {
  window.addEventListener('fb-ready', () => {
    if (HS.fbReady) return;
    HS.fbReady = true;
    const {auth, onAuthStateChanged} = window._fb;
    onAuthStateChanged(auth, u => { HS.user = u; });
  });

  // Fallback: shared.js module may fire before listener registers
  if (window._fb && !HS.fbReady) {
    HS.fbReady = true;
    const {auth, onAuthStateChanged} = window._fb;
    onAuthStateChanged(auth, u => { HS.user = u; });
  }

  setTimeout(() => {
    if (!HS.fbReady) {
      console.error('[RoForger] Firebase não inicializou em 4s. Verifique shared.js e a rede.');
    }
  }, 4000);
}

export async function saveCloud(proj) {
  if (!HS.user || !HS.fbReady) return null;
  try {
    const {db, collection, addDoc, doc, updateDoc} = window._fb;
    if (proj.id && !proj.id.startsWith('demo-')) {
      await updateDoc(doc(db,'projects',proj.id), proj);
      return proj.id;
    } else {
      const r = await addDoc(collection(db,'projects'), proj);
      return r.id;
    }
  } catch(e) {
    if (!navigator.onLine) { window.RFError && window.RFError('offline'); return null; }
    if (e.code === 'permission-denied') { window.RFError && window.RFError(403); return null; }
    if (e.code === 'unavailable') { window.RFError && window.RFError('firebase'); return null; }
    window.toast && window.toast('Erro ao salvar','e');
    return null;
  }
}
