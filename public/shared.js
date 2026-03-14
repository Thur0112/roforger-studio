// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — shared.js
//  Firebase + Auth + Utils compartilhados entre
//  home.html e editor.html
// ═══════════════════════════════════════════════

// ── Firebase Init ──
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArX9iaqsb1TE82YzpTP21KC14YOy8I_wg",
  authDomain: "roforger-studio.firebaseapp.com",
  projectId: "roforger-studio",
  storageBucket: "roforger-studio.firebasestorage.app",
  messagingSenderId: "724972965811",
  appId: "1:724972965811:web:521eda28e74005cc9f45c6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const gp = new GoogleAuthProvider();

// Expõe globalmente para os scripts inline
window._fb = { auth, db, gp, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy };
window.dispatchEvent(new Event("fb-ready"));

// ── Toast ──
export function toast(msg, type = 's') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toastWrap';
    wrap.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:6px;align-items:center;pointer-events:none;width:90%;max-width:320px';
    document.body.appendChild(wrap);
  }
  const icons = { s: '✔', e: '✖', w: '⚠', i: 'ℹ' };
  const colors = {
    s: 'border:1px solid rgba(0,255,157,.35);color:#00ff9d',
    e: 'border:1px solid rgba(255,77,26,.4);color:#ff4d1a',
    w: 'border:1px solid rgba(255,214,0,.3);color:#ffd600',
    i: 'border:1px solid rgba(26,140,255,.35);color:#42b3ff'
  };
  const d = document.createElement('div');
  d.style.cssText = `background:#0a0f20;border-radius:10px;padding:10px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;box-shadow:0 8px 40px rgba(0,0,0,.7);display:flex;align-items:center;gap:8px;white-space:nowrap;${colors[type]||colors.i}`;
  d.textContent = `${icons[type]||'ℹ'} ${msg}`;
  wrap.appendChild(d);
  setTimeout(() => d.remove(), 3000);
}
window.toast = toast;

// ── Auth helpers ──
export async function loginGoogle() {
  const { auth, gp, signInWithPopup } = window._fb;
  try {
    const result = await signInWithPopup(auth, gp);
    return result.user;
  } catch (e) {
    if (e.code === 'auth/popup-closed-by-user') return null;
    if (!navigator.onLine) { window.RFError('offline'); return null; }
    if (e.code === 'auth/network-request-failed') { window.RFError(503); return null; }
    if (e.code === 'auth/unauthorized-domain') { window.RFError(403); return null; }
    if (e.code === 'auth/user-disabled') { window.RFError(403); return null; }
    toast('Erro no login', 'e');
    return null;
  }
}

export async function logoutUser() {
  const { auth, signOut } = window._fb;
  await signOut(auth);
  toast('Até logo! 👋', 'w');
}

// ── Firestore helpers ──
export async function fetchUserProjects(uid) {
  const { db, collection, query, where, orderBy, getDocs } = window._fb;
  try {
    const q = query(collection(db, 'projects'), where('uid', '==', uid), orderBy('updatedAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn('fetchUserProjects:', e);
    if (!navigator.onLine) { window.RFError('offline'); return []; }
    if (e.code === 'permission-denied' || e.code === 'firestore/permission-denied') { window.RFError(403); return []; }
    if (e.code === 'unavailable') { window.RFError('firebase'); return []; }
    toast('Erro ao carregar projetos', 'e');
    return [];
  }
}

export async function saveProject(proj) {
  if (!proj || typeof proj !== 'object') {
    console.error('[RoForger] saveProject: projeto inválido', proj);
    return null;
  }
  const { db, collection, addDoc, doc, updateDoc } = window._fb;
  try {
    if (proj.id && !proj.id.startsWith('demo-')) {
      await updateDoc(doc(db, 'projects', proj.id), proj);
      return proj.id;
    } else {
      const ref = await addDoc(collection(db, 'projects'), proj);
      return ref.id;
    }
  } catch (e) {
    if (!navigator.onLine) { window.RFError('offline'); return null; }
    if (e.code === 'permission-denied' || e.code === 'firestore/permission-denied') { window.RFError(403); return null; }
    if (e.code === 'unavailable') { window.RFError('firebase'); return null; }
    toast('Erro ao salvar', 'e');
    return null;
  }
}

export async function deleteProject(id) {
  if (!id || id.startsWith('demo-')) return;
  const { db, doc, deleteDoc } = window._fb;
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (e) {
    if (!navigator.onLine) { window.RFError('offline'); return; }
    if (e.code === 'permission-denied') { window.RFError(403); return; }
    toast('Erro ao deletar projeto', 'e');
  }
}

// ── Project session ──
export function setCurrentProject(proj) {
  sessionStorage.setItem('rf_current_project', JSON.stringify(proj));
}

export function getCurrentProject() {
  try { return JSON.parse(sessionStorage.getItem('rf_current_project')); } catch { return null; }
}

// ── Navegação ──
export function goToEditor() { window.location.href = '/editor.html'; }
export function goToHome()   { window.location.href = '/home.html'; }

window._rf_shared = { toast, loginGoogle, logoutUser, fetchUserProjects, saveProject, deleteProject, setCurrentProject, getCurrentProject, goToEditor, goToHome };

// ── API global de erros ──
window.RFError = function(code, msg) {
  let url = '/error.html?code=' + code;
  if (msg) url += '&msg=' + encodeURIComponent(msg);
  window.location.href = url;
};

// ── Conexão offline/online ──
window.addEventListener('offline', () => {
  if (window.toast) window.toast('Sem conexão — alterações não serão salvas na nuvem', 'w');
  console.warn('[RoForger] Conexão perdida');
});
window.addEventListener('online', () => {
  if (window.toast) window.toast('Conexão restaurada ✔', 's');
  console.info('[RoForger] Conexão restaurada');
});

// ── Firebase timeout (8s) ──
setTimeout(() => {
  if (typeof window._fb === 'undefined') {
    console.error('[RoForger] Firebase não carregou após 8s — redirecionando para error.html');
    window.RFError('firebase');
  } else {
    console.info('[RoForger] Firebase OK após verificação de 8s');
  }
}, 8000);
