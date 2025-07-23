import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
} from '@nx/devkit';
import { updateShellMenu } from '../generate-screen/update-shell-menu';

interface AiGenerateScreenGeneratorSchema {
  name: string;
  project?: string;
  prompt: string;
  features?: string[];
  columns?: string[];
  filters?: string[];
  actions?: string[];
}

export default async function (tree: Tree, schema: AiGenerateScreenGeneratorSchema) {
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

  // Analisar o prompt da IA para extrair informações
  const aiAnalysis = analyzePrompt(schema.prompt);
  
  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: projectName,
    prompt: schema.prompt,
    features: schema.features || aiAnalysis.features,
    columns: schema.columns || aiAnalysis.columns,
    filters: schema.filters || aiAnalysis.filters,
    actions: schema.actions || aiAnalysis.actions,
    metrics: aiAnalysis.metrics,
    charts: aiAnalysis.charts,
    displayName: getDisplayName(normalizedNames.fileName),
    icon: getIconForScreen(normalizedNames.fileName),
    getColumnDisplayName: getColumnDisplayName
  };

  // Gerar os arquivos baseados na análise da IA
  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/ai-generate-screen/files'), targetPath, templateData);

  // Atualizar menu do shell
  try {
    updateShellMenu(normalizedNames.fileName, projectName);
  } catch (error: any) {
    console.log('⚠️ Não foi possível atualizar o menu do shell:', error.message);
  }

  await formatFiles(tree);
}

function analyzePrompt(prompt: string) {
  const analysis = {
    features: [] as string[],
    columns: [] as string[],
    filters: [] as string[],
    actions: [] as string[],
    metrics: [] as any[],
    charts: [] as any[]
  };

  const lowerPrompt = prompt.toLowerCase();
  
  // Detectar features baseadas em palavras-chave
  if (lowerPrompt.includes('filtro') || lowerPrompt.includes('busca') || lowerPrompt.includes('pesquisa')) {
    analysis.features.push('filtros');
  }
  
  if (lowerPrompt.includes('tabela') || lowerPrompt.includes('lista') || lowerPrompt.includes('grid') || lowerPrompt.includes('transações')) {
    analysis.features.push('tabela');
  }
  
  if (lowerPrompt.includes('modal') || lowerPrompt.includes('dialog')) {
    analysis.features.push('modal');
  }
  
  if (lowerPrompt.includes('formulário') || lowerPrompt.includes('form') || lowerPrompt.includes('cadastro')) {
    analysis.features.push('formulario');
  }

  if (lowerPrompt.includes('cards') || lowerPrompt.includes('dashboard') || lowerPrompt.includes('métricas') || lowerPrompt.includes('metricas')) {
    analysis.features.push('cards');
  }

  if (lowerPrompt.includes('gráfico') || lowerPrompt.includes('chart') || lowerPrompt.includes('grafico') || lowerPrompt.includes('barras') || lowerPrompt.includes('pizza')) {
    analysis.features.push('graficos');
  }

  if (lowerPrompt.includes('paginação') || lowerPrompt.includes('pagination')) {
    analysis.features.push('paginacao');
  }

  if (lowerPrompt.includes('exportação') || lowerPrompt.includes('exportar') || lowerPrompt.includes('excel') || lowerPrompt.includes('pdf')) {
    analysis.features.push('exportacao');
  }

  if (lowerPrompt.includes('importação') || lowerPrompt.includes('importar')) {
    analysis.features.push('importacao');
  }

  if (lowerPrompt.includes('responsivo') || lowerPrompt.includes('mobile')) {
    analysis.features.push('responsivo');
  }

  // Extrair métricas específicas
  const metricMatches = prompt.match(/([^:]+):\s*([^,\n]+)/g);
  if (metricMatches) {
    analysis.metrics = metricMatches.map(match => {
      const [name, value] = match.split(':').map(s => s.trim());
      return { name, value };
    });
  }

  // Extrair métricas de cards
  const cardMatches = prompt.match(/cards?[^:]*:\s*([^-\n]+)/gi);
  if (cardMatches) {
    const cardContent = cardMatches[0].split(':')[1];
    const metricMatches = cardContent.match(/([^:]+):\s*([^,\n]+)/g);
    if (metricMatches) {
      analysis.metrics = metricMatches.map(match => {
        const [name, value] = match.split(':').map(s => s.trim());
        return { name, value };
      });
    }
  }

  // Extrair colunas da tabela
  if (lowerPrompt.includes('tabela de') || lowerPrompt.includes('colunas:')) {
    const tableMatch = prompt.match(/tabela[^:]*:\s*([^-\n]+)/i);
    if (tableMatch) {
      const columns = tableMatch[1].split(',').map(col => col.trim().toLowerCase());
      analysis.columns = columns;
    }
  } else {
    // Fallback: extrair colunas de forma mais inteligente
    const columnKeywords = ['id', 'nome', 'name', 'email', 'status', 'data', 'date', 'preço', 'price', 'categoria', 'category', 'cliente', 'produto', 'valor'];
    analysis.columns = columnKeywords.filter(keyword => lowerPrompt.includes(keyword));
  }

  // Extrair filtros mencionados
  const filterMatches = prompt.match(/(?:filtros?|busca|pesquisa)\s*[:-]\s*([^,\n]+)/gi);
  if (filterMatches) {
    const filterContent = filterMatches[0].split(/[:-]/)[1];
    if (filterContent) {
      analysis.filters = filterContent.split(',').map(f => f.trim().toLowerCase());
    }
  } else {
    // Fallback: usar colunas como filtros
    analysis.filters = [...analysis.columns];
  }

  // Extrair ações mencionadas
  const actionMatches = prompt.match(/(?:ações?|botões?|button|action)\s*[:-]\s*([^,\n]+)/gi);
  if (actionMatches) {
    analysis.actions = actionMatches.map(match => match.split(/[:-]/)[1]?.trim()).filter(Boolean);
  } else {
    // Fallback: ações padrão baseadas no contexto
    if (lowerPrompt.includes('crud') || lowerPrompt.includes('gerenciamento')) {
      analysis.actions = ['visualizar', 'editar', 'excluir', 'adicionar'];
    } else if (lowerPrompt.includes('dashboard') || lowerPrompt.includes('relatório')) {
      analysis.actions = ['exportar', 'visualizar'];
    } else {
      analysis.actions = ['editar', 'excluir'];
    }
  }

  // Garantir que temos pelo menos algumas features básicas
  if (analysis.features.length === 0) {
    analysis.features = ['filtros', 'tabela', 'acoes'];
  }

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

function getDisplayName(screenName: string): string {
  const displayMap: Record<string, string> = {
    'usuarios': '👥 Usuários',
    'produtos': '📦 Produtos',
    'clientes': '👤 Clientes',
    'vendas': '🛒 Vendas',
    'relatorios': '📊 Relatórios',
    'financeiro': '💰 Financeiro',
    'configuracoes': '⚙️ Configurações',
    'consultaprodutos': '🔍 Consulta Produtos',
    'gerenciamentousuarios': '👥 Gerenciamento Usuários'
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
    'financeiro': 'account_balance',
    'configuracoes': 'settings',
    'consultaprodutos': 'search',
    'gerenciamentousuarios': 'manage_accounts'
  };
  
  return iconMap[screenName] || 'list';
}

function getColumnDisplayName(column: string): string {
  const displayMap: Record<string, string> = {
    'id': 'ID',
    'nome': 'Nome',
    'name': 'Nome',
    'email': 'Email',
    'status': 'Status',
    'data': 'Data',
    'date': 'Data',
    'preco': 'Preco',
    'price': 'Preco',
    'categoria': 'Categoria',
    'category': 'Categoria',
    'cliente': 'Cliente',
    'produto': 'Produto',
    'valor': 'Valor',
    'acoes': 'Acoes'
  };

  return displayMap[column] || column.charAt(0).toUpperCase() + column.slice(1);
} 