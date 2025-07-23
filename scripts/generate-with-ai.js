#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🤖 IA + Nx Generator');
console.log('====================\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    // Perguntar nome do componente
    const name = await askQuestion('📝 Nome do componente: ');
    if (!name) {
      console.log('❌ Nome é obrigatório');
      process.exit(1);
    }

    // Perguntar descrição
    const prompt = await askQuestion('🎯 Descreva a funcionalidade (filtros, tabelas, gráficos, etc.): ');
    if (!prompt) {
      console.log('❌ Descrição é obrigatória');
      process.exit(1);
    }

    // Perguntar projeto (opcional)
    const project = await askQuestion('📁 Projeto (deixe vazio para "dashboard"): ') || 'dashboard';

    // Perguntar se quer forçar IA ou Nx
    const forceOption = await askQuestion('⚙️ Forçar IA (ai) ou Nx (nx) ou automático (enter): ');
    
    let command = `npx nx g ./dist/libs/schematics:hybrid-generator ${name} --project=${project} --prompt="${prompt}"`;
    
    if (forceOption.toLowerCase() === 'ai') {
      command += ' --forceAI=true';
    } else if (forceOption.toLowerCase() === 'nx') {
      command += ' --forceNx=true';
    }

    console.log('\n🚀 Executando comando...');
    console.log(`📋 Comando: ${command}\n`);

    // Executar o comando
    execSync(command, { stdio: 'inherit' });

    console.log('\n✅ Componente gerado com sucesso!');
    console.log(`📁 Localização: apps/${project}/src/app/${name.toLowerCase()}/`);

  } catch (error) {
    console.error('❌ Erro ao gerar componente:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Verificar se está sendo executado diretamente
if (require.main === module) {
  main();
}

module.exports = { main }; 