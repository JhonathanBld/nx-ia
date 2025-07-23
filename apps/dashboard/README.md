# Dashboard Micro Frontend

Este é o Dashboard Micro Frontend que pode ser executado de duas formas:

## 🏗️ Estrutura

```
apps/dashboard/
├── package.json          ← Package.json próprio
├── angular.json          ← Configuração Angular
├── src/                  ← Código fonte
└── README.md            ← Este arquivo
```

## 🚀 Como Executar

### Opção 1: Como parte do Nx Monorepo
```bash
# Na raiz do projeto
npm run start:dashboard
# ou
npx nx serve dashboard
```

### Opção 2: Como projeto Angular standalone
```bash
# Na raiz do projeto
npm run start:dashboard-standalone

# Ou diretamente no diretório do dashboard
cd apps/dashboard
npm start
```

## 🌐 Acesso

- **URL**: http://localhost:4201
- **Porta**: 4201

## 📦 Dependências

O dashboard tem suas próprias dependências no `package.json`:

```json
{
  "dependencies": {
    "@angular/common": "~20.1.0",
    "@angular/core": "~20.1.0",
    "@angular/platform-browser": "~20.1.0",
    "@angular/router": "~20.1.0",
    "rxjs": "~7.8.0",
    "zone.js": "~0.15.0"
  }
}
```

## 🔧 Desenvolvimento

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

### Lint
```bash
npm run lint
```

## 🎯 Micro Frontend

Este dashboard é projetado para funcionar como um Micro Frontend:

- ✅ **Independente**: Pode rodar sozinho
- ✅ **Integrável**: Pode ser carregado pelo Shell
- ✅ **Modular**: Funcionalidades isoladas
- ✅ **Escalável**: Pode ser desenvolvido por equipes diferentes 