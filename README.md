# Sistema Híbrido IA + Nx - Workspace Angular

Este workspace Nx Angular implementa um sistema híbrido inteligente que combina generators Nx tradicionais com IA para gerar telas Angular avançadas, analisando automaticamente a complexidade do prompt e decidindo a melhor abordagem de geração.

## 🚀 Estrutura do Projeto

```
usando-nx/
├── apps/
│   └── dashboard/          # App Angular principal
├── libs/
│   └── schematics/         # Lib com generators híbridos
│       └── src/generators/
│           ├── hybrid-generator/    # Generator híbrido IA + Nx
│           └── generate-screen/     # Generator básico Nx
├── scripts/                # Scripts de análise e geração
│   ├── analyze-prompt.js   # Análise de complexidade
│   ├── smart-generator.js  # Execução automática
│   ├── generate-with-ai.js # CLI interativo
│   └── generate-ui.js      # Generator UI simplificado
├── docs/                   # Documentação gerada
│   ├── dashboardvendas-analysis.md
│   └── telaprodutos-analysis.md
├── migration-guides/       # Documentação de migração React → Angular
└── README.md              # Este arquivo
```

## 📋 Características Implementadas

### ✅ 1. Sistema Híbrido IA + Nx
- **Análise Inteligente**: Detecta complexidade do prompt automaticamente
- **Decisão Automática**: Escolhe entre Nx (básico) ou IA (avançado)
- **Complementaridade**: Nx para features básicas, IA para avançadas
- **Imports Otimizados**: Carrega apenas módulos necessários

### ✅ 2. Generator Híbrido "hybrid-generator"
- **Localização**: `libs/schematics/src/generators/hybrid-generator/`
- **Features Básicas (Nx)**: Filtros, tabelas, botões, paginação
- **Features Avançadas (IA)**: Gráficos, cards, modais, export, responsividade
- **Templates Dinâmicos**: Geração baseada em features detectadas

### ✅ 3. Generator UI Inteligente (NOVO)
- **Validação Condicional**: Campos aparecem apenas quando relevantes
- **Interface Amigável**: Formulário interativo com prompts claros
- **Validação Automática**: Remove opções desnecessárias
- **UX Otimizada**: Menos confusão para o usuário

### ✅ 4. Prompt Detalhado para IA (NOVO)
- **Especificações Precisas**: Campo para descrição detalhada da tela
- **Documentação para Copilot**: Arquivo markdown específico para IA
- **Contexto Enriquecido**: Layout, componentes, dados específicos
- **Checklist de Implementação**: Instruções claras para desenvolvimento

### ✅ 5. Scripts de Análise e Geração
- **`analyze-prompt.js`**: Análise de complexidade e geração de MD
- **`smart-generator.js`**: Execução automática com documentação
- **`generate-with-ai.js`**: CLI interativo para geração
- **`generate-ui.js`**: Generator UI simplificado (NOVO)

### ✅ 6. Documentação Automática
- **Análise de Prompts**: Gera relatórios detalhados em Markdown
- **Recomendações**: Sugere Nx ou IA baseado na complexidade
- **Comandos**: Fornece comandos prontos para execução
- **Estatísticas**: Métricas de features detectadas
- **Documentação Detalhada**: Arquivo específico para Copilot (IA)

### ✅ 7. Features Avançadas (IA)
- **Cards de Métricas**: Com ícones e indicadores de performance
- **Gráficos**: Barras, pizza, linha com dados simulados
- **Filtros Avançados**: Datepicker, selects, chips
- **Tabelas Dinâmicas**: Com ordenação, paginação e ações
- **Responsividade**: Layout adaptativo para mobile/desktop

### ✅ 8. Features Básicas (Nx)
- **CRUD Simples**: Create, Read, Update, Delete
- **Filtros Básicos**: Input text, select simples
- **Tabelas Padrão**: Com colunas fixas
- **Botões de Ação**: Padrão Material Design

## 🛠️ Como Usar

### 🎯 **Generator UI (PADRÃO RECOMENDADO)**

O sistema agora usa o **Generator UI do Nx** como padrão para uma experiência mais amigável:

#### 1. **Script Simplificado**
```bash
# Abre o Generator UI automaticamente
node scripts/generate-ui.js

# Ou especificar o tipo
node scripts/generate-ui.js hybrid  # Híbrido (IA + Nx)
node scripts/generate-ui.js ai      # Apenas IA
node scripts/generate-ui.js nx      # Apenas Nx
```

#### 2. **Generator UI Direto**
```bash
# Abre interface gráfica para preenchimento
npx nx g @usando-nx/schematics:hybrid-generator
npx nx g @usando-nx/schematics:ai-generate-screen
npx nx g @usando-nx/schematics:generate-screen
```

#### 3. **Interface do Generator UI**
```
┌─────────────────────────────────────────────────────────┐
│                    Generator UI                        │
├─────────────────────────────────────────────────────────┤
│ Nome da Tela: [________________]                       │
│                                                        │
│ Prompt: [________________________________]            │
│                                                        │
│ Features: [ ] Filtros  [ ] Tabela  [ ] Gráficos      │
│           [ ] Cards    [ ] Modal   [ ] Exportação     │
│                                                        │
│ Projeto: [dashboard]                                  │
│                                                        │
│ [GERAR TELA]  [CANCELAR]                             │
└─────────────────────────────────────────────────────────┘
```

### 🎯 **Validação Condicional (NOVO)**

O sistema agora é **inteligente** e só mostra campos relevantes:

#### Exemplo 1: Sem Tabela
```bash
# Features selecionadas: cards, graficos
# Campos que aparecem: ✅ Nome, Prompt, Features, Projeto
# Campos que NÃO aparecem: ❌ Colunas, Filtros específicos, Ações específicas
```

#### Exemplo 2: Com Tabela
```bash
# Features selecionadas: tabela, filtros, acoes
# Campos que aparecem: ✅ Nome, Prompt, Features, Projeto, Colunas, Filtros, Ações
```

#### Exemplo 3: Apenas Cards
```bash
# Features selecionadas: cards, graficos
# Campos que aparecem: ✅ Nome, Prompt, Features, Projeto
# Campos que NÃO aparecem: ❌ Colunas, Filtros específicos, Ações específicas
```

### 📊 Análise de Prompt e Geração

#### 1. Análise Automática
```bash
# Analisar prompt e gerar documentação
node scripts/analyze-prompt.js "Dashboard com cards de métricas e gráficos" dashboardvendas

# Resultado: docs/dashboardvendas-analysis.md
```

### 🎯 Prompt Detalhado para IA (NOVO)

Quando você seleciona **features avançadas** (cards, gráficos, modal, etc.) ou força o uso da IA, o sistema automaticamente solicita um **prompt detalhado** para melhorar a precisão da geração.

#### **Interface do Generator UI:**
```
┌─────────────────────────────────────────────────────────┐
│                    Generator UI                        │
├─────────────────────────────────────────────────────────┤
│ Nome da Tela: [DashboardFinanceiro]                   │
│                                                        │
│ Prompt: [Dashboard com cards de métricas]             │
│                                                        │
│ Features: [x] Cards  [x] Gráficos  [ ] Filtros       │
│           [ ] Tabela  [ ] Modal    [ ] Exportação     │
│                                                        │
│ Projeto: [dashboard]                                  │
│                                                        │
│ Forçar uso da IA? (y/N) · true                       │
│                                                        │
│ Descreva detalhadamente a tela:                       │
│ [Crie um dashboard financeiro com: 1) Cards de        │
│  métricas no topo: Receita Total (R$ 150.000),       │
│  Despesas (R$ 80.000), Lucro (R$ 70.000), Clientes   │
│  Ativos (1.250) - cada card com ícone, valor grande  │
│  e percentual de crescimento. 2) Gráfico de barras:  │
│  Vendas mensais dos últimos 6 meses com cores        │
│  diferentes por mês. 3) Gráfico de pizza: Distribui- │
│  ção de gastos por categoria. 4) Filtros: Seletor    │
│  de período e dropdown de categoria. 5) Layout       │
│  responsivo. 6) Animações suaves. 7) Botão de       │
│  exportação Excel.]                                   │
│                                                        │
│ Gerar documentação detalhada para Copilot? (Y/n) · true│
│                                                        │
│ [GERAR TELA]  [CANCELAR]                             │
└─────────────────────────────────────────────────────────┘
```

#### **Documentação Gerada:**

O sistema gera **dois arquivos** quando usa IA com prompt detalhado:

**A) Documentação Básica** (`docs/dashboardfinanceiro-analysis.md`)
- Análise de prompt e features
- Recomendação de gerador (IA/Nx)
- Estatísticas e complexidade
- Comandos executados

**B) Documentação Detalhada** (`docs/dashboardfinanceiro-detailed-spec.md`)
- **Especificação completa** para Copilot
- **Prompt detalhado** exato
- **Estrutura esperada** (TypeScript, HTML, SCSS)
- **Features específicas** com instruções
- **Checklist de implementação**
- **Comandos úteis**

#### **Exemplo de Prompt Detalhado:**
```
Crie um dashboard financeiro com: 1) Cards de métricas no topo: Receita Total (R$ 150.000), Despesas (R$ 80.000), Lucro (R$ 70.000), Clientes Ativos (1.250) - cada card com ícone, valor grande e percentual de crescimento. 2) Gráfico de barras: Vendas mensais dos últimos 6 meses com cores diferentes por mês. 3) Gráfico de pizza: Distribuição de gastos por categoria (Marketing 30%, Operacional 25%, RH 20%, TI 15%, Outros 10%). 4) Filtros: Seletor de período (último mês, 3 meses, 6 meses, 1 ano) e dropdown de categoria. 5) Layout responsivo: Cards em grid 2x2 no desktop, empilhados no mobile. 6) Animações suaves nos cards e gráficos. 7) Botão de exportação Excel no canto superior direito.
```

#### **💡 Dicas para Prompts Detalhados:**

**✅ O que incluir:**
- Layout específico (grid, flexbox, posicionamento)
- Componentes específicos (cards, gráficos, tabelas)
- Dados específicos (valores, categorias, cores)
- Funcionalidades específicas (filtros, ações, validações)
- Animações específicas (transições, efeitos)
- Responsividade específica (breakpoints, comportamentos)

**❌ O que evitar:**
- Prompts muito genéricos
- Falta de especificidade
- Não mencionar dados específicos
- Não detalhar layout
- Não especificar funcionalidades

#### 2. Geração Híbrida (Recomendado)
```bash
# Geração automática com análise
npx nx g ./dist/libs/schematics:hybrid-generator dashboardvendas --prompt="Dashboard com cards de métricas e gráficos"

# Forçar uso da IA
npx nx g ./dist/libs/schematics:hybrid-generator dashboardvendas --prompt="Dashboard com cards de métricas e gráficos" --forceAI=true

# Forçar uso do Nx
npx nx g ./dist/libs/schematics:hybrid-generator dashboardvendas --prompt="Lista simples de usuários" --forceNx=true
```

#### 3. Scripts Interativos
```bash
# CLI interativo
node scripts/generate-with-ai.js

# Execução automática com documentação
node scripts/smart-generator.js "Tela de produtos com filtros" telaprodutos
```

### 🚀 Executar o App

```bash
# Servir o app dashboard
npx nx serve dashboard

# Build do projeto
npx nx build dashboard

# Executar testes
npx nx test dashboard

# Lint do projeto
npx nx lint dashboard
```

## 📚 Documentação e Análise

### 📊 Relatórios de Análise

Os scripts geram relatórios detalhados em `docs/`:

1. **`dashboardvendas-analysis.md`**: Análise do dashboard de vendas
   - Features detectadas: gráficos, cards
   - Recomendação: IA (avançado)
   - Comandos prontos para execução
   - Estatísticas de complexidade

2. **`telaprodutos-analysis.md`**: Análise de tela de produtos
   - Features detectadas: filtros, tabelas
   - Recomendação: Nx (básico)
   - Estrutura gerada
   - Próximos passos

### 🎯 Como Interpretar os Relatórios

#### Features Detectadas
- **Básicas (Nx)**: filtros, tabelas, botões, paginação
- **Avançadas (IA)**: gráficos, cards, modais, export, responsividade

#### Níveis de Complexidade
- **basic**: Features simples, usar Nx
- **advanced**: Features complexas, usar IA
- **mixed**: Combinação, usar IA com otimizações

#### Recomendações
- **🤖 IA**: Para dashboards, gráficos, cards, modais
- **⚡ Nx**: Para CRUD simples, listas, filtros básicos

### 📋 Documentação de Migração

#### Guias Disponíveis

1. **README Principal**: `migration-guides/README.md`
   - Visão geral da migração
   - Checklist completo
   - Ferramentas recomendadas

2. **Padrões de Componentes**: `migration-guides/component-patterns.md`
   - Mapeamento React → Angular
   - Exemplos de conversão
   - Lifecycle hooks
   - Templates vs JSX

### 🤖 Assistência com IA

#### GitHub Copilot
```bash
# Prompt para converter componente React
Converta este componente React para Angular seguindo o padrão do generator hybrid-generator:

[cole o código React aqui]
```

#### Cursor
```bash
# Prompt para refatoração
Converta este código React para Angular seguindo o padrão do generator hybrid-generator
```

## 🎯 Padrões Estabelecidos

### 🏗️ Estrutura de Arquivos

#### IA Avançado
```
src/app/{nome-da-tela}/
├── {nome-da-tela}.component.ts      # Imports completos + lógica avançada
├── {nome-da-tela}.component.html    # Template com cards/gráficos
├── {nome-da-tela}.component.scss    # Estilos responsivos
└── {nome-da-tela}.component.spec.ts # Testes completos
```

#### Nx Básico
```
src/app/{nome-da-tela}/
├── {nome-da-tela}.component.ts      # Imports básicos + CRUD
├── {nome-da-tela}.component.html    # Template simples
├── {nome-da-tela}.component.scss    # Estilos básicos
└── {nome-da-tela}.component.spec.ts # Testes básicos
```

### 📝 Convenções de Nomenclatura
- **Componentes**: PascalCase + "Component" (ex: `DashboardvendasComponent`)
- **Arquivos**: kebab-case (ex: `dashboardvendas.component.ts`)
- **Seletor**: `app-` + kebab-case (ex: `app-dashboardvendas`)

### 💻 Padrões de Código

#### IA Avançado
- **Imports**: Todos os módulos Material Design necessários
- **Lifecycle**: `OnInit` com carregamento de dados
- **Estado**: Arrays e objetos para dados complexos
- **Templates**: Cards, gráficos, filtros avançados
- **Responsividade**: CSS Grid e Flexbox

#### Nx Básico
- **Imports**: Apenas módulos básicos (table, button, input)
- **Lifecycle**: `OnInit` simples
- **Estado**: Arrays simples para dados
- **Templates**: Tabelas e filtros básicos
- **Estilos**: CSS básico

## 🔧 Configuração e Scripts

### 📋 Schema do Hybrid Generator

O arquivo `libs/schematics/src/generators/hybrid-generator/schema.json` define:

- **`name`**: Nome do componente
- **`project`**: Projeto de destino
- **`prompt`**: Descrição da tela a ser gerada
- **`features`**: Features da tela (com validação condicional)
- **`forceAI`**: Forçar uso da IA
- **`forceNx`**: Forçar uso do Nx
- **`generateDocs`**: Gerar documentação automática

### 🎯 Validação Condicional (NOVO)

O schema usa `allOf` com `if`/`then` para validação condicional:

```json
{
  "allOf": [
    {
      "if": { "properties": { "features": { "contains": { "const": "tabela" } } } },
      "then": { "properties": { "columns": { "type": "array", "x-prompt": "..." } } }
    },
    {
      "if": { "properties": { "features": { "contains": { "const": "filtros" } } } },
      "then": { "properties": { "filters": { "type": "array", "x-prompt": "..." } } }
    }
  ]
}
```

### 🤖 Scripts de Análise

#### `scripts/analyze-prompt.js`
```bash
# Uso: node scripts/analyze-prompt.js "prompt" nome-componente
node scripts/analyze-prompt.js "Dashboard com cards de métricas e gráficos" dashboardvendas
```

**Funcionalidades:**
- Análise de complexidade do prompt
- Detecção de features (básicas/avançadas)
- Geração de relatório Markdown
- Recomendação Nx vs IA
- Comandos prontos para execução

#### `scripts/smart-generator.js`
```bash
# Uso: node scripts/smart-generator.js "prompt" nome-componente [--execute]
node scripts/smart-generator.js "Tela de produtos com filtros" telaprodutos --execute
```

**Funcionalidades:**
- Análise automática
- Execução opcional do comando
- Geração de documentação
- Relatório de estatísticas

#### `scripts/generate-with-ai.js`
```bash
# Uso: node scripts/generate-with-ai.js
node scripts/generate-with-ai.js
```

**Funcionalidades:**
- CLI interativo
- Input de prompt via terminal
- Opções de força (Nx/IA)
- Execução direta

#### `scripts/generate-ui.js` (NOVO)
```bash
# Uso: node scripts/generate-ui.js [tipo]
node scripts/generate-ui.js hybrid
```

**Funcionalidades:**
- Abre Generator UI automaticamente
- Validação condicional integrada
- Interface amigável
- Dicas de uso

## 🤖 Prompts para IA

### GitHub Copilot
```bash
# Prompt para converter componente React
Converta este componente React para Angular seguindo o padrão do generator hybrid-generator:

[cole o código React aqui]

Inclua:
- Imports completos do Material Design
- OnInit para lifecycle
- Template HTML separado com cards/gráficos
- EventEmitter para outputs
- Arrays para dados complexos
- Responsividade com CSS Grid
```

### Cursor
```bash
# Prompt para refatoração
Transforme este JSX em template Angular:

[cole o JSX aqui]

Use:
- *ngIf para conditional rendering
- *ngFor para loops
- (click) para event handlers
- {{ }} para interpolation
- [property] para property binding
- mat-card para cards
- mat-table para tabelas
- mat-icon para ícones
```

## 📋 Checklist de Migração

### ✅ Pré-migração
- [ ] Analisar estrutura do projeto React
- [ ] Identificar dependências externas
- [ ] Mapear componentes principais
- [ ] Definir estratégia de migração

### ✅ Durante a migração
- [ ] Converter componentes um por vez
- [ ] Manter funcionalidade existente
- [ ] Escrever testes para componentes migrados
- [ ] Documentar mudanças

### ✅ Pós-migração
- [ ] Validar funcionalidade completa
- [ ] Otimizar performance
- [ ] Atualizar documentação
- [ ] Treinar equipe nos novos padrões

## 🚀 Comandos Úteis

### 🎯 Geração de Telas
```bash
# Generator UI (RECOMENDADO)
node scripts/generate-ui.js
npx nx g @usando-nx/schematics:hybrid-generator

# Geração híbrida (recomendado)
npx nx g ./dist/libs/schematics:hybrid-generator dashboardvendas --prompt="Dashboard com cards de métricas e gráficos"

# Forçar IA
npx nx g ./dist/libs/schematics:hybrid-generator dashboardvendas --prompt="Dashboard com cards de métricas e gráficos" --forceAI=true

# Forçar Nx
npx nx g ./dist/libs/schematics:hybrid-generator usuarios --prompt="Lista simples de usuários" --forceNx=true

# Generator básico (legado)
npx nx g @usando-nx/schematics:generate-screen usuarios
```

### 🎯 Exemplos com Prompt Detalhado (NOVO)
```bash
# Dashboard Financeiro com IA
npx nx g @usando-nx/schematics:hybrid-generator DashboardFinanceiro --prompt="Dashboard financeiro" --features=cards,graficos,filtros --forceAI=true --detailedPrompt="Crie um dashboard financeiro com: 1) Cards de métricas no topo: Receita Total (R$ 150.000), Despesas (R$ 80.000), Lucro (R$ 70.000), Clientes Ativos (1.250) - cada card com ícone, valor grande e percentual de crescimento. 2) Gráfico de barras: Vendas mensais dos últimos 6 meses com cores diferentes por mês. 3) Gráfico de pizza: Distribuição de gastos por categoria (Marketing 30%, Operacional 25%, RH 20%, TI 15%, Outros 10%). 4) Filtros: Seletor de período (último mês, 3 meses, 6 meses, 1 ano) e dropdown de categoria. 5) Layout responsivo: Cards em grid 2x2 no desktop, empilhados no mobile. 6) Animações suaves nos cards e gráficos. 7) Botão de exportação Excel no canto superior direito." --generateDetailedDocs=true

# Tela de Produtos Avançada
npx nx g @usando-nx/schematics:hybrid-generator ProdutosAvancado --prompt="Tela de produtos avançada" --features=tabela,filtros,acoes,modal --forceAI=true --detailedPrompt="Crie uma tela de produtos com: 1) Filtros avançados no topo: Busca por nome (com autocomplete), Seletor de categoria (múltipla seleção), Range de preço (slider duplo), Status (ativo/inativo). 2) Tabela com colunas: Foto (thumbnail), Nome, Categoria, Preço, Estoque, Status, Ações - com ordenação por todas as colunas. 3) Ações por linha: Visualizar (modal), Editar (modal), Excluir (confirmação), Ativar/Desativar (toggle). 4) Modal de criação/edição com: Upload de foto, Validação em tempo real, Preview da imagem. 5) Paginação com 10 itens por página. 6) Botão de exportação Excel com filtros aplicados. 7) Layout responsivo: Tabela com scroll horizontal no mobile." --generateDetailedDocs=true

# Formulário de Cadastro
npx nx g @usando-nx/schematics:hybrid-generator CadastroCliente --prompt="Formulário de cadastro" --features=formulario,modal --forceAI=true --detailedPrompt="Crie um formulário de cadastro de cliente com: 1) Stepper de 3 etapas: Dados Pessoais, Endereço, Confirmação. 2) Etapa 1: Nome completo, Email, Telefone, CPF, Data de nascimento - com máscaras e validações. 3) Etapa 2: CEP (com busca automática), Endereço, Número, Complemento, Bairro, Cidade, Estado - com auto-complete de cidade/estado. 4) Etapa 3: Resumo dos dados e confirmação. 5) Upload de foto do cliente com preview. 6) Validações: Campos obrigatórios, email válido, CPF válido, CEP válido. 7) Botões: Anterior, Próximo, Salvar, Cancelar. 8) Animações suaves entre etapas." --generateDetailedDocs=true
```

### 📊 Análise e Documentação
```bash
# Análise de prompt
node scripts/analyze-prompt.js "Dashboard com cards de métricas e gráficos" dashboardvendas

# Geração automática com documentação
node scripts/smart-generator.js "Tela de produtos com filtros" telaprodutos --execute

# CLI interativo
node scripts/generate-with-ai.js

# Generator UI simplificado (NOVO)
node scripts/generate-ui.js hybrid
```

### 🛠️ Desenvolvimento
```bash
# Executar testes
npx nx test dashboard

# Build do projeto
npx nx build dashboard

# Servir aplicação
npx nx serve dashboard

# Lint do projeto
npx nx lint dashboard
```

## 📞 Suporte

Para dúvidas sobre o sistema híbrido IA + Nx:

1. **Consulte a documentação** em `docs/` e `migration-guides/`
2. **Use GitHub Copilot/Cursor** com prompts específicos
3. **Analise exemplos** gerados pelo `hybrid-generator`
4. **Revise padrões** estabelecidos nos templates
5. **Execute scripts** de análise para entender a complexidade

### 🎯 Fluxo Recomendado

1. **Use o Generator UI**: `node scripts/generate-ui.js`
2. **Analise o prompt**: Use `scripts/analyze-prompt.js`
3. **Gere a tela**: Use `hybrid-generator` com recomendação
4. **Teste a funcionalidade**: Execute `npx nx serve dashboard`
5. **Customize conforme necessário**: Edite os arquivos gerados
6. **Documente mudanças**: Atualize a documentação

## 🎯 Benefícios

### ✅ **Para o Desenvolvedor**
- **Geração rápida** de telas
- **Decisão inteligente** entre Nx e IA
- **Documentação automática**
- **Validação condicional**
- **Prompt detalhado** para especificações precisas

### ✅ **Para o Copilot**
- **Contexto claro** com documentação detalhada
- **Especificações precisas** com prompt detalhado
- **Exemplos concretos** de implementação
- **Checklist de implementação**
- **Prompt detalhado** para melhor precisão
- **Documentação específica** para IA

### ✅ **Para o Projeto**
- **Consistência** visual e de código
- **Padrões estabelecidos**
- **Documentação automática**
- **Manutenibilidade**
- **Especificações claras** para desenvolvimento

---

**Lembre-se**: O sistema híbrido é inteligente e complementar. Use Nx para features básicas e IA para features avançadas. A análise automática garante a melhor abordagem para cada caso. O **Generator UI** agora é o padrão para uma experiência mais amigável! 

**Dica**: Quanto mais detalhado o prompt, melhor será o resultado! 🎉
