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
  features?: string[];
  columns?: string[];
  filters?: string[];
  actions?: string[];
  forceAI?: boolean;
  forceNx?: boolean;
  generateDocs?: boolean;
  detailedPrompt?: string;
  generateDetailedDocs?: boolean;
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

  // Analisar o prompt para decidir entre Nx e IA
  const analysis = analyzePromptForHybrid(schema.prompt);
  const shouldUseAI = validatedSchema.forceAI || (!validatedSchema.forceNx && analysis.shouldUseAI);

  console.log(`🔍 Análise do prompt:`);
  console.log(`   - Features detectadas: ${analysis.features.join(', ')}`);
  console.log(`   - Complexidade: ${analysis.complexity}`);
  console.log(`   - Recomendação: ${shouldUseAI ? 'IA 🤖' : 'Nx ⚡'}`);

  if (shouldUseAI) {
    console.log(`🤖 Usando IA para gerar componente avançado...`);
    await generateWithAI(tree, validatedSchema, normalizedNames, targetPath, analysis);
  } else {
    console.log(`⚡ Usando Nx para gerar componente básico...`);
    await generateWithNx(tree, validatedSchema, normalizedNames, targetPath, analysis);
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
    await generateDocumentation(tree, normalizedNames.fileName, schema.prompt, analysis, validatedSchema);
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
  
  return validatedSchema;
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
  const aiAnalysis = analyzePromptAdvanced(schema.detailedPrompt || schema.prompt);
  
  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: schema.project || 'dashboard',
    prompt: schema.detailedPrompt || schema.prompt, // Usar prompt detalhado se disponível
    features: analysis.features,
    columns: aiAnalysis.columns,
    filters: aiAnalysis.filters,
    actions: aiAnalysis.actions,
    metrics: aiAnalysis.metrics,
    charts: aiAnalysis.charts,
    displayName: getDisplayName(normalizedNames.fileName),
    icon: getIconForScreen(normalizedNames.fileName),
    getColumnDisplayName: getColumnDisplayName,
    requiredImports: getRequiredImports(analysis.features),
    detailedPrompt: schema.detailedPrompt // Passar prompt detalhado para templates
  };

  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/hybrid-generator/files/ai'), targetPath, templateData);
}

async function generateDocumentation(tree: Tree, componentName: string, prompt: string, analysis: any, schema: HybridGeneratorSchema) {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = componentName.toLowerCase().replace(/\s+/g, '-');
  const shouldUseAI = analysis.shouldUseAI || schema.forceAI;
  
  // Documentação básica (sempre gerada)
  const basicMarkdown = `# Análise de Prompt - ${componentName}

## 📋 Informações Gerais

- **Data**: ${timestamp}
- **Componente**: ${componentName}
- **Prompt**: "${prompt}"
- **Complexidade**: ${analysis.complexity}
- **Recomendação**: ${shouldUseAI ? '🤖 IA' : '⚡ Nx'}

## 🔍 Análise Detalhada

### Features Detectadas
${analysis.features.map((f: string) => `- ✅ ${f}`).join('\n')}

### Features Nx (Básicas)
${analysis.nxFeatures.map((f: string) => `- ⚡ ${f}`).join('\n')}

### Features IA (Avançadas)
${analysis.aiFeatures.map((f: string) => `- 🤖 ${f}`).join('\n')}

## 🎯 Recomendação

### ${shouldUseAI ? '🤖 Usar IA (Avançado)' : '⚡ Usar Nx (Básico)'}

**Motivo**: ${shouldUseAI ? 'Features avançadas detectadas que requerem análise inteligente de prompts.' : 'Features básicas que podem ser geradas rapidamente pelo Nx.'}

**Comando Executado**:
\`\`\`bash
npx nx g ./dist/libs/schematics:hybrid-generator ${fileName} --prompt="${prompt}" ${shouldUseAI ? '--forceAI=true' : '--forceNx=true'}
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

- **Total de Features**: ${analysis.features.length}
- **Features Nx**: ${analysis.nxFeatures.length}
- **Features IA**: ${analysis.aiFeatures.length}
- **Nível de Complexidade**: ${analysis.complexity}

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
  if (shouldUseAI && schema.detailedPrompt && schema.generateDetailedDocs) {
    await generateDetailedDocumentation(tree, componentName, schema, analysis);
  }
}

async function generateDetailedDocumentation(tree: Tree, componentName: string, schema: HybridGeneratorSchema, analysis: any) {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = componentName.toLowerCase().replace(/\s+/g, '-');
  
  const detailedMarkdown = `# Especificação Detalhada - ${componentName}

## 📋 Informações do Projeto

- **Data**: ${timestamp}
- **Componente**: ${componentName}
- **Prompt Básico**: "${schema.prompt}"
- **Prompt Detalhado**: "${schema.detailedPrompt}"
- **Features**: ${schema.features?.join(', ') || 'N/A'}
- **Gerador**: IA 🤖

## 🎯 Especificação para Copilot

### 📝 Prompt Detalhado
\`\`\`
${schema.detailedPrompt}
\`\`\`

### 🏗️ Estrutura Esperada

#### Componente TypeScript
\`\`\`typescript
// ${componentName}.component.ts
import { Component, OnInit } from '@angular/core';
// Imports necessários baseados nas features: ${schema.features?.join(', ')}

@Component({
  selector: 'app-${fileName}',
  templateUrl: './${fileName}.component.html',
  styleUrls: ['./${fileName}.component.scss']
})
export class ${componentName}Component implements OnInit {
  // Implementar lógica baseada no prompt detalhado
}
\`\`\`

#### Template HTML
\`\`\`html
<!-- ${fileName}.component.html -->
<!-- Implementar template baseado no prompt detalhado -->
\`\`\`

#### Estilos SCSS
\`\`\`scss
/* ${fileName}.component.scss */
/* Implementar estilos baseados no prompt detalhado */
\`\`\`

### 🎨 Features Específicas

${schema.features?.map(feature => {
  switch(feature) {
    case 'cards':
      return `#### Cards de Métricas
- Layout responsivo com grid
- Ícones e indicadores
- Animações suaves
- Cores temáticas`;
    case 'graficos':
      return `#### Gráficos
- Gráficos de barras, pizza, linha
- Dados simulados realistas
- Interatividade
- Responsividade`;
    case 'filtros':
      return `#### Filtros Avançados
- Datepicker para períodos
- Selects múltiplos
- Chips para seleção
- Busca em tempo real`;
    case 'tabela':
      return `#### Tabela Dinâmica
- Ordenação por colunas
- Paginação
- Ações por linha
- Seleção múltipla`;
    case 'modal':
      return `#### Modais
- Formulários de criação/edição
- Confirmações de exclusão
- Upload de arquivos
- Validação em tempo real`;
    case 'exportacao':
      return `#### Exportação
- Botão de exportar Excel
- Botão de exportar PDF
- Filtros aplicados na exportação
- Nome de arquivo dinâmico`;
    case 'responsivo':
      return `#### Responsividade
- Layout adaptativo
- Breakpoints para mobile
- Navegação touch-friendly
- Cards empilhados em telas pequenas`;
    default:
      return `#### ${feature.charAt(0).toUpperCase() + feature.slice(1)}
- Implementar funcionalidade específica`;
  }
}).join('\n\n') || '#### Funcionalidades Básicas\n- Implementar conforme prompt'}

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

\`\`\`bash
# Servir aplicação
npx nx serve dashboard

# Testar componente
npx nx test dashboard

# Build do projeto
npx nx build dashboard
\`\`\`

---

*Documentação detalhada gerada para Copilot - Sistema Híbrido IA + Nx*
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