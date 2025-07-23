# Exemplo Prático - Prompt Detalhado para IA

Este arquivo demonstra como usar a nova funcionalidade de **prompt detalhado** para melhorar a geração de telas com IA.

## 🎯 Como Funciona

### 1. **Generator UI com Prompt Detalhado**

Quando você seleciona features avançadas (cards, gráficos, modal, etc.) ou força o uso da IA, o sistema automaticamente solicita um **prompt detalhado**.

#### Interface que aparece:
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

### 2. **Documentação Gerada**

O sistema gera **dois arquivos** quando usa IA com prompt detalhado:

#### A) Documentação Básica (`docs/dashboardfinanceiro-analysis.md`)
```markdown
# Análise de Prompt - DashboardFinanceiro

## 📋 Informações Gerais
- **Data**: 2025-07-23
- **Componente**: DashboardFinanceiro
- **Prompt**: "Dashboard com cards de métricas"
- **Complexidade**: advanced
- **Recomendação**: 🤖 IA

## 🔍 Análise Detalhada
### Features Detectadas
- ✅ cards
- ✅ graficos

### Features IA (Avançadas)
- 🤖 cards
- 🤖 graficos

## 🎯 Recomendação
### 🤖 Usar IA (Avançado)
**Motivo**: Features avançadas detectadas que requerem análise inteligente.

## 📊 Estatísticas
- **Total de Features**: 2
- **Features IA**: 2
- **Nível de Complexidade**: advanced
```

#### B) Documentação Detalhada (`docs/dashboardfinanceiro-detailed-spec.md`)
```markdown
# Especificação Detalhada - DashboardFinanceiro

## 📋 Informações do Projeto
- **Data**: 2025-07-23
- **Componente**: DashboardFinanceiro
- **Prompt Básico**: "Dashboard com cards de métricas"
- **Prompt Detalhado**: "Crie um dashboard financeiro com: 1) Cards de métricas no topo: Receita Total (R$ 150.000), Despesas (R$ 80.000), Lucro (R$ 70.000), Clientes Ativos (1.250) - cada card com ícone, valor grande e percentual de crescimento. 2) Gráfico de barras: Vendas mensais dos últimos 6 meses com cores diferentes por mês. 3) Gráfico de pizza: Distribuição de gastos por categoria. 4) Filtros: Seletor de período e dropdown de categoria. 5) Layout responsivo. 6) Animações suaves. 7) Botão de exportação Excel."
- **Features**: cards, graficos
- **Gerador**: IA 🤖

## 🎯 Especificação para Copilot

### 📝 Prompt Detalhado
```
Crie um dashboard financeiro com: 1) Cards de métricas no topo: Receita Total (R$ 150.000), Despesas (R$ 80.000), Lucro (R$ 70.000), Clientes Ativos (1.250) - cada card com ícone, valor grande e percentual de crescimento. 2) Gráfico de barras: Vendas mensais dos últimos 6 meses com cores diferentes por mês. 3) Gráfico de pizza: Distribuição de gastos por categoria. 4) Filtros: Seletor de período e dropdown de categoria. 5) Layout responsivo. 6) Animações suaves. 7) Botão de exportação Excel.
```

### 🏗️ Estrutura Esperada

#### Componente TypeScript
```typescript
// dashboardfinanceiro.component.ts
import { Component, OnInit } from '@angular/core';
// Imports necessários baseados nas features: cards, graficos

@Component({
  selector: 'app-dashboardfinanceiro',
  templateUrl: './dashboardfinanceiro.component.html',
  styleUrls: ['./dashboardfinanceiro.component.scss']
})
export class DashboardfinanceiroComponent implements OnInit {
  // Implementar lógica baseada no prompt detalhado
}
```

#### Template HTML
```html
<!-- dashboardfinanceiro.component.html -->
<!-- Implementar template baseado no prompt detalhado -->
```

#### Estilos SCSS
```scss
/* dashboardfinanceiro.component.scss */
/* Implementar estilos baseados no prompt detalhado */
```

### 🎨 Features Específicas

#### Cards de Métricas
- Layout responsivo com grid
- Ícones e indicadores
- Animações suaves
- Cores temáticas

#### Gráficos
- Gráficos de barras, pizza, linha
- Dados simulados realistas
- Interatividade
- Responsividade

### 🎯 Instruções para Copilot

1. **Analise o prompt detalhado** e implemente exatamente o que foi solicitado
2. **Use Angular Material** para todos os componentes
3. **Implemente responsividade** se solicitado
4. **Adicione animações** suaves onde apropriado
5. **Use dados simulados** realistas
6. **Implemente validações** onde necessário
7. **Siga padrões de acessibilidade**
8. **Use TypeScript** com tipos apropriados

### 📋 Checklist de Implementação

- [ ] Componente TypeScript com lógica completa
- [ ] Template HTML com layout responsivo
- [ ] Estilos SCSS com design moderno
- [ ] Testes unitários básicos
- [ ] Imports corretos do Angular Material
- [ ] Dados simulados realistas
- [ ] Funcionalidades específicas implementadas
- [ ] Responsividade testada
- [ ] Acessibilidade verificada

### 🚀 Comandos Úteis

```bash
# Servir aplicação
npx nx serve dashboard

# Testar componente
npx nx test dashboard

# Build do projeto
npx nx build dashboard
```

---

*Documentação detalhada gerada para Copilot - Sistema Híbrido IA + Nx*
```

## 🚀 Como Usar

### 1. **Via Generator UI (Recomendado)**
```bash
# Abre interface interativa
npx nx g @usando-nx/schematics:hybrid-generator

# Ou via script
node scripts/generate-ui.js hybrid
```

### 2. **Selecionar Features Avançadas**
- ✅ Cards
- ✅ Gráficos
- ✅ Modal
- ✅ Exportação
- ✅ Responsivo

### 3. **Forçar Uso da IA**
- Marcar "Forçar uso da IA?" como `true`

### 4. **Preencher Prompt Detalhado**
Descrever exatamente o que você quer:
- Layout específico
- Componentes específicos
- Funcionalidades específicas
- Dados específicos
- Animações específicas

### 5. **Gerar Documentação Detalhada**
- Marcar "Gerar documentação detalhada para Copilot?" como `true`

## 🎯 Exemplos de Prompts Detalhados

### Exemplo 1: Dashboard Financeiro
```
Crie um dashboard financeiro com: 1) Cards de métricas no topo: Receita Total (R$ 150.000), Despesas (R$ 80.000), Lucro (R$ 70.000), Clientes Ativos (1.250) - cada card com ícone, valor grande e percentual de crescimento. 2) Gráfico de barras: Vendas mensais dos últimos 6 meses com cores diferentes por mês. 3) Gráfico de pizza: Distribuição de gastos por categoria (Marketing 30%, Operacional 25%, RH 20%, TI 15%, Outros 10%). 4) Filtros: Seletor de período (último mês, 3 meses, 6 meses, 1 ano) e dropdown de categoria. 5) Layout responsivo: Cards em grid 2x2 no desktop, empilhados no mobile. 6) Animações suaves nos cards e gráficos. 7) Botão de exportação Excel no canto superior direito.
```

### Exemplo 2: Tela de Produtos Avançada
```
Crie uma tela de produtos com: 1) Filtros avançados no topo: Busca por nome (com autocomplete), Seletor de categoria (múltipla seleção), Range de preço (slider duplo), Status (ativo/inativo). 2) Tabela com colunas: Foto (thumbnail), Nome, Categoria, Preço, Estoque, Status, Ações - com ordenação por todas as colunas. 3) Ações por linha: Visualizar (modal), Editar (modal), Excluir (confirmação), Ativar/Desativar (toggle). 4) Modal de criação/edição com: Upload de foto, Validação em tempo real, Preview da imagem. 5) Paginação com 10 itens por página. 6) Botão de exportação Excel com filtros aplicados. 7) Layout responsivo: Tabela com scroll horizontal no mobile.
```

### Exemplo 3: Formulário de Cadastro
```
Crie um formulário de cadastro de cliente com: 1) Stepper de 3 etapas: Dados Pessoais, Endereço, Confirmação. 2) Etapa 1: Nome completo, Email, Telefone, CPF, Data de nascimento - com máscaras e validações. 3) Etapa 2: CEP (com busca automática), Endereço, Número, Complemento, Bairro, Cidade, Estado - com auto-complete de cidade/estado. 4) Etapa 3: Resumo dos dados e confirmação. 5) Upload de foto do cliente com preview. 6) Validações: Campos obrigatórios, email válido, CPF válido, CEP válido. 7) Botões: Anterior, Próximo, Salvar, Cancelar. 8) Animações suaves entre etapas.
```

## 💡 Dicas para Prompts Detalhados

### ✅ **O que incluir:**
- Layout específico (grid, flexbox, posicionamento)
- Componentes específicos (cards, gráficos, tabelas)
- Dados específicos (valores, categorias, cores)
- Funcionalidades específicas (filtros, ações, validações)
- Animações específicas (transições, efeitos)
- Responsividade específica (breakpoints, comportamentos)

### ❌ **O que evitar:**
- Prompts muito genéricos
- Falta de especificidade
- Não mencionar dados específicos
- Não detalhar layout
- Não especificar funcionalidades

## 🎯 Benefícios

### ✅ **Para o Desenvolvedor:**
- Telas mais precisas
- Menos iterações
- Código mais limpo
- Funcionalidades específicas

### ✅ **Para o Copilot:**
- Contexto claro
- Especificações detalhadas
- Exemplos concretos
- Checklist de implementação

### ✅ **Para o Projeto:**
- Consistência visual
- Padrões estabelecidos
- Documentação automática
- Manutenibilidade

---

**Lembre-se**: Quanto mais detalhado o prompt, melhor será o resultado! 🎉 