// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — utils/helpers.js
//  DOM helpers, debounce, copy, download
// ═══════════════════════════════════════════════

// Debounce: wait until user stops typing/acting
export function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// Throttle: limit calls per interval
export function throttle(fn, ms = 100) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}

// Safe createElement with props + children
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('on') && typeof v === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (k === 'style' && typeof v === 'object') {
      Object.assign(node.style, v);
    } else if (k === 'class') {
      node.className = v;
    } else {
      node.setAttribute(k, v);
    }
  }
  for (const child of children) {
    if (typeof child === 'string') node.appendChild(document.createTextNode(child));
    else if (child instanceof Node) node.appendChild(child);
  }
  return node;
}

// Copy text to clipboard
export async function copyText(text, successMsg = 'Copiado!') {
  try {
    await navigator.clipboard.writeText(text);
    window.toast && window.toast('📋 ' + successMsg, 's');
    return true;
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    window.toast && window.toast('📋 ' + successMsg, 's');
    return true;
  }
}

// Download as file
export function downloadFile(content, filename, mime = 'text/plain') {
  const blob = new Blob([content], {type: mime});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

// Syntax highlight for Lua code
export function syntaxHL(code) {
  if (!code) return '';
  return code
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/(--[^\n]*)/g,'<span class="lua-cmt">$1</span>')
    .replace(/\b(local|function|end|if|then|else|elseif|for|while|do|return|not|and|or|in|repeat|until|break)\b/g,'<span class="lua-kw">$1</span>')
    .replace(/\b(true|false|nil)\b/g,'<span class="lua-bool">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g,'<span class="lua-num">$1</span>')
    .replace(/"([^"]*)"/g,'"<span class="lua-str">$1</span>"');
}

// Unique ID generator
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// Clamp number between min and max
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// Format date
export function fmtDate(ms) {
  return new Date(ms).toLocaleDateString('pt-BR', {day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'});
}
