#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function showUsage() {
  console.log('🎯 Sistema Híbrido IA + Nx - Generator UI');
  console.log('');
  console.log('📋 Uso:');
  console.log('  node scripts/generate-ui.js [tipo]');
  console.log('');
  console.log('🎯 Tipos disponíveis:');
  console.log('  hybrid     - Generator híbrido (IA + Nx) [PADRÃO]');
  console.log('  ai         - Generator apenas com IA');
  console.log('  nx         - Generator apenas com Nx');
  console.log('');
  console.log('💡 Exemplos:');
  console.log('  node scripts/generate-ui.js');
  console.log('  node scripts/generate-ui.js hybrid');
  console.log('  node scripts/generate-ui.js ai');
  console.log('  node scripts/generate-ui.js nx');
  console.log('');
  console.log('🚀 O Generator UI será aberto automaticamente!');
}

function validateOptions(options) {
  const validatedOptions = { ...options };
  
  // Se não há tabela selecionada, remover colunas
  if (!options.features || !options.features.includes('tabela')) {
    delete validatedOptions.columns;
  }
  
  // Se não há filtros selecionados, remover filtros específicos
  if (!options.features || !options.features.includes('filtros')) {
    delete validatedOptions.filters;
  }
  
  // Se não há ações selecionadas, remover ações específicas
  if (!options.features || !options.features.includes('acoes')) {
    delete validatedOptions.actions;
  }
  
  return validatedOptions;
}

function openGeneratorUI(type = 'hybrid') {
  const generators = {
    hybrid: '@usando-nx/schematics:hybrid-generator',
    ai: '@usando-nx/schematics:ai-generate-screen',
    nx: '@usando-nx/schematics:generate-screen'
  };

  const generator = generators[type];
  
  if (!generator) {
    console.error(`❌ Tipo "${type}" não reconhecido`);
    showUsage();
    process.exit(1);
  }

  console.log(`🎯 Abrindo Generator UI: ${generator}`);
  console.log('📋 Preencha os campos no formulário que será aberto');
  console.log('✅ Clique em "GERAR TELA" quando terminar');
  console.log('');
  console.log('💡 Dicas:');
  console.log('   - Colunas só aparecem se "tabela" estiver selecionada');
  console.log('   - Filtros específicos só aparecem se "filtros" estiver selecionado');
  console.log('   - Ações específicas só aparecem se "acoes" estiver selecionado');
  console.log('');

  try {
    const command = `npx nx g ${generator}`;
    console.log(`📋 Comando: ${command}`);
    console.log('');
    
    execSync(command, { stdio: 'inherit' });
    
    console.log('');
    console.log('✅ Tela gerada com sucesso!');
    console.log('📄 Documentação automática criada em docs/');
    console.log('🚀 Execute "npx nx serve dashboard" para testar');
    
  } catch (error) {
    console.error('❌ Erro ao abrir Generator UI:', error.message);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const type = args[0] || 'hybrid';

  console.log('🎯 Sistema Híbrido IA + Nx - Generator UI');
  console.log('==========================================');
  console.log('');

  if (args.includes('--help') || args.includes('-h')) {
    showUsage();
    return;
  }

  openGeneratorUI(type);
}

if (require.main === module) {
  main();
}

module.exports = { openGeneratorUI, showUsage, validateOptions }; 