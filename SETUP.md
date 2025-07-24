# 🚀 Setup Completo - Sistema Híbrido IA + Nx

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (vem com Node.js)
- **Git** (para clonar o repositório)

## 🔧 Comandos de Setup

### 1. **Clone do Repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd nx-ia
```

### 2. **Instalar Dependências**
```bash
npm install
```

### 3. **Build do Projeto Schematics**
```bash
npx nx build schematics
```

### 4. **Verificar Instalação**
```bash
# Verificar se o Nx está funcionando
npx nx --version

# Listar todos os geradores disponíveis
npx nx list @usando-nx/schematics
```

## 🛠️ Geradores Disponíveis

Após o setup, você terá acesso aos seguintes geradores:

### **1. Hybrid Generator (Recomendado)**
```bash
# Geração automática
npx nx g @usando-nx/schematics:hybrid-generator nome-da-tela

# Forçar uso da IA
npx nx g @usando-nx/schematics:hybrid-generator nome-da-tela --forceAI=true

# Forçar uso do Nx
npx nx g @usando-nx/schematics:hybrid-generator nome-da-tela --forceNx=true

# Com features específicas
npx nx g @usando-nx/schematics:hybrid-generator dashboard --features="cards,graficos,filtros"
```

### **2. Generate Screen (Nx)**
```bash
# Geração básica
npx nx g @usando-nx/schematics:generate-screen nome-da-tela

# Com features específicas
npx nx g @usando-nx/schematics:generate-screen produtos --features="filtros,tabela,acoes"

# Com documentação automática
npx nx g @usando-nx/schematics:generate-screen usuarios --generateDocs=true
```

### **3. AI Generate Screen (IA)**
```bash
# Geração com IA
npx nx g @usando-nx/schematics:ai-generate-screen nome-da-tela --prompt="Dashboard com cards de métricas, gráficos de vendas e filtros avançados"

# Com projeto específico
npx nx g @usando-nx/schematics:ai-generate-screen dashboard --project=dashboard --prompt="Tela de dashboard com cards de métricas principais"
```

## 🚀 Comandos de Desenvolvimento

### **Servir Aplicação**
```bash
# Servir o app dashboard
npx nx serve dashboard

# Servir o app shell
npx nx serve shell
```

### **Testes**
```bash
# Testar todos os projetos
npx nx test

# Testar projeto específico
npx nx test dashboard
npx nx test schematics
```

### **Build**
```bash
# Build de todos os projetos
npx nx build

# Build de projeto específico
npx nx build dashboard
npx nx build schematics
```

### **Lint**
```bash
# Lint de todos os projetos
npx nx lint

# Lint de projeto específico
npx nx lint dashboard
npx nx lint schematics
```

## 📊 Exemplos Práticos

### **Dashboard de Vendas**
```bash
npx nx g @usando-nx/schematics:hybrid-generator dashboard-vendas \
  --features="cards,graficos,filtros,tabela" \
  --forceAI=true
```

### **Gerenciamento de Usuários**
```bash
npx nx g @usando-nx/schematics:generate-screen usuarios \
  --features="filtros,tabela,acoes,modal" \
  --generateDocs=true
```

### **Relatório Avançado**
```bash
npx nx g @usando-nx/schematics:ai-generate-screen relatorio-vendas \
  --prompt="Relatório de vendas com gráficos de barras, cards de métricas principais, filtros por período e exportação para Excel"
```

## 🔍 Verificação de Setup

### **1. Verificar Estrutura**
```bash
# Verificar se os arquivos foram criados
ls apps/dashboard/src/app/
ls libs/schematics/src/generators/
```

### **2. Verificar Geradores**
```bash
# Listar geradores disponíveis
npx nx list @usando-nx/schematics

# Testar gerador básico
npx nx g @usando-nx/schematics:hybrid-generator teste-setup
```

### **3. Verificar Aplicação**
```bash
# Servir aplicação
npx nx serve dashboard

# Acessar no navegador: http://localhost:4200
```

## 🎯 Features Disponíveis

### **Features Básicas (Nx)**
- **filtros** - Filtros avançados com busca
- **tabela** - Tabela dinâmica com paginação
- **acoes** - Botões de ação (CRUD)
- **formulario** - Formulários reativos

### **Features Avançadas (IA)**
- **cards** - Cards de métricas
- **graficos** - Gráficos interativos
- **modal** - Modais inteligentes
- **exportacao** - Exportação de dados
- **responsivo** - Layout responsivo

## 📚 Documentação

### **Arquivos de Documentação**
- `README.md` - Documentação principal
- `SISTEMA-HIBRIDO-IA-NX.md` - Documentação técnica
- `IA-NX-INTEGRATION.md` - Guia de integração
- `docs/` - Documentação gerada automaticamente

### **Estrutura do Projeto**
```
nx-ia/
├── apps/
│   ├── dashboard/          # App Angular principal
│   ├── dashboard-e2e/      # Testes E2E
│   └── shell/             # App shell
├── libs/
│   └── schematics/        # Geradores customizados
├── docs/                  # Documentação gerada
├── scripts/               # Scripts de análise
└── migration-guides/      # Guias de migração
```

## 🔧 Troubleshooting

### **Problema: Gerador não encontrado**
```bash
# Rebuild do schematics
npx nx build schematics

# Verificar se está no dist
ls dist/libs/schematics/
```

### **Problema: Dependências não instaladas**
```bash
# Limpar cache
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### **Problema: Erro de compilação**
```bash
# Limpar cache do Nx
npx nx reset

# Rebuild
npx nx build schematics
```

## 🎉 Próximos Passos

### **1. Primeiro Teste**
```bash
# Gerar uma tela de teste
npx nx g @usando-nx/schematics:hybrid-generator minha-primeira-tela

# Servir aplicação
npx nx serve dashboard
```

### **2. Explorar Features**
```bash
# Testar diferentes features
npx nx g @usando-nx/schematics:hybrid-generator dashboard-teste --features="cards,graficos,filtros"

# Testar IA
npx nx g @usando-nx/schematics:ai-generate-screen tela-ia --prompt="Dashboard com cards de métricas e gráficos"
```

### **3. Verificar Documentação**
```bash
# Verificar documentação gerada
ls docs/
cat docs/*-analysis.md
```

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs**: `npx nx build schematics --verbose`
2. **Consulte a documentação**: `README.md`, `SISTEMA-HIBRIDO-IA-NX.md`
3. **Teste com exemplo simples**: Use o `hybrid-generator` com features básicas
4. **Verifique versões**: Node.js 18+, npm atualizado

---

**🎉 Setup completo! Agora você pode usar todos os geradores do Sistema Híbrido IA + Nx!** 