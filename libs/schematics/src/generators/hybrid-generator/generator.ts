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
  prompt: string;
  forceAI?: boolean;
  forceNx?: boolean;
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

  // Analisar o prompt para decidir entre Nx e IA
  const analysis = analyzePromptForHybrid(schema.prompt);
  const shouldUseAI = schema.forceAI || (!schema.forceNx && analysis.shouldUseAI);

  console.log(`🔍 Análise do prompt:`);
  console.log(`   - Features detectadas: ${analysis.features.join(', ')}`);
  console.log(`   - Complexidade: ${analysis.complexity}`);
  console.log(`   - Recomendação: ${shouldUseAI ? 'IA 🤖' : 'Nx ⚡'}`);

  if (shouldUseAI) {
    console.log(`🤖 Usando IA para gerar componente avançado...`);
    await generateWithAI(tree, schema, normalizedNames, targetPath, analysis);
  } else {
    console.log(`⚡ Usando Nx para gerar componente básico...`);
    await generateWithNx(tree, schema, normalizedNames, targetPath, analysis);
  }

  // Atualizar menu do shell
  try {
    updateShellMenu(normalizedNames.fileName, projectName);
    console.log(`✅ Menu atualizado: ${normalizedNames.fileName} adicionado ao sidebar`);
  } catch (error: any) {
    console.log('⚠️ Não foi possível atualizar o menu do shell:', error.message);
  }

  await formatFiles(tree);
}

function analyzePromptForHybrid(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  
  const analysis = {
    features: [] as string[],
    complexity: 'basic' as 'basic' | 'intermediate' | 'advanced',
    shouldUseAI: false,
    nxFeatures: [] as string[],
    aiFeatures: [] as string[]
  };

  // Detectar features básicas (Nx)
  if (lowerPrompt.includes('filtro') || lowerPrompt.includes('busca')) {
    analysis.features.push('filtros');
    analysis.nxFeatures.push('filtros');
  }

  if (lowerPrompt.includes('tabela') || lowerPrompt.includes('lista') || lowerPrompt.includes('crud')) {
    analysis.features.push('tabela');
    analysis.nxFeatures.push('tabela');
  }

  if (lowerPrompt.includes('formulário') || lowerPrompt.includes('form')) {
    analysis.features.push('formulario');
    analysis.nxFeatures.push('formulario');
  }

  // Detectar features avançadas (IA)
  if (lowerPrompt.includes('gráfico') || lowerPrompt.includes('chart') || lowerPrompt.includes('barras') || lowerPrompt.includes('pizza')) {
    analysis.features.push('graficos');
    analysis.aiFeatures.push('graficos');
    analysis.shouldUseAI = true;
  }

  if (lowerPrompt.includes('cards') || lowerPrompt.includes('métricas') || lowerPrompt.includes('dashboard')) {
    analysis.features.push('cards');
    analysis.aiFeatures.push('cards');
    analysis.shouldUseAI = true;
  }

  if (lowerPrompt.includes('modal') || lowerPrompt.includes('dialog')) {
    analysis.features.push('modal');
    analysis.aiFeatures.push('modal');
    analysis.shouldUseAI = true;
  }

  if (lowerPrompt.includes('exportação') || lowerPrompt.includes('excel') || lowerPrompt.includes('pdf')) {
    analysis.features.push('exportacao');
    analysis.aiFeatures.push('exportacao');
    analysis.shouldUseAI = true;
  }

  if (lowerPrompt.includes('responsivo') || lowerPrompt.includes('mobile')) {
    analysis.features.push('responsivo');
    analysis.aiFeatures.push('responsivo');
    analysis.shouldUseAI = true;
  }

  if (lowerPrompt.includes('stepper') || lowerPrompt.includes('wizard')) {
    analysis.features.push('stepper');
    analysis.aiFeatures.push('stepper');
    analysis.shouldUseAI = true;
  }

  // Determinar complexidade
  if (analysis.aiFeatures.length > 0) {
    analysis.complexity = 'advanced';
  } else if (analysis.nxFeatures.length > 2) {
    analysis.complexity = 'intermediate';
  } else {
    analysis.complexity = 'basic';
  }

  // Decidir se deve usar IA
  if (analysis.aiFeatures.length > 0) {
    analysis.shouldUseAI = true;
  } else if (analysis.nxFeatures.length > 3) {
    analysis.shouldUseAI = true; // Muitas features = usar IA
  }

  return analysis;
}

async function generateWithNx(tree: Tree, schema: HybridGeneratorSchema, normalizedNames: any, targetPath: string, analysis: any) {
  // Usar o generator básico do Nx
  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: schema.project || 'dashboard',
    features: analysis.nxFeatures,
    displayName: getDisplayName(normalizedNames.fileName),
    icon: getIconForScreen(normalizedNames.fileName)
  };

  // Gerar apenas os imports necessários
  const requiredImports = getRequiredImports(analysis.nxFeatures);
  
  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/hybrid-generator/files/nx'), targetPath, {
    ...templateData,
    requiredImports
  });
}

async function generateWithAI(tree: Tree, schema: HybridGeneratorSchema, normalizedNames: any, targetPath: string, analysis: any) {
  // Usar análise avançada da IA
  const aiAnalysis = analyzePromptAdvanced(schema.prompt);
  
  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: schema.project || 'dashboard',
    prompt: schema.prompt,
    features: analysis.features,
    columns: aiAnalysis.columns,
    filters: aiAnalysis.filters,
    actions: aiAnalysis.actions,
    metrics: aiAnalysis.metrics,
    charts: aiAnalysis.charts,
    displayName: getDisplayName(normalizedNames.fileName),
    icon: getIconForScreen(normalizedNames.fileName),
    getColumnDisplayName: getColumnDisplayName,
    requiredImports: getRequiredImports(analysis.features)
  };

  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/hybrid-generator/files/ai'), targetPath, templateData);
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