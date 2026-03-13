# ⚒ RoForger Studio

IDE visual para criação de sistemas, efeitos e scripts no Roblox.

## 📁 Estrutura

```
roforger-studio/
├── public/
│   ├── home.html           → Dashboard principal
│   ├── editor.html         → Editor visual (canvas, nós, efeitos)
│   ├── index.html          → Redirect para home.html
│   ├── error.html          → Página de erros universal
│   ├── shared.js           → Firebase + Auth + helpers globais
│   ├── sw.js               → Service Worker (PWA offline)
│   ├── manifest.json       → PWA manifest
│   ├── favicon.ico         → Favicon do site
│   ├── apple-touch-icon.png→ Ícone iOS
│   └── icons/
│       ├── pwa/            → Ícones PWA (16px ~ 512px)
│       ├── android/        → mipmap-mdpi ~ xxxhdpi
│       ├── ios/            → Todos os tamanhos iOS
│       ├── windows/        → Ícones Windows/Electron
│       └── macos/          → Ícones macOS
├── firebase.json
├── .firebaserc
└── .github/workflows/deploy.yml
```

## 🚀 Deploy

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

## 📱 Android (Capacitor)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "RoForger Studio" "com.roforger.studio" --web-dir public
npx cap add android
npx cap copy
# Copie public/icons/android/mipmap-*/ para android/app/src/main/res/
npx cap open android
```
