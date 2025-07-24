import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
} from '@nx/devkit';
import { updateShellMenu } from '../generate-screen/update-shell-menu';

interface HybridGeneratorSchema {
  name: string;
  project?: string;
  features?: string[];
  columns?: string[];
  filters?: string[];
  actions?: string[];
  forceAI?: boolean;
  forceNx?: boolean;
  generateDocs?: boolean;
  prompt?: string;
  generateDetailedDocs?: boolean;
  // Propriedades internas para controle
  shouldUseAI?: boolean;
  requireDetailedPrompt?: boolean;
  // Novos campos dinâmicos baseados nas features
  cardMetrics?: Array<{
    title: string;
    value: string;
    icon: string;
    color: string;
  }>;
  chartTypes?: string[];
  chartData?: string;
  modalType?: string;
  modalFields?: string[];
  formFields?: Array<{
    name: string;
    type: string;
    label: string;
    required: boolean;
  }>;
  exportFormats?: string[];
}

export default async function (tree: Tree, schema: HybridGeneratorSchema) {
  const projectName = schema.project || 'dashboard';
  const projectConfig = readProjectConfiguration(tree, projectName);
  const normalizedNames = names(schema.name);

  const sourceRoot = projectConfig.sourceRoot;
  if (!sourceRoot) {
    throw new Error(`Project "${projectName}" is missing "sourceRoot" in its configuration.`);
  }

  const targetPath = joinPathFragments(
    sourceRoot,
    'app',
    normalizedNames.fileName
  );

  // Validar opções baseado nas features selecionadas
  const validatedSchema = validateSchemaOptions(schema);

  // Se forceAI for true, sempre usar IA e solicitar prompt detalhado
  if (validatedSchema.forceAI) {
    validatedSchema.shouldUseAI = true;
    validatedSchema.requireDetailedPrompt = true;
  }

  // Determinar se deve usar IA baseado nas features e configurações
  const shouldUseAI = determineIfShouldUseAI(validatedSchema);

  console.log(`🔍 Análise do prompt:`);
  console.log(`   - Features selecionadas: ${validatedSchema.features?.join(', ')}`);
  console.log(`   - Forçar IA: ${validatedSchema.forceAI}`);
  console.log(`   - Forçar Nx: ${validatedSchema.forceNx}`);
  console.log(`   - Recomendação: ${shouldUseAI ? 'IA 🤖' : 'Nx ⚡'}`);

  if (shouldUseAI) {
    console.log(`🤖 Usando IA para gerar componente avançado...`);
    await generateWithAI(tree, validatedSchema, normalizedNames, targetPath);
  } else {
    console.log(`⚡ Usando Nx para gerar componente básico...`);
    await generateWithNx(tree, validatedSchema, normalizedNames, targetPath);
  }

  // Atualizar menu do shell
  try {
    updateShellMenu(normalizedNames.fileName, projectName);
    console.log(`✅ Menu atualizado: ${normalizedNames.fileName} adicionado ao sidebar`);
  } catch (error: any) {
    console.log('⚠️ Não foi possível atualizar o menu do shell:', error.message);
  }

  // Gerar documentação automática se solicitado
  if (validatedSchema.generateDocs !== false) {
    await generateDocumentation(tree, normalizedNames.fileName, validatedSchema, shouldUseAI);
  }

  await formatFiles(tree);
}

function validateSchemaOptions(schema: HybridGeneratorSchema): HybridGeneratorSchema {
  const validatedSchema = { ...schema };
  
  // Se não há features definidas, usar padrão
  if (!validatedSchema.features) {
    validatedSchema.features = ['filtros', 'tabela', 'acoes'];
  }
  
  // Se não há tabela selecionada, remover colunas
  if (!validatedSchema.features.includes('tabela')) {
    delete validatedSchema.columns;
  }
  
  // Se não há filtros selecionados, remover filtros específicos
  if (!validatedSchema.features.includes('filtros')) {
    delete validatedSchema.filters;
  }
  
  // Se não há ações selecionadas, remover ações específicas
  if (!validatedSchema.features.includes('acoes')) {
    delete validatedSchema.actions;
  }

  // Se não há cards selecionados, remover métricas de cards
  if (!validatedSchema.features.includes('cards')) {
    delete validatedSchema.cardMetrics;
  }

  // Se não há gráficos selecionados, remover configurações de gráficos
  if (!validatedSchema.features.includes('graficos')) {
    delete validatedSchema.chartTypes;
    delete validatedSchema.chartData;
  }

  // Se não há modal selecionado, remover configurações de modal
  if (!validatedSchema.features.includes('modal')) {
    delete validatedSchema.modalType;
    delete validatedSchema.modalFields;
  }

  // Se não há formulário selecionado, remover campos do formulário
  if (!validatedSchema.features.includes('formulario')) {
    delete validatedSchema.formFields;
  }

  // Se não há exportação selecionada, remover formatos de exportação
  if (!validatedSchema.features.includes('exportacao')) {
    delete validatedSchema.exportFormats;
  }
  
  return validatedSchema;
}

function determineIfShouldUseAI(schema: HybridGeneratorSchema): boolean {
  // Se forçar IA, usar IA
  if (schema.forceAI) {
    return true;
  }

  // Se forçar Nx, usar Nx
  if (schema.forceNx) {
    return false;
  }

  // Se não há features, usar Nx
  if (!schema.features || schema.features.length === 0) {
    return false;
  }

  // Features avançadas que requerem IA
  const advancedFeatures = ['cards', 'graficos', 'modal', 'exportacao', 'responsivo'];
  
  // Se há features avançadas, usar IA
  if (schema.features.some(feature => advancedFeatures.includes(feature))) {
    return true;
  }

  // Se há muitas features básicas (mais de 3), usar IA
  if (schema.features.length > 3) {
    return true;
  }

  // Caso contrário, usar Nx
  return false;
}

async function generateWithNx(tree: Tree, schema: HybridGeneratorSchema, normalizedNames: any, targetPath: string) {
  // Usar o generator básico do Nx
  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: schema.project || 'dashboard',
    features: schema.features || [],
    displayName: getDisplayName(normalizedNames.fileName),
    icon: getIconForScreen(normalizedNames.fileName),
    // Dados específicos das features
    columns: schema.columns || [],
    filters: schema.filters || [],
    actions: schema.actions || [],
    // Funções auxiliares para templates
    getColumnDisplayName: getColumnDisplayName,
    getActionDisplayName: getActionDisplayName,
    getActionIcon: getActionIcon
  };

  // Gerar apenas os imports necessários
  const requiredImports = getRequiredImports(schema.features || []);
  
  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/hybrid-generator/files/nx'), targetPath, {
    ...templateData,
    requiredImports
  });
}

async function generateWithAI(tree: Tree, schema: HybridGeneratorSchema, normalizedNames: any, targetPath: string) {
  // Usar análise avançada da IA
  const aiAnalysis = analyzePromptAdvanced(schema.prompt || '');
  
  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: schema.project || 'dashboard',
    prompt: schema.prompt || '',
    features: schema.features || [],
    columns: schema.columns || aiAnalysis.columns,
    filters: schema.filters || aiAnalysis.filters,
    actions: schema.actions || aiAnalysis.actions,
    metrics: aiAnalysis.metrics,
    charts: aiAnalysis.charts,
    displayName: getDisplayName(normalizedNames.fileName),
    icon: getIconForScreen(normalizedNames.fileName),
    getColumnDisplayName: getColumnDisplayName,
    getActionDisplayName: getActionDisplayName,
    getActionIcon: getActionIcon,
    requiredImports: getRequiredImports(schema.features || []),
    // Novos dados específicos das features
    cardMetrics: schema.cardMetrics || [],
    chartTypes: schema.chartTypes || [],
    chartData: schema.chartData || '',
    modalType: schema.modalType || 'formulario',
    modalFields: schema.modalFields || [],
    formFields: schema.formFields || [],
    exportFormats: schema.exportFormats || []
  };

  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/hybrid-generator/files/ai'), targetPath, templateData);
}

async function generateDocumentation(tree: Tree, componentName: string, schema: HybridGeneratorSchema, shouldUseAI: boolean) {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = componentName.toLowerCase().replace(/\s+/g, '-');
  
  // Documentação básica (sempre gerada)
  const basicMarkdown = `# Análise de Prompt - ${componentName}

## 📋 Informações Gerais

- **Data**: ${timestamp}
- **Componente**: ${componentName}
- **Prompt**: "${schema.prompt || 'N/A'}"
- **Features**: ${schema.features?.join(', ') || 'N/A'}
- **Recomendação**: ${shouldUseAI ? '🤖 IA' : '⚡ Nx'}

## 🔍 Análise Detalhada

### Features Selecionadas
${schema.features?.map((f: string) => `- ✅ ${f}`).join('\n') || '- Nenhuma feature selecionada'}

### Configurações Específicas
${getSpecificConfigurations(schema)}

## 🎯 Recomendação

### ${shouldUseAI ? '🤖 Usar IA (Avançado)' : '⚡ Usar Nx (Básico)'}

**Motivo**: ${shouldUseAI ? 'Features avançadas ou muitas features básicas detectadas que requerem análise inteligente.' : 'Features básicas que podem ser geradas rapidamente pelo Nx.'}

**Comando Executado**:
\`\`\`bash
npx nx g ./dist/libs/schematics:hybrid-generator ${fileName} --features="${schema.features?.join(',')}" ${shouldUseAI ? '--forceAI=true' : '--forceNx=true'}
\`\`\`

**Benefícios**:
${shouldUseAI ? 
`- ✅ Análise inteligente do prompt
- ✅ Extração automática de colunas, filtros e métricas
- ✅ Geração de templates dinâmicos
- ✅ Suporte a features avançadas (gráficos, cards, modais)
- ✅ Imports otimizados baseados nas features` :
`- ⚡ Geração rápida
- ⚡ Imports otimizados
- ⚡ Templates padrão
- ⚡ Menor complexidade`}

**Estrutura Gerada**:
\`\`\`
apps/dashboard/src/app/${fileName}/
├── ${fileName}.component.ts      # ${shouldUseAI ? 'Lógica com imports completos' : 'Lógica básica'}
├── ${fileName}.component.html    # ${shouldUseAI ? 'Template dinâmico' : 'Template padrão'}
├── ${fileName}.component.scss    # ${shouldUseAI ? 'Estilos responsivos' : 'Estilos básicos'}
└── ${fileName}.component.spec.ts # ${shouldUseAI ? 'Testes completos' : 'Testes básicos'}
\`\`\`

## 📊 Estatísticas

- **Total de Features**: ${schema.features?.length || 0}
- **Features Básicas**: ${schema.features?.filter(f => ['filtros', 'tabela', 'acoes', 'formulario'].includes(f)).length || 0}
- **Features Avançadas**: ${schema.features?.filter(f => ['cards', 'graficos', 'modal', 'exportacao', 'responsivo'].includes(f)).length || 0}

## 🎯 Próximos Passos

1. **✅ Comando executado automaticamente**
2. **Verifique os arquivos gerados**
3. **Customize conforme necessário**
4. **Teste a funcionalidade**

---

*Gerado automaticamente pelo Sistema Híbrido IA + Nx*
`;

  // Salvar arquivo MD básico
  const docsPath = joinPathFragments('docs', `${fileName}-analysis.md`);
  
  try {
    tree.write(docsPath, basicMarkdown);
    console.log(`📄 Documentação gerada: ${docsPath}`);
  } catch (error: any) {
    console.log('⚠️ Não foi possível gerar documentação:', error.message);
  }

  // Se usar IA e tiver prompt detalhado, gerar documentação específica para Copilot
  if (shouldUseAI && schema.prompt && (schema.generateDetailedDocs || schema.forceAI)) {
    await generateDetailedDocumentation(tree, componentName, schema);
  }
}

function getSpecificConfigurations(schema: HybridGeneratorSchema): string {
  const configs: string[] = [];

  if (schema.columns?.length) {
    configs.push(`**Colunas da Tabela**: ${schema.columns.join(', ')}`);
  }

  if (schema.filters?.length) {
    configs.push(`**Filtros**: ${schema.filters.join(', ')}`);
  }

  if (schema.actions?.length) {
    configs.push(`**Ações**: ${schema.actions.join(', ')}`);
  }

  if (schema.cardMetrics?.length) {
    configs.push(`**Métricas dos Cards**: ${schema.cardMetrics.map(m => m.title).join(', ')}`);
  }

  if (schema.chartTypes?.length) {
    configs.push(`**Tipos de Gráficos**: ${schema.chartTypes.join(', ')}`);
  }

  if (schema.modalType) {
    configs.push(`**Tipo de Modal**: ${schema.modalType}`);
  }

  if (schema.formFields?.length) {
    configs.push(`**Campos do Formulário**: ${schema.formFields.map(f => f.name).join(', ')}`);
  }

  if (schema.exportFormats?.length) {
    configs.push(`**Formatos de Exportação**: ${schema.exportFormats.join(', ')}`);
  }

  return configs.length > 0 ? configs.join('\n') : '- Nenhuma configuração específica';
}

async function generateDetailedDocumentation(tree: Tree, componentName: string, schema: HybridGeneratorSchema) {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = componentName.toLowerCase().replace(/\s+/g, '-');
  
  const detailedMarkdown = `# 🚀 Especificação para IA/Copilot - ${componentName}

## 📋 Contexto do Projeto

- **Data**: ${timestamp}
- **Componente**: ${componentName}
- **Prompt Original**: "${schema.prompt}"
- **Features Selecionadas**: ${schema.features?.join(', ') || 'N/A'}
- **Forçar IA**: ${schema.forceAI ? '✅ Sim' : '❌ Não'}
- **Gerador**: Sistema Híbrido IA + Nx

## 🎯 Instruções para IA/Copilot

### 📝 Tarefa Principal
Você deve implementar um componente Angular completo baseado na seguinte especificação:

**Prompt do Usuário:**
\`\`\`
${schema.prompt}
\`\`\`

### 🏗️ Estrutura Técnica Esperada

#### 📁 Estrutura de Arquivos
\`\`\`
apps/dashboard/src/app/${fileName}/
├── ${fileName}.component.ts      # Lógica principal
├── ${fileName}.component.html    # Template
├── ${fileName}.component.scss    # Estilos
└── ${fileName}.component.spec.ts # Testes
\`\`\`

#### 🔧 Tecnologias Obrigatórias
- **Angular 17+** (standalone components)
- **Angular Material** (UI components)
- **TypeScript** (tipagem forte)
- **SCSS** (estilos)
- **RxJS** (reactive programming)

### 🎨 Especificações de Design

#### 🎯 Features Implementadas
${schema.features?.map(feature => {
  switch(feature) {
    case 'cards':
      return `#### 📊 Cards de Métricas
- **Layout**: Grid responsivo com Material Grid List
- **Componentes**: MatCard, MatIcon, MatGridList
- **Funcionalidades**: 
  - Métricas: ${schema.cardMetrics?.map(m => m.title).join(', ') || 'Total, Média, Contagem'}
  - Ícones dinâmicos
  - Cores temáticas
  - Animações suaves
- **Dados**: Simular dados realistas`;
    case 'graficos':
      return `#### 📈 Gráficos Interativos
- **Tipos**: ${schema.chartTypes?.join(', ') || 'Barra, Pizza, Linha'}
- **Biblioteca**: Chart.js ou ng2-charts
- **Funcionalidades**:
  - Dados: ${schema.chartData || 'Vendas, Categorias, Períodos'}
  - Interatividade (hover, click)
  - Responsividade
  - Legendas dinâmicas
- **Implementação**: Usar MatCard como container`;
    case 'filtros':
      return `#### 🔍 Filtros Avançados
- **Componentes**: MatExpansionPanel, MatFormField, MatInput
- **Funcionalidades**:
  - Filtros: ${schema.filters?.join(', ') || 'Nome, Status, Data'}
  - Datepicker para períodos
  - Selects múltiplos
  - Chips para seleção
  - Busca em tempo real
- **UX**: Painel expansível, botões de ação`;
    case 'tabela':
      return `#### 📋 Tabela Dinâmica
- **Componentes**: MatTable, MatPaginator, MatSort
- **Funcionalidades**:
  - Colunas: ${schema.columns?.join(', ') || 'ID, Nome, Status'}
  - Ordenação por colunas
  - Paginação
  - Ações por linha
  - Seleção múltipla
- **Dados**: Simular dados com interface TypeScript`;
    case 'modal':
      return `#### 🪟 Modais Inteligentes
- **Tipo**: ${schema.modalType || 'formulario'}
- **Componentes**: MatDialog, MatDialogRef
- **Funcionalidades**:
  - Campos: ${schema.modalFields?.join(', ') || 'Nome, Email, Telefone'}
  - Formulários reativos
  - Validação em tempo real
  - Upload de arquivos
  - Confirmações
- **UX**: Animações suaves, backdrop`;
    case 'formulario':
      return `#### 📝 Formulários Reativos
- **Campos**: ${schema.formFields?.map(f => f.name).join(', ') || 'Nome, Email, Senha'}
- **Validação**: ReactiveFormsModule
- **Tipos**: Text, Email, Number, Date, Select
- **UX**: Feedback visual, mensagens de erro
- **Acessibilidade**: Labels, aria-labels`;
    case 'exportacao':
      return `#### 📤 Exportação de Dados
- **Formatos**: ${schema.exportFormats?.join(', ') || 'Excel, PDF, CSV'}
- **Funcionalidades**:
  - Botões de exportação
  - Filtros aplicados
  - Nome de arquivo dinâmico
  - Progress indicator
- **Implementação**: Usar bibliotecas como xlsx, jsPDF`;
    case 'responsivo':
      return `#### 📱 Responsividade Total
- **Breakpoints**: Mobile, Tablet, Desktop
- **Layout**: Flexbox/Grid adaptativo
- **Navegação**: Touch-friendly
- **Cards**: Empilhados em mobile
- **Tabela**: Scroll horizontal em telas pequenas`;
    default:
      return `#### ⚙️ ${feature.charAt(0).toUpperCase() + feature.slice(1)}
- Implementar funcionalidade específica conforme prompt`;
  }
}).join('\n\n')}

### 🎯 Instruções Detalhadas para Implementação

#### 1️⃣ **Análise do Prompt**
- Leia cuidadosamente o prompt do usuário
- Identifique todas as funcionalidades solicitadas
- Mapeie para as features selecionadas
- Considere casos de uso específicos

#### 2️⃣ **Estrutura do Componente**
\`\`\`typescript
@Component({
  selector: 'app-${fileName}',
  standalone: true,
  imports: [
    // Imports baseados nas features
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material modules específicos
  ],
  templateUrl: './${fileName}.component.html',
  styleUrls: ['./${fileName}.component.scss']
})
export class ${componentName}Component implements OnInit {
  // Propriedades baseadas nas features
  // Métodos de lógica de negócio
  // Dados simulados realistas
}
\`\`\`

#### 3️⃣ **Template HTML**
- Use Angular Material components
- Implemente layout responsivo
- Adicione animações suaves
- Siga padrões de acessibilidade
- Use *ngIf e *ngFor adequadamente

#### 4️⃣ **Estilos SCSS**
- Design moderno e limpo
- Cores consistentes com tema
- Responsividade com media queries
- Animações CSS suaves
- Estados hover/focus

#### 5️⃣ **Dados Simulados**
- Crie interfaces TypeScript
- Simule dados realistas
- Implemente métodos de CRUD
- Use observables quando apropriado

### 📋 Checklist de Qualidade

#### ✅ **Funcionalidade**
- [ ] Todas as features implementadas
- [ ] Dados simulados funcionais
- [ ] Validações implementadas
- [ ] Responsividade testada

#### ✅ **Código**
- [ ] TypeScript com tipos corretos
- [ ] Imports otimizados
- [ ] Métodos bem estruturados
- [ ] Nomenclatura consistente

#### ✅ **UI/UX**
- [ ] Design moderno
- [ ] Animações suaves
- [ ] Feedback visual
- [ ] Acessibilidade

#### ✅ **Performance**
- [ ] Lazy loading quando apropriado
- [ ] Otimização de imports
- [ ] Dados paginados
- [ ] Debounce em filtros

### 🚀 Comandos de Desenvolvimento

\`\`\`bash
# Servir aplicação
npx nx serve dashboard

# Testar componente
npx nx test dashboard

# Build do projeto
npx nx build dashboard

# Lint do código
npx nx lint dashboard
\`\`\`

### 📚 Recursos Úteis

- **Angular Material**: https://material.angular.io/
- **Angular Docs**: https://angular.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **RxJS**: https://rxjs.dev/guide/overview

---

*Documentação gerada automaticamente para IA/Copilot - Sistema Híbrido IA + Nx*
*Data: ${timestamp}*
`;

  // Salvar arquivo MD detalhado
  const detailedDocsPath = joinPathFragments('docs', `${fileName}-detailed-spec.md`);
  
  try {
    tree.write(detailedDocsPath, detailedMarkdown);
    console.log(`📄 Documentação detalhada gerada: ${detailedDocsPath}`);
  } catch (error: any) {
    console.log('⚠️ Não foi possível gerar documentação detalhada:', error.message);
  }
}

function analyzePromptAdvanced(prompt: string) {
  const analysis = {
    features: [] as string[],
    columns: [] as string[],
    filters: [] as string[],
    actions: [] as string[],
    metrics: [] as any[],
    charts: [] as any[]
  };

  const lowerPrompt = prompt.toLowerCase();

  // Detectar features
  if (lowerPrompt.includes('filtro') || lowerPrompt.includes('busca')) {
    analysis.features.push('filtros');
  }
  if (lowerPrompt.includes('tabela') || lowerPrompt.includes('lista')) {
    analysis.features.push('tabela');
  }
  if (lowerPrompt.includes('gráfico') || lowerPrompt.includes('chart')) {
    analysis.features.push('graficos');
  }
  if (lowerPrompt.includes('cards') || lowerPrompt.includes('métricas')) {
    analysis.features.push('cards');
  }

  // Extrair colunas
  if (lowerPrompt.includes('tabela:') || lowerPrompt.includes('colunas:')) {
    const tableMatch = prompt.match(/tabela[^:]*:\s*([^-\n]+)/i);
    if (tableMatch) {
      analysis.columns = tableMatch[1].split(',').map(col => col.trim().toLowerCase());
    }
  } else {
    const columnKeywords = ['id', 'nome', 'email', 'status', 'data', 'cliente', 'produto', 'valor'];
    analysis.columns = columnKeywords.filter(keyword => lowerPrompt.includes(keyword));
  }

  // Extrair filtros
  const filterMatches = prompt.match(/(?:filtros?)\s*[:-]\s*([^,\n]+)/gi);
  if (filterMatches) {
    const filterContent = filterMatches[0].split(/[:-]/)[1];
    if (filterContent) {
      analysis.filters = filterContent.split(',').map(f => f.trim().toLowerCase());
    }
  } else {
    analysis.filters = [...analysis.columns];
  }

  // Extrair métricas
  const metricMatches = prompt.match(/([^:]+):\s*([^,\n]+)/g);
  if (metricMatches) {
    analysis.metrics = metricMatches.map(match => {
      const [name, value] = match.split(':').map(s => s.trim());
      return { name, value };
    });
  }

  // Garantir valores padrão
  if (analysis.columns.length === 0) {
    analysis.columns = ['id', 'nome', 'status'];
  }
  if (analysis.filters.length === 0) {
    analysis.filters = ['nome', 'status'];
  }
  if (analysis.actions.length === 0) {
    analysis.actions = ['editar', 'excluir'];
  }

  return analysis;
}

function getRequiredImports(features: string[]) {
  const imports = ['CommonModule', 'FormsModule', 'ReactiveFormsModule'];
  
  if (features.includes('filtros') || features.includes('tabela')) {
    imports.push('MatCardModule', 'MatTableModule', 'MatButtonModule', 'MatIconModule', 'MatInputModule', 'MatFormFieldModule');
  }
  
  if (features.includes('filtros')) {
    imports.push('MatExpansionModule');
  }
  
  if (features.includes('tabela')) {
    imports.push('MatPaginatorModule', 'MatSortModule', 'MatMenuModule');
  }
  
  if (features.includes('modal')) {
    imports.push('MatDialogModule');
  }
  
  if (features.includes('graficos')) {
    imports.push('MatCardModule', 'MatGridListModule');
  }
  
  if (features.includes('cards')) {
    imports.push('MatCardModule', 'MatGridListModule', 'MatIconModule');
  }
  
  if (features.includes('stepper')) {
    imports.push('MatStepperModule', 'MatButtonModule');
  }
  
  return imports;
}

function getDisplayName(screenName: string): string {
  const displayMap: Record<string, string> = {
    'usuarios': '👥 Usuários',
    'produtos': '📦 Produtos',
    'clientes': '👤 Clientes',
    'vendas': '🛒 Vendas',
    'relatorios': '📊 Relatórios',
    'dashboard': '📈 Dashboard'
  };
  
  return displayMap[screenName] || screenName;
}

function getIconForScreen(screenName: string): string {
  const iconMap: Record<string, string> = {
    'usuarios': 'people',
    'produtos': 'inventory',
    'clientes': 'person',
    'vendas': 'shopping_cart',
    'relatorios': 'assessment',
    'dashboard': 'dashboard'
  };
  
  return iconMap[screenName] || 'list';
}

function getColumnDisplayName(column: string): string {
  const displayMap: Record<string, string> = {
    'id': 'ID',
    'nome': 'Nome',
    'email': 'Email',
    'status': 'Status',
    'data': 'Data',
    'cliente': 'Cliente',
    'produto': 'Produto',
    'valor': 'Valor',
    'acoes': 'Acoes'
  };

  return displayMap[column] || column.charAt(0).toUpperCase() + column.slice(1);
}

function getActionDisplayName(action: string): string {
  const displayMap: Record<string, string> = {
    'visualizar': 'Visualizar',
    'editar': 'Editar',
    'excluir': 'Excluir',
    'adicionar': 'Adicionar',
    'exportar': 'Exportar'
  };

  return displayMap[action] || action.charAt(0).toUpperCase() + action.slice(1);
}

function getActionIcon(action: string): string {
  const iconMap: Record<string, string> = {
    'visualizar': 'visibility',
    'editar': 'edit',
    'excluir': 'delete',
    'adicionar': 'add',
    'exportar': 'download'
  };

  return iconMap[action] || 'more_vert';
} 