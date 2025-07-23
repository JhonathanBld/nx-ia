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
│   └── generate-with-ai.js # CLI interativo
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

### ✅ 3. Scripts de Análise e Geração
- **`analyze-prompt.js`**: Análise de complexidade e geração de MD
- **`smart-generator.js`**: Execução automática com documentação
- **`generate-with-ai.js`**: CLI interativo para geração

### ✅ 4. Documentação Automática
- **Análise de Prompts**: Gera relatórios detalhados em Markdown
- **Recomendações**: Sugere Nx ou IA baseado na complexidade
- **Comandos**: Fornece comandos prontos para execução
- **Estatísticas**: Métricas de features detectadas

### ✅ 5. Features Avançadas (IA)
- **Cards de Métricas**: Com ícones e indicadores de performance
- **Gráficos**: Barras, pizza, linha com dados simulados
- **Filtros Avançados**: Datepicker, selects, chips
- **Tabelas Dinâmicas**: Com ordenação, paginação e ações
- **Responsividade**: Layout adaptativo para mobile/desktop

### ✅ 6. Features Básicas (Nx)
- **CRUD Simples**: Create, Read, Update, Delete
- **Filtros Básicos**: Input text, select simples
- **Tabelas Padrão**: Com colunas fixas
- **Botões de Ação**: Padrão Material Design

## 🛠️ Como Usar

### 🎯 Análise de Prompt e Geração

#### 1. Análise Automática
```bash
# Analisar prompt e gerar documentação
node scripts/analyze-prompt.js "Dashboard com cards de métricas e gráficos" dashboardvendas

# Resultado: docs/dashboardvendas-analysis.md
```

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

### 📊 Estrutura Gerada (IA Avançado)

```
apps/dashboard/src/app/dashboardvendas/
├── dashboardvendas.component.ts      # Lógica com imports completos
├── dashboardvendas.component.html    # Template dinâmico com cards/gráficos
├── dashboardvendas.component.scss    # Estilos responsivos
└── dashboardvendas.component.spec.ts # Testes completos
```

### 📋 Estrutura Gerada (Nx Básico)

```
apps/dashboard/src/app/usuarios/
├── usuarios.component.ts
├── usuarios.component.html
├── usuarios.component.scss
└── usuarios.component.spec.ts
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
- **`forceAI`**: Forçar uso da IA
- **`forceNx`**: Forçar uso do Nx

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
# Geração híbrida (recomendado)
npx nx g ./dist/libs/schematics:hybrid-generator dashboardvendas --prompt="Dashboard com cards de métricas e gráficos"

# Forçar IA
npx nx g ./dist/libs/schematics:hybrid-generator dashboardvendas --prompt="Dashboard com cards de métricas e gráficos" --forceAI=true

# Forçar Nx
npx nx g ./dist/libs/schematics:hybrid-generator usuarios --prompt="Lista simples de usuários" --forceNx=true

# Generator básico (legado)
npx nx g @usando-nx/schematics:generate-screen usuarios
```

### 📊 Análise e Documentação
```bash
# Análise de prompt
node scripts/analyze-prompt.js "Dashboard com cards de métricas e gráficos" dashboardvendas

# Geração automática com documentação
node scripts/smart-generator.js "Tela de produtos com filtros" telaprodutos --execute

# CLI interativo
node scripts/generate-with-ai.js
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

1. **Analise o prompt**: Use `scripts/analyze-prompt.js`
2. **Gere a tela**: Use `hybrid-generator` com recomendação
3. **Teste a funcionalidade**: Execute `npx nx serve dashboard`
4. **Customize conforme necessário**: Edite os arquivos gerados
5. **Documente mudanças**: Atualize a documentação

---

**Lembre-se**: O sistema híbrido é inteligente e complementar. Use Nx para features básicas e IA para features avançadas. A análise automática garante a melhor abordagem para cada caso.
