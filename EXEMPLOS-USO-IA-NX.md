# 🚀 Exemplos Práticos - IA + Nx

## 📋 **Como Usar o Sistema**

### **1. Geração de Telas com IA**

#### **Exemplo 1: Tela de Produtos**
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

#### **Exemplo 2: Dashboard de Vendas**
```bash
npx nx g ./dist/libs/schematics:ai-generate-screen DashboardVendas \
  --prompt="Dashboard com:
  - Cards de métricas (Total Vendas, Vendas Hoje, Produtos Vendidos)
  - Gráfico de barras: Vendas por mês
  - Gráfico de pizza: Vendas por categoria
  - Filtros: Período, Categoria, Vendedor
  - Exportação de relatórios
  - Responsivo"
```

#### **Exemplo 3: Formulário de Cadastro**
```bash
npx nx g ./dist/libs/schematics:ai-generate-screen CadastroUsuario \
  --prompt="Formulário de cadastro com:
  - Campos: Nome, Email, Telefone, Departamento, Cargo
  - Validação de campos obrigatórios
  - Upload de foto
  - Stepper com múltiplas etapas
  - Confirmação antes de salvar"
```

### **2. Migração React → Angular**

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

---

## 🎯 **Prompts Inteligentes para IA**

### **Estrutura de Prompt Recomendada:**
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

#### **CRUD Completo:**
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

#### **Formulário Complexo:**
```
Crie um formulário Angular com:
- Nome: CadastroCliente
- Campos: Nome, Email, Telefone, Endereço, Cidade, Estado, CEP
- Validação: Campos obrigatórios, email válido, CEP válido
- Upload: Foto do cliente
- Stepper: 3 etapas (Dados Pessoais, Endereço, Confirmação)
- Máscara: Telefone e CEP
- Auto-complete: Cidade e Estado
```

---

## 🔧 **Comandos Rápidos**

### **Geração de Telas:**
```bash
# Tela básica
npx nx g ./dist/libs/schematics:ai-generate-screen MinhaTela --prompt="Tela simples com tabela"

# Tela completa
npx nx g ./dist/libs/schematics:ai-generate-screen TelaCompleta --prompt="CRUD completo com filtros, tabela, modal e paginação"

# Dashboard
npx nx g ./dist/libs/schematics:ai-generate-screen Dashboard --prompt="Dashboard com cards, gráficos e filtros"

# Formulário
npx nx g ./dist/libs/schematics:ai-generate-screen Formulario --prompt="Formulário com validação e stepper"
```

### **Migração:**
```bash
# Migração simples
npx nx g ./dist/libs/schematics:migrate-react MeuComponente --reactFile="src/MeuComponente.jsx"

# Migração com features específicas
npx nx g ./dist/libs/schematics:migrate-react ComponenteComplexo --reactFile="src/ComponenteComplexo.tsx" --features="hooks,styled-components,formik"
```

---

## 🎨 **Padrões de Prompt para IA**

### **Para Telas CRUD:**
```
Gere uma tela Angular padrão com:
- Nome: [Nome da Entidade]
- Filtros: [campos para filtrar]
- Tabela: [colunas da tabela]
- Ações: [ações disponíveis]
- Modal de criação/edição
- Paginação
- Exportação
- Angular Material
```

### **Para Dashboards:**
```
Crie um dashboard Angular com:
- Nome: [Nome do Dashboard]
- Cards de métricas: [métricas principais]
- Gráficos: [tipos de gráficos]
- Filtros: [filtros disponíveis]
- Exportação de relatórios
- Responsivo
```

### **Para Formulários:**
```
Crie um formulário Angular com:
- Nome: [Nome do Formulário]
- Campos: [campos do formulário]
- Validação: [regras de validação]
- Upload: [campos de upload]
- Stepper: [etapas do formulário]
- Confirmação antes de salvar
```

---

## 🚀 **Benefícios do Sistema**

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

## 📚 **Recursos Adicionais**

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

**🎉 Agora você tem exemplos práticos para usar o sistema IA + Nx!** 