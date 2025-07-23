# 🤖 IA + Nx Integration Guide

## 🎯 **Objetivo**
Integrar IA (Copilot/Cursor) com Nx para geração e migração automática de telas Angular, seguindo padrões empresariais.

---

## 🚀 **1. Geração de Telas com IA**

### **Comando Básico:**
```bash
npx nx g ./dist/libs/schematics:ai-generate-screen <nome-da-tela> --prompt="<descrição detalhada>"
```

### **Exemplos de Uso:**

#### **Exemplo 1: Tela de Consulta de Produtos**
```bash
npx nx g ./dist/libs/schematics:ai-generate-screen ConsultaProdutos \
  --prompt="Gere uma tela Angular padrão com:
  - Filtros: Nome, Categoria, Preço
  - Tabela com colunas: Código, Nome, Categoria, Preço, Estoque, Ativo
  - Ações: Editar, Excluir, Visualizar
  - Botão de cadastro
  - Paginação
  - Deve usar Angular Material"
```

#### **Exemplo 2: Tela de Gerenciamento de Usuários**
```bash
npx nx g ./dist/libs/schematics:ai-generate-screen GerenciamentoUsuarios \
  --prompt="Crie uma tela de gerenciamento de usuários com:
  - Filtros: Nome, Email, Status, Departamento
  - Tabela: ID, Nome, Email, Departamento, Status, Data Cadastro
  - Ações: Editar, Excluir, Ativar/Desativar
  - Modal de criação/edição
  - Exportação para Excel"
```

#### **Exemplo 3: Dashboard de Relatórios**
```bash
npx nx g ./dist/libs/schematics:ai-generate-screen DashboardRelatorios \
  --prompt="Dashboard com:
  - Cards de métricas (Vendas, Usuários, Produtos)
  - Gráficos de barras e pizza
  - Filtros por período
  - Exportação de relatórios
  - Responsivo"
```

### **Parâmetros Disponíveis:**
- `--name`: Nome da tela
- `--project`: Projeto destino (default: dashboard)
- `--prompt`: Descrição detalhada da tela
- `--features`: Lista de features (filtros, tabela, modal, etc.)
- `--columns`: Colunas da tabela
- `--filters`: Filtros disponíveis
- `--actions`: Ações disponíveis

---

## 🔄 **2. Migração React → Angular**

### **Comando Básico:**
```bash
npx nx g ./dist/libs/schematics:migrate-react <nome-componente> --reactFile="<caminho-arquivo-react>"
```

### **Exemplos de Migração:**

#### **Exemplo 1: Migrar ProductTable.jsx**
```bash
npx nx g ./dist/libs/schematics:migrate-react ProductTable \
  --reactFile="src/components/ProductTable.jsx" \
  --features="hooks,styled-components,props" \
  --targetFramework="standalone"
```

#### **Exemplo 2: Migrar UserForm.tsx**
```bash
npx nx g ./dist/libs/schematics:migrate-react UserForm \
  --reactFile="src/forms/UserForm.tsx" \
  --features="formik,validation,styled-components" \
  --targetFramework="standalone"
```

### **O que a IA faz automaticamente:**

1. **Análise do código React:**
   - Detecta hooks (useState, useEffect, etc.)
   - Identifica styled-components
   - Extrai props e interfaces
   - Mapeia event handlers

2. **Conversão para Angular:**
   - Converte JSX para template HTML
   - Transforma hooks em lifecycle hooks
   - Converte styled-components para SCSS
   - Mapeia props para @Input/@Output

3. **Aplicação de padrões:**
   - Usa Angular Material
   - Segue estrutura Nx
   - Implementa reactive forms
   - Adiciona ao menu do shell

---

## 🎨 **3. Padrões de Prompt para IA**

### **Estrutura Recomendada:**
```
Gere uma tela Angular com:
- Nome: [Nome da Tela]
- Filtros: [lista de filtros]
- Tabela: [colunas da tabela]
- Ações: [ações disponíveis]
- Features especiais: [modais, gráficos, etc.]
- Framework: [Angular Material, Bootstrap, etc.]
```

### **Exemplos de Prompts Estruturados:**

#### **Tela CRUD Completa:**
```
Gere uma tela Angular padrão com:
- Nome: GerenciamentoProdutos
- Filtros: Nome, Categoria, Preço, Status
- Tabela: ID, Nome, Categoria, Preço, Estoque, Status, Ações
- Ações: Visualizar, Editar, Excluir, Ativar/Desativar
- Modal de criação/edição com validação
- Paginação
- Exportação para Excel
- Deve usar Angular Material
- Responsivo
```

#### **Dashboard com Gráficos:**
```
Crie um dashboard Angular com:
- Nome: DashboardVendas
- Cards de métricas: Total Vendas, Vendas Hoje, Produtos Vendidos
- Gráfico de barras: Vendas por mês
- Gráfico de pizza: Vendas por categoria
- Filtros: Período, Categoria, Vendedor
- Exportação de relatórios
- Usar Chart.js ou ng2-charts
- Responsivo
```

---

## 🔧 **4. Configuração Avançada**

### **Personalizar Templates:**
Edite os arquivos em `libs/schematics/src/generators/ai-generate-screen/files/` para customizar a geração.

### **Adicionar Novos Padrões:**
1. Crie novos templates em `files/`
2. Atualize o generator para usar os novos templates
3. Adicione novos mapeamentos de ícones e nomes

### **Integrar com Copilot/Cursor:**
```bash
# Comando para usar com IA
npx nx g ./dist/libs/schematics:ai-generate-screen $(echo "Nome da tela baseado no prompt da IA")
```

---

## 📋 **5. Checklist de Migração React → Angular**

### **Antes da Migração:**
- [ ] Analisar dependências React
- [ ] Identificar hooks utilizados
- [ ] Mapear styled-components
- [ ] Verificar event handlers
- [ ] Documentar props e interfaces

### **Durante a Migração:**
- [ ] Converter JSX para template HTML
- [ ] Transformar hooks em lifecycle hooks
- [ ] Converter styled-components para SCSS
- [ ] Mapear props para @Input/@Output
- [ ] Adaptar event handlers

### **Após a Migração:**
- [ ] Testar funcionalidades
- [ ] Verificar responsividade
- [ ] Validar padrões Angular
- [ ] Atualizar documentação
- [ ] Adicionar ao menu do shell

---

## 🚀 **6. Comandos Rápidos**

### **Geração de Telas:**
```bash
# Tela básica
npx nx g ./dist/libs/schematics:ai-generate-screen MinhaTela --prompt="Tela simples com tabela"

# Tela completa
npx nx g ./dist/libs/schematics:ai-generate-screen TelaCompleta --prompt="CRUD completo com filtros, tabela, modal e paginação"

# Dashboard
npx nx g ./dist/libs/schematics:ai-generate-screen Dashboard --prompt="Dashboard com cards, gráficos e filtros"
```

### **Migração:**
```bash
# Migração simples
npx nx g ./dist/libs/schematics:migrate-react MeuComponente --reactFile="src/MeuComponente.jsx"

# Migração com features específicas
npx nx g ./dist/libs/schematics:migrate-react ComponenteComplexo --reactFile="src/ComponenteComplexo.tsx" --features="hooks,styled-components,formik"
```

---

## 🎯 **7. Benefícios da Integração**

### **Produtividade:**
- ✅ Geração automática de telas
- ✅ Migração rápida React → Angular
- ✅ Padrões consistentes
- ✅ Menos código repetitivo

### **Qualidade:**
- ✅ Seguimento de padrões empresariais
- ✅ Uso de Angular Material
- ✅ Estrutura Nx otimizada
- ✅ Componentes reutilizáveis

### **Manutenibilidade:**
- ✅ Código padronizado
- ✅ Estrutura consistente
- ✅ Fácil atualização
- ✅ Documentação automática

---

## 📚 **8. Recursos Adicionais**

### **Documentação:**
- [Angular Material](https://material.angular.io/)
- [Nx Documentation](https://nx.dev/)
- [Angular Standalone Components](https://angular.io/guide/standalone-components)

### **Ferramentas:**
- **Copilot**: Para geração de código
- **Cursor**: Para análise e migração
- **Nx**: Para estrutura e organização
- **Angular Material**: Para componentes UI

---

**🎉 Agora você tem um sistema completo de IA + Nx para desenvolvimento Angular!** 