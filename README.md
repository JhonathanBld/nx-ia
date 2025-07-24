# 🚀 Sistema Híbrido IA + Nx

Um sistema inteligente para geração de componentes Angular que combina a velocidade do Nx com a inteligência da IA para criar telas dinâmicas e responsivas.

## ⚡ Quick Start

### **🚀 Setup Rápido**
```bash
# 1. Clone e instale
git clone <URL_DO_REPOSITORIO>
cd nx-ia
npm install
npx nx build schematics

# 2. Primeiro teste
npx nx g @usando-nx/schematics:hybrid-generator minha-primeira-tela
npx nx serve dashboard
```

### **📋 Guias Detalhados**
- **[SETUP.md](./SETUP.md)** - Setup completo passo a passo
- **[COMANDOS-RAPIDOS.md](./COMANDOS-RAPIDOS.md)** - Comandos essenciais

### **🎯 Navegação Rápida**
- **🚀 Primeira vez?** → [SETUP.md](./SETUP.md)
- **⚡ Comandos rápidos?** → [COMANDOS-RAPIDOS.md](./COMANDOS-RAPIDOS.md)
- **📖 Documentação técnica?** → [SISTEMA-HIBRIDO-IA-NX.md](./SISTEMA-HIBRIDO-IA-NX.md)
- **🤖 Integração IA?** → [IA-NX-INTEGRATION.md](./IA-NX-INTEGRATION.md)
- **🔄 Migração React?** → [migration-guides/](./migration-guides/)

## 🎯 Visão Geral

Este sistema oferece três geradores principais:

1. **`hybrid-generator`** - Sistema híbrido que decide automaticamente entre IA e Nx
2. **`generate-screen`** - Geração baseada em features usando Nx
3. **`ai-generate-screen`** - Geração totalmente baseada em IA

## 🛠️ Geradores Disponíveis

### 1. Hybrid Generator (`@usando-nx/schematics:hybrid-generator`)

O gerador mais inteligente que decide automaticamente entre IA e Nx baseado nas features selecionadas.

#### Comandos Básicos:
```bash
# Geração automática (recomendado)
npx nx g @usando-nx/schematics:hybrid-generator nome-da-tela

# Forçar uso da IA
npx nx g @usando-nx/schematics:hybrid-generator nome-da-tela --forceAI=true

# Forçar uso do Nx
npx nx g @usando-nx/schematics:hybrid-generator nome-da-tela --forceNx=true
```

#### Features Disponíveis:
- **filtros** - Filtros avançados com busca
- **tabela** - Tabela dinâmica com paginação
- **acoes** - Botões de ação (CRUD)
- **cards** - Cards de métricas
- **graficos** - Gráficos interativos
- **modal** - Modais inteligentes
- **formulario** - Formulários reativos
- **exportacao** - Exportação de dados
- **responsivo** - Layout responsivo

#### Exemplos de Uso:

```bash
# Tela básica com filtros, tabela e ações
npx nx g @usando-nx/schematics:hybrid-generator usuarios

# Dashboard avançado com cards e gráficos
npx nx g @usando-nx/schematics:hybrid-generator dashboard --features="cards,graficos,filtros"

# Tela com modal e formulário
npx nx g @usando-nx/schematics:hybrid-generator produtos --features="tabela,modal,formulario"

# Forçar IA para tela complexa
npx nx g @usando-nx/schematics:hybrid-generator relatorios --forceAI=true
```

### 2. Generate Screen (`@usando-nx/schematics:generate-screen`)

Gerador baseado em features que sempre usa Nx para geração rápida.

#### Comandos:
```bash
# Geração básica
npx nx g @usando-nx/schematics:generate-screen nome-da-tela

# Com features específicas
npx nx g @usando-nx/schematics:generate-screen produtos --features="filtros,tabela,acoes"

# Com documentação automática
npx nx g @usando-nx/schematics:generate-screen usuarios --generateDocs=true
```

### 3. AI Generate Screen (`@usando-nx/schematics:ai-generate-screen`)

Gerador totalmente baseado em IA que analisa prompts detalhados.

#### Comandos:
```bash
# Geração com IA
npx nx g @usando-nx/schematics:ai-generate-screen nome-da-tela --prompt="Dashboard com cards de métricas, gráficos de vendas e filtros avançados"

# Com projeto específico
npx nx g @usando-nx/schematics:ai-generate-screen dashboard --project=dashboard --prompt="Tela de dashboard com cards de métricas principais"
```

## 🎨 Features Dinâmicas

### Filtros Avançados
- Painel expansível
- Busca em tempo real
- Datepicker para períodos
- Selects múltiplos
- Chips para seleção

### Tabela Dinâmica
- Ordenação por colunas
- Paginação
- Ações por linha
- Seleção múltipla
- Dados simulados realistas

### Cards de Métricas
- Grid responsivo
- Ícones dinâmicos
- Cores temáticas
- Animações suaves

### Gráficos Interativos
- Tipos: Barra, Pizza, Linha, Área, Donut
- Interatividade (hover, click)
- Responsividade
- Legendas dinâmicas

### Modais Inteligentes
- Formulários reativos
- Validação em tempo real
- Upload de arquivos
- Confirmações
- Animações suaves

## 📚 Documentação Automática

O sistema gera automaticamente documentação detalhada:

### Documentação Básica
- Análise do prompt
- Features selecionadas
- Configurações específicas
- Recomendações
- Estatísticas

### Documentação para IA/Copilot
- Especificações técnicas detalhadas
- Instruções de implementação
- Checklist de qualidade
- Comandos de desenvolvimento
- Recursos úteis

## 🔧 Tecnologias Suportadas

- **Angular 17+** (standalone components)
- **Angular Material** (UI components)
- **TypeScript** (tipagem forte)
- **SCSS** (estilos)
- **RxJS** (reactive programming)

## 📁 Estrutura do Projeto

```
nx-ia/
├── 📋 Setup e Comandos
│   ├── SETUP.md                    # Setup completo
│   └── COMANDOS-RAPIDOS.md        # Comandos essenciais
├── 📖 Documentação Técnica
│   ├── SISTEMA-HIBRIDO-IA-NX.md   # Documentação técnica
│   └── IA-NX-INTEGRATION.md       # Integração IA + Nx
├── 📁 Documentação Gerada
│   └── docs/                       # Análises e especificações
├── 🔄 Guias de Migração
│   └── migration-guides/           # React → Angular
├── 🛠️ Código Fonte
│   ├── apps/                       # Aplicações Angular
│   └── libs/schematics/           # Geradores customizados
└── 📚 Scripts e Utilitários
    └── scripts/                    # Scripts de análise
```

## 📁 Estrutura Gerada

```
apps/dashboard/src/app/nome-da-tela/
├── nome-da-tela.component.ts      # Lógica principal
├── nome-da-tela.component.html    # Template
├── nome-da-tela.component.scss    # Estilos
└── nome-da-tela.component.spec.ts # Testes
```

## 🎯 Lógica de Decisão

### Quando Usar IA:
- Features avançadas (cards, gráficos, modal, exportação, responsivo)
- Muitas features básicas (>3)
- `forceAI=true` explicitamente
- Prompt detalhado fornecido

### Quando Usar Nx:
- Features básicas (filtros, tabela, ações, formulário)
- Poucas features (<3)
- `forceNx=true` explicitamente
- Geração rápida necessária

## 🚀 Comandos de Desenvolvimento

```bash
# Servir aplicação
npx nx serve dashboard

# Testar componente
npx nx test dashboard

# Build do projeto
npx nx build dashboard

# Lint do código
npx nx lint dashboard
```

## 📊 Exemplos Práticos

### Dashboard de Vendas
```bash
npx nx g @usando-nx/schematics:hybrid-generator dashboard-vendas \
  --features="cards,graficos,filtros,tabela" \
  --forceAI=true
```

### Gerenciamento de Usuários
```bash
npx nx g @usando-nx/schematics:generate-screen usuarios \
  --features="filtros,tabela,acoes,modal" \
  --generateDocs=true
```

### Relatório Avançado
```bash
npx nx g @usando-nx/schematics:ai-generate-screen relatorio-vendas \
  --prompt="Relatório de vendas com gráficos de barras, cards de métricas principais, filtros por período e exportação para Excel"
```

## 🔍 Análise Inteligente

O sistema analisa automaticamente:
- Features selecionadas
- Complexidade do prompt
- Configurações específicas
- Contexto do projeto

E decide a melhor abordagem para geração.

## 📋 Checklist de Qualidade

### Funcionalidade
- [ ] Todas as features implementadas
- [ ] Dados simulados funcionais
- [ ] Validações implementadas
- [ ] Responsividade testada

### Código
- [ ] TypeScript com tipos corretos
- [ ] Imports otimizados
- [ ] Métodos bem estruturados
- [ ] Nomenclatura consistente

### UI/UX
- [ ] Design moderno
- [ ] Animações suaves
- [ ] Feedback visual
- [ ] Acessibilidade

### Performance
- [ ] Lazy loading quando apropriado
- [ ] Otimização de imports
- [ ] Dados paginados
- [ ] Debounce em filtros

## 📚 Documentação Completa

### **📋 Guias de Setup e Uso**
- **[SETUP.md](./SETUP.md)** - Guia completo de setup e configuração
- **[COMANDOS-RAPIDOS.md](./COMANDOS-RAPIDOS.md)** - Comandos essenciais para começar rapidamente

### **📖 Documentação Técnica**
- **[SISTEMA-HIBRIDO-IA-NX.md](./SISTEMA-HIBRIDO-IA-NX.md)** - Documentação técnica completa do sistema
- **[IA-NX-INTEGRATION.md](./IA-NX-INTEGRATION.md)** - Guia de integração IA + Nx

### **📁 Documentação Gerada**
- **[docs/](./docs/)** - Documentação automática gerada pelos geradores
  - `*-analysis.md` - Análise de prompts e recomendações
  - `*-detailed-spec.md` - Especificações detalhadas para IA/Copilot

### **🔄 Guias de Migração**
- **[migration-guides/](./migration-guides/)** - Guias para migração React → Angular
  - [README.md](./migration-guides/README.md) - Visão geral da migração
  - [component-patterns.md](./migration-guides/component-patterns.md) - Padrões de componentes
  - [forms.md](./migration-guides/forms.md) - Migração de formulários
  - [routing.md](./migration-guides/routing.md) - Migração de rotas
  - [state-management.md](./migration-guides/state-management.md) - Gerenciamento de estado
  - [testing.md](./migration-guides/testing.md) - Testes

### **📖 Documentação Adicional**
- **[EXEMPLO-DETALHADO.md](./EXEMPLO-DETALHADO.md)** - Exemplo detalhado de uso
- **[EXEMPLOS-USO-IA-NX.md](./EXEMPLOS-USO-IA-NX.md)** - Exemplos práticos de uso

## 🎯 Benefícios do Sistema

### **✅ Para Desenvolvedores**
- **Geração rápida** de telas com comandos simples
- **Decisão inteligente** entre Nx e IA automaticamente
- **Documentação automática** para cada componente gerado
- **Features dinâmicas** baseadas na seleção do usuário
- **Templates otimizados** com imports apenas necessários

### **✅ Para Projetos**
- **Consistência** visual e de código
- **Padrões estabelecidos** seguindo Angular Material
- **Manutenibilidade** com estrutura padronizada
- **Escalabilidade** com monorepo Nx
- **Performance** otimizada

### **✅ Para IA/Copilot**
- **Contexto claro** com documentação detalhada
- **Especificações precisas** para implementação
- **Exemplos concretos** de código
- **Checklist de qualidade** para validação
- **Recursos úteis** para desenvolvimento

## 🔗 Recursos Externos

- **Angular Material**: https://material.angular.io/
- **Angular Docs**: https://angular.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **RxJS**: https://rxjs.dev/guide/overview
- **Nx Documentation**: https://nx.dev/

---

*Sistema Híbrido IA + Nx - Geração Inteligente de Componentes Angular*
