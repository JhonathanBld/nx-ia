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
  generateDocs?: boolean;
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

  console.log(`🤖 Gerando tela com IA:`);
  console.log(`   - Nome: ${schema.name}`);
  console.log(`   - Projeto: ${projectName}`);
  console.log(`   - Prompt: ${schema.prompt.substring(0, 100)}...`);

  // Analisar o prompt da IA para extrair informações
  const aiAnalysis = analyzePrompt(schema.prompt);
  
  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: projectName,
    prompt: schema.prompt,
    features: aiAnalysis.features,
    columns: aiAnalysis.columns,
    filters: aiAnalysis.filters,
    actions: aiAnalysis.actions,
    metrics: aiAnalysis.metrics,
    charts: aiAnalysis.charts,
    displayName: getDisplayName(normalizedNames.fileName),
    icon: getIconForScreen(normalizedNames.fileName),
    getColumnDisplayName: getColumnDisplayName,
    getActionDisplayName: getActionDisplayName,
    getActionIcon: getActionIcon
  };

  // Gerar os arquivos baseados na análise da IA
  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/ai-generate-screen/files'), targetPath, templateData);

  // Atualizar menu do shell
  try {
    updateShellMenu(normalizedNames.fileName, projectName);
    console.log(`✅ Menu atualizado: ${normalizedNames.fileName} adicionado ao sidebar`);
  } catch (error: any) {
    console.log('⚠️ Não foi possível atualizar o menu do shell:', error.message);
  }

  // Gerar documentação automática se solicitado
  if (schema.generateDocs !== false) {
    await generateDocumentation(tree, normalizedNames.fileName, schema, aiAnalysis);
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

async function generateDocumentation(tree: Tree, componentName: string, schema: AiGenerateScreenGeneratorSchema, aiAnalysis: any) {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = componentName.toLowerCase().replace(/\s+/g, '-');
  
  const basicMarkdown = `# Análise de Tela com IA - ${componentName}

## 📋 Informações Gerais

- **Data**: ${timestamp}
- **Componente**: ${componentName}
- **Prompt**: "${schema.prompt}"
- **Gerador**: IA 🤖

## 🔍 Análise Detalhada

### Features Detectadas pela IA
${aiAnalysis.features.map((f: string) => `- ✅ ${f}`).join('\n')}

### Configurações Extraídas
${getSpecificConfigurations(aiAnalysis)}

## 🎯 Geração com IA

### 🤖 Usar IA (Avançado)

**Motivo**: Análise inteligente do prompt para extrair features e configurações automaticamente.

**Comando Executado**:
\`\`\`bash
npx nx g @usando-nx/schematics:ai-generate-screen ${fileName} --prompt="${schema.prompt}"
\`\`\`

**Benefícios**:
- ✅ Análise inteligente do prompt
- ✅ Extração automática de colunas, filtros e métricas
- ✅ Geração de templates dinâmicos
- ✅ Suporte a features avançadas (gráficos, cards, modais)
- ✅ Imports otimizados baseados nas features

**Estrutura Gerada**:
\`\`\`
apps/dashboard/src/app/${fileName}/
├── ${fileName}.component.ts      # Lógica com imports completos
├── ${fileName}.component.html    # Template dinâmico
├── ${fileName}.component.scss    # Estilos responsivos
└── ${fileName}.component.spec.ts # Testes completos
\`\`\`

## 📊 Estatísticas

- **Total de Features**: ${aiAnalysis.features.length}
- **Features Básicas**: ${aiAnalysis.features.filter((f: string) => ['filtros', 'tabela', 'acoes', 'formulario'].includes(f)).length}
- **Features Avançadas**: ${aiAnalysis.features.filter((f: string) => ['cards', 'graficos', 'modal', 'exportacao', 'responsivo'].includes(f)).length}

## 🎯 Próximos Passos

1. **✅ Comando executado automaticamente**
2. **Verifique os arquivos gerados**
3. **Customize conforme necessário**
4. **Teste a funcionalidade**

---

*Gerado automaticamente pelo Sistema IA*
`;

  // Salvar arquivo MD básico
  const docsPath = joinPathFragments('docs', `${fileName}-ai-analysis.md`);
  
  try {
    tree.write(docsPath, basicMarkdown);
    console.log(`📄 Documentação gerada: ${docsPath}`);
  } catch (error: any) {
    console.log('⚠️ Não foi possível gerar documentação:', error.message);
  }
}

function getSpecificConfigurations(aiAnalysis: any): string {
  const configs: string[] = [];

  if (aiAnalysis.columns?.length) {
    configs.push(`**Colunas da Tabela**: ${aiAnalysis.columns.join(', ')}`);
  }

  if (aiAnalysis.filters?.length) {
    configs.push(`**Filtros**: ${aiAnalysis.filters.join(', ')}`);
  }

  if (aiAnalysis.actions?.length) {
    configs.push(`**Ações**: ${aiAnalysis.actions.join(', ')}`);
  }

  if (aiAnalysis.metrics?.length) {
    configs.push(`**Métricas**: ${aiAnalysis.metrics.map((m: any) => m.name).join(', ')}`);
  }

  return configs.length > 0 ? configs.join('\n') : '- Nenhuma configuração específica';
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