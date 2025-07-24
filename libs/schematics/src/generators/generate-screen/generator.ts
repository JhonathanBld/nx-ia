import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
} from '@nx/devkit';
import { updateShellMenu } from './update-shell-menu';

interface GenerateScreenGeneratorSchema {
  name: string;
  project?: string;
  features?: string[];
  columns?: string[];
  filters?: string[];
  actions?: string[];
  generateDocs?: boolean;
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

export default async function (tree: Tree, schema: GenerateScreenGeneratorSchema) {
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

  console.log(`🔍 Gerando tela com Nx:`);
  console.log(`   - Features selecionadas: ${validatedSchema.features?.join(', ')}`);
  console.log(`   - Projeto: ${projectName}`);

  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: projectName,
    features: validatedSchema.features || [],
    displayName: getDisplayName(normalizedNames.fileName),
    icon: getIconForScreen(normalizedNames.fileName),
    // Dados específicos das features
    columns: validatedSchema.columns || [],
    filters: validatedSchema.filters || [],
    actions: validatedSchema.actions || [],
    // Funções auxiliares para templates
    getColumnDisplayName: getColumnDisplayName,
    getActionDisplayName: getActionDisplayName,
    getActionIcon: getActionIcon,
    // Novos dados específicos das features
    cardMetrics: validatedSchema.cardMetrics || [],
    chartTypes: validatedSchema.chartTypes || [],
    chartData: validatedSchema.chartData || '',
    modalType: validatedSchema.modalType || 'formulario',
    modalFields: validatedSchema.modalFields || [],
    formFields: validatedSchema.formFields || [],
    exportFormats: validatedSchema.exportFormats || []
  };

  // Gerar apenas os imports necessários
  const requiredImports = getRequiredImports(validatedSchema.features || []);

  // Generate the component files
  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/generate-screen/files'), targetPath, {
    ...templateData,
    requiredImports
  });

  // Update shell menu
  try {
    updateShellMenu(normalizedNames.fileName, projectName);
    console.log(`✅ Menu atualizado: ${normalizedNames.fileName} adicionado ao sidebar`);
  } catch (error: any) {
    console.log('⚠️ Não foi possível atualizar o menu do shell:', error.message);
  }

  // Gerar documentação automática se solicitado
  if (validatedSchema.generateDocs !== false) {
    await generateDocumentation(tree, normalizedNames.fileName, validatedSchema);
  }

  await formatFiles(tree);
}

function validateSchemaOptions(schema: GenerateScreenGeneratorSchema): GenerateScreenGeneratorSchema {
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

async function generateDocumentation(tree: Tree, componentName: string, schema: GenerateScreenGeneratorSchema) {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = componentName.toLowerCase().replace(/\s+/g, '-');
  
  const basicMarkdown = `# Análise de Tela - ${componentName}

## 📋 Informações Gerais

- **Data**: ${timestamp}
- **Componente**: ${componentName}
- **Features**: ${schema.features?.join(', ') || 'N/A'}
- **Gerador**: Nx ⚡

## 🔍 Análise Detalhada

### Features Selecionadas
${schema.features?.map((f: string) => `- ✅ ${f}`).join('\n') || '- Nenhuma feature selecionada'}

### Configurações Específicas
${getSpecificConfigurations(schema)}

## 🎯 Geração com Nx

### ⚡ Usar Nx (Básico)

**Motivo**: Geração rápida e eficiente usando templates dinâmicos baseados nas features selecionadas.

**Comando Executado**:
\`\`\`bash
npx nx g @usando-nx/schematics:generate-screen ${fileName} --features="${schema.features?.join(',')}"
\`\`\`

**Benefícios**:
- ⚡ Geração rápida
- ⚡ Imports otimizados
- ⚡ Templates dinâmicos
- ⚡ Menor complexidade
- ⚡ Componentes específicos por feature

**Estrutura Gerada**:
\`\`\`
apps/dashboard/src/app/${fileName}/
├── ${fileName}.component.ts      # Lógica dinâmica baseada nas features
├── ${fileName}.component.html    # Template dinâmico
├── ${fileName}.component.scss    # Estilos básicos
└── ${fileName}.component.spec.ts # Testes básicos
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

*Gerado automaticamente pelo Sistema Nx*
`;

  // Salvar arquivo MD básico
  const docsPath = joinPathFragments('docs', `${fileName}-nx-analysis.md`);
  
  try {
    tree.write(docsPath, basicMarkdown);
    console.log(`📄 Documentação gerada: ${docsPath}`);
  } catch (error: any) {
    console.log('⚠️ Não foi possível gerar documentação:', error.message);
  }
}

function getSpecificConfigurations(schema: GenerateScreenGeneratorSchema): string {
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