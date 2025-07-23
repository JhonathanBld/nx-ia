# Exemplos Práticos - Sistema Híbrido IA + Nx

Este arquivo contém exemplos práticos de como usar o sistema híbrido IA + Nx com as novas funcionalidades implementadas.

## 🎯 Exemplos de Uso

### 1. **Generator UI - Interface Amigável**

#### Exemplo 1: Dashboard Avançado
```bash
# Comando
node scripts/generate-ui.js hybrid

# Ou diretamente
npx nx g @usando-nx/schematics:hybrid-generator
```

**Interface que aparece:**
```
┌─────────────────────────────────────────────────────────┐
│                    Generator UI                        │
├─────────────────────────────────────────────────────────┤
│ Nome da Tela: [DashboardVendas]                       │
│                                                        │
│ Prompt: [Dashboard com cards de métricas e gráficos]  │
│                                                        │
│ Features: [x] Filtros  [x] Tabela  [x] Gráficos      │
│           [x] Cards    [ ] Modal   [ ] Exportação     │
│                                                        │
│ Projeto: [dashboard]                                  │
│                                                        │
│ [GERAR TELA]  [CANCELAR]                             │
└─────────────────────────────────────────────────────────┘
```

**Resultado:**
- ✅ Gera `docs/dashboardvendas-analysis.md`
- ✅ Detecta features avançadas (gráficos, cards)
- ✅ Recomenda uso da IA
- ✅ Executa geração automaticamente

#### Exemplo 2: Tela Simples
```bash
# Comando
node scripts/generate-ui.js nx

# Interface que aparece:
```
```
┌─────────────────────────────────────────────────────────┐
│                    Generator UI                        │
├─────────────────────────────────────────────────────────┤
│ Nome da Tela: [TelaUsuarios]                          │
│                                                        │
│ Prompt: [Lista de usuários com filtros]               │
│                                                        │
│ Features: [x] Filtros  [x] Tabela  [x] Ações         │
│           [ ] Cards    [ ] Modal   [ ] Exportação     │
│                                                        │
│ Projeto: [dashboard]                                  │
│                                                        │
│ [GERAR TELA]  [CANCELAR]                             │
└─────────────────────────────────────────────────────────┘
```

**Resultado:**
- ✅ Gera `docs/tela-usuarios-analysis.md`
- ✅ Detecta features básicas (filtros, tabela)
- ✅ Recomenda uso do Nx
- ✅ Executa geração automaticamente

### 2. **Validação Condicional - Campos Inteligentes**

#### Exemplo 1: Sem Tabela (Apenas Cards)
```bash
# Features selecionadas: cards, graficos
# Campos que aparecem:
✅ Nome da Tela
✅ Prompt
✅ Features
✅ Projeto

# Campos que NÃO aparecem:
❌ Colunas da tabela
❌ Filtros específicos
❌ Ações específicas
```

#### Exemplo 2: Com Tabela
```bash
# Features selecionadas: tabela, filtros, acoes
# Campos que aparecem:
✅ Nome da Tela
✅ Prompt
✅ Features
✅ Projeto
✅ Colunas da tabela
✅ Filtros específicos
✅ Ações específicas
```

#### Exemplo 3: Apenas Filtros
```bash
# Features selecionadas: filtros
# Campos que aparecem:
✅ Nome da Tela
✅ Prompt
✅ Features
✅ Projeto
✅ Filtros específicos

# Campos que NÃO aparecem:
❌ Colunas da tabela
❌ Ações específicas
```

### 3. **Análise Automática - Documentação Inteligente**

#### Exemplo: Dashboard Financeiro
```bash
# Comando
node scripts/smart-generator.js "Dashboard financeiro com cards de métricas, gráficos de barras e pizza, filtros por período e exportação para Excel" "DashboardFinanceiro" --auto-execute
```

**Documentação gerada (`docs/dashboardfinanceiro-analysis.md`):**
```markdown
# Análise de Prompt - DashboardFinanceiro

## 📋 Informações Gerais
- **Data**: 2025-07-23
- **Componente**: DashboardFinanceiro
- **Prompt**: "Dashboard financeiro com cards de métricas..."
- **Complexidade**: advanced
- **Recomendação**: 🤖 IA

## 🔍 Análise Detalhada
### Features Detectadas
- ✅ filtros
- ✅ tabela
- ✅ graficos
- ✅ cards
- ✅ exportacao
- ✅ responsivo

### Features IA (Avançadas)
- 🤖 graficos
- 🤖 cards
- 🤖 exportacao
- 🤖 responsivo

## 🎯 Recomendação
### 🤖 Usar IA (Avançado)
**Motivo**: Features avançadas detectadas que requerem análise inteligente.

## 📊 Estatísticas
- **Total de Features**: 6
- **Features IA**: 4
- **Nível de Complexidade**: advanced
```

### 4. **Scripts de Análise - Comandos Prontos**

#### Exemplo 1: Análise Simples
```bash
# Comando
node scripts/analyze-prompt.js "Tela de produtos com filtros" "TelaProdutos"

# Resultado
✅ Análise concluída!
📄 Arquivo gerado: docs/telaprodutos-analysis.md

📊 Resumo:
   - Complexidade: basic
   - Features detectadas: filtros, tabela
   - Recomendação: ⚡ Nx

🚀 Comando recomendado:
npx nx g ./dist/libs/schematics:hybrid-generator telaprodutos --prompt="Tela de produtos com filtros" --forceNx=true
```

#### Exemplo 2: Geração Automática
```bash
# Comando
node scripts/smart-generator.js "Dashboard com gráficos e cards" "DashboardAvancado" --auto-execute

# Resultado
🔍 Analisando prompt...
📝 Componente: DashboardAvancado
🎯 Prompt: "Dashboard com gráficos e cards"

📊 Análise:
   - Complexidade: advanced
   - Recomendação: 🤖 IA
   - Features detectadas: graficos, cards

🚀 Executando comando automaticamente...
✅ Componente gerado com sucesso!
📄 Documentação gerada: docs/dashboardavancado-analysis.md
```

### 5. **Comandos Diretos - Flexibilidade Total**

#### Exemplo 1: Forçar IA
```bash
npx nx g @usando-nx/schematics:hybrid-generator dashboard --prompt="Dashboard com gráficos" --forceAI=true --generateDocs=true
```

#### Exemplo 2: Forçar Nx
```bash
npx nx g @usando-nx/schematics:hybrid-generator usuarios --prompt="Lista de usuários" --forceNx=true --generateDocs=true
```

#### Exemplo 3: AI Generate Screen
```bash
npx nx g @usando-nx/schematics:ai-generate-screen dashboard --prompt="Dashboard avançado" --features=cards,graficos,exportacao
```

### 6. **Estruturas Geradas - Exemplos Práticos**

#### Estrutura IA (Avançado)
```
apps/dashboard/src/app/dashboardvendas/
├── dashboardvendas.component.ts      # 127 linhas, imports completos
├── dashboardvendas.component.html    # Template com cards/gráficos
├── dashboardvendas.component.scss    # Estilos responsivos
└── dashboardvendas.component.spec.ts # Testes completos
```

#### Estrutura Nx (Básico)
```
apps/dashboard/src/app/usuarios/
├── usuarios.component.ts             # 89 linhas, imports básicos
├── usuarios.component.html           # Template simples
├── usuarios.component.scss           # Estilos básicos
└── usuarios.component.spec.ts        # Testes básicos
```

### 7. **Fluxo Completo - Exemplo Real**

#### Passo 1: Análise
```bash
node scripts/analyze-prompt.js "Dashboard financeiro com cards de métricas e gráficos" "DashboardFinanceiro"
```

#### Passo 2: Geração
```bash
node scripts/smart-generator.js "Dashboard financeiro com cards de métricas e gráficos" "DashboardFinanceiro" --auto-execute
```

#### Passo 3: Teste
```bash
npx nx serve dashboard
```

#### Passo 4: Customização
- Editar arquivos gerados
- Adicionar lógica específica
- Personalizar estilos

### 8. **Dicas de Uso**

#### Para Dashboards Avançados
```bash
# Use Generator UI
node scripts/generate-ui.js hybrid

# Features recomendadas: cards, graficos, filtros, responsivo
# Prompt: "Dashboard com cards de métricas, gráficos de barras e pizza"
```

#### Para Telas CRUD Simples
```bash
# Use Generator UI
node scripts/generate-ui.js nx

# Features recomendadas: filtros, tabela, acoes
# Prompt: "Lista de usuários com filtros e ações"
```

#### Para Telas Específicas
```bash
# Use análise automática
node scripts/smart-generator.js "Tela de produtos com filtros avançados" "TelaProdutos" --auto-execute
```

### 9. **Troubleshooting**

#### Problema: Features não reconhecidas
```bash
# Solução: Use Generator UI
node scripts/generate-ui.js hybrid
# Selecione features manualmente no formulário
```

#### Problema: Documentação não gerada
```bash
# Solução: Adicione --generateDocs=true
npx nx g @usando-nx/schematics:hybrid-generator nome --prompt="descrição" --generateDocs=true
```

#### Problema: Comando muito longo
```bash
# Solução: Use Generator UI
node scripts/generate-ui.js
# Preencha o formulário interativo
```

---

**Lembre-se**: O sistema é inteligente e se adapta às suas necessidades. Use o **Generator UI** para uma experiência mais amigável! 🎉 