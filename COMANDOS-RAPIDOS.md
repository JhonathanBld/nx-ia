# ⚡ Comandos Rápidos - Sistema Híbrido IA + Nx

## 🚀 Setup Inicial (Após Clonar)

```bash
# 1. Instalar dependências
npm install

# 2. Build do schematics
npx nx build schematics

# 3. Verificar instalação
npx nx list @usando-nx/schematics
```

## 🛠️ Geradores Principais

### **Hybrid Generator (Recomendado)**
```bash
# Geração automática
npx nx g @usando-nx/schematics:hybrid-generator nome-da-tela

# Forçar IA
npx nx g @usando-nx/schematics:hybrid-generator nome-da-tela --forceAI=true

# Com features específicas
npx nx g @usando-nx/schematics:hybrid-generator dashboard --features="cards,graficos,filtros"
```

### **Generate Screen (Nx)**
```bash
# Geração básica
npx nx g @usando-nx/schematics:generate-screen nome-da-tela

# Com features
npx nx g @usando-nx/schematics:generate-screen produtos --features="filtros,tabela,acoes"
```

### **AI Generate Screen (IA)**
```bash
# Geração com IA
npx nx g @usando-nx/schematics:ai-generate-screen nome-da-tela --prompt="Dashboard com cards de métricas e gráficos"
```

## 🚀 Desenvolvimento

```bash
# Servir aplicação
npx nx serve dashboard

# Testar
npx nx test dashboard

# Build
npx nx build dashboard

# Lint
npx nx lint dashboard
```

## 📊 Exemplos Práticos

```bash
# Dashboard de vendas
npx nx g @usando-nx/schematics:hybrid-generator dashboard-vendas --features="cards,graficos,filtros" --forceAI=true

# Gerenciamento de usuários
npx nx g @usando-nx/schematics:generate-screen usuarios --features="filtros,tabela,acoes" --generateDocs=true

# Relatório avançado
npx nx g @usando-nx/schematics:ai-generate-screen relatorio-vendas --prompt="Relatório de vendas com gráficos de barras, cards de métricas principais, filtros por período e exportação para Excel"
```

## 🔧 Troubleshooting

```bash
# Gerador não encontrado
npx nx build schematics

# Limpar cache
npx nx reset

# Reinstalar dependências
rm -rf node_modules package-lock.json && npm install
```

## 🎯 Features Disponíveis

**Básicas (Nx)**: `filtros`, `tabela`, `acoes`, `formulario`
**Avançadas (IA)**: `cards`, `graficos`, `modal`, `exportacao`, `responsivo`

---

**⚡ Comandos essenciais para começar rapidamente!** 