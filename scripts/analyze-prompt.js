#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function analyzePromptComplexity(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  const analysis = {
    features: [],
    complexity: 'basic',
    shouldUseAI: false,
    nxFeatures: [],
    aiFeatures: [],
    recommendations: [],
    command: '',
    explanation: ''
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
    analysis.shouldUseAI = true;
  }

  return analysis;
}

function generateMarkdown(componentName, prompt, analysis) {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = componentName.toLowerCase().replace(/\s+/g, '-');
  
  const markdown = `# Análise de Prompt - ${componentName}

## 📋 Informações Gerais

- **Data**: ${timestamp}
- **Componente**: ${componentName}
- **Prompt**: "${prompt}"
- **Complexidade**: ${analysis.complexity}
- **Recomendação**: ${analysis.shouldUseAI ? '🤖 IA' : '⚡ Nx'}

## 🔍 Análise Detalhada

### Features Detectadas
${analysis.features.map(f => `- ✅ ${f}`).join('\n')}

### Features Nx (Básicas)
${analysis.nxFeatures.map(f => `- ⚡ ${f}`).join('\n')}

### Features IA (Avançadas)
${analysis.aiFeatures.map(f => `- 🤖 ${f}`).join('\n')}

## 🎯 Recomendação

${analysis.shouldUseAI ? 
`### 🤖 Usar IA (Avançado)

**Motivo**: Features avançadas detectadas que requerem análise inteligente de prompts.

**Comando Recomendado**:
\`\`\`bash
npx nx g ./dist/libs/schematics:hybrid-generator ${fileName} --prompt="${prompt}" --forceAI=true
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
\`\`\`` : 
`### ⚡ Usar Nx (Básico)

**Motivo**: Features básicas que podem ser geradas rapidamente pelo Nx.

**Comando Recomendado**:
\`\`\`bash
npx nx g ./dist/libs/schematics:hybrid-generator ${fileName} --prompt="${prompt}" --forceNx=true
\`\`\`

**Benefícios**:
- ⚡ Geração rápida
- ⚡ Imports otimizados
- ⚡ Templates padrão
- ⚡ Menor complexidade

**Estrutura Gerada**:
\`\`\`
apps/dashboard/src/app/${fileName}/
├── ${fileName}.component.ts      # Lógica básica
├── ${fileName}.component.html    # Template padrão
├── ${fileName}.component.scss    # Estilos básicos
└── ${fileName}.component.spec.ts # Testes básicos
\`\`\``}

## 🚀 Comandos Alternativos

### Comando Automático (Recomendado)
\`\`\`bash
npx nx g ./dist/libs/schematics:hybrid-generator ${fileName} --prompt="${prompt}"
\`\`\`

### Script Interativo
\`\`\`bash
node scripts/generate-with-ai.js
\`\`\`

## 📊 Estatísticas

- **Total de Features**: ${analysis.features.length}
- **Features Nx**: ${analysis.nxFeatures.length}
- **Features IA**: ${analysis.aiFeatures.length}
- **Nível de Complexidade**: ${analysis.complexity}

## 🎯 Próximos Passos

1. **Execute o comando recomendado**
2. **Verifique os arquivos gerados**
3. **Customize conforme necessário**
4. **Teste a funcionalidade**

---

*Gerado automaticamente pelo Sistema Híbrido IA + Nx*
`;

  return markdown;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('❌ Uso: node analyze-prompt.js <nome-componente> "<prompt>"');
    console.log('Exemplo: node analyze-prompt.js DashboardVendas "Dashboard com cards de métricas e gráficos"');
    process.exit(1);
  }

  const componentName = args[0];
  const prompt = args[1];

  console.log('🔍 Analisando prompt...');
  console.log(`📝 Componente: ${componentName}`);
  console.log(`🎯 Prompt: "${prompt}"`);
  console.log('');

  const analysis = analyzePromptComplexity(prompt);
  const markdown = generateMarkdown(componentName, prompt, analysis);

  // Salvar arquivo MD
  const fileName = componentName.toLowerCase().replace(/\s+/g, '-');
  const filePath = path.join(__dirname, '..', 'docs', `${fileName}-analysis.md`);
  
  // Criar diretório docs se não existir
  const docsDir = path.dirname(filePath);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  fs.writeFileSync(filePath, markdown);

  console.log('✅ Análise concluída!');
  console.log(`📄 Arquivo gerado: ${filePath}`);
  console.log('');
  console.log('📊 Resumo:');
  console.log(`   - Complexidade: ${analysis.complexity}`);
  console.log(`   - Recomendação: ${analysis.shouldUseAI ? '🤖 IA' : '⚡ Nx'}`);
  console.log(`   - Features detectadas: ${analysis.features.join(', ')}`);
  console.log('');
  console.log('🚀 Comando recomendado:');
  console.log(`npx nx g ./dist/libs/schematics:hybrid-generator ${fileName} --prompt="${prompt}" ${analysis.shouldUseAI ? '--forceAI=true' : '--forceNx=true'}`);
}

if (require.main === module) {
  main();
}

module.exports = { analyzePromptComplexity, generateMarkdown }; 