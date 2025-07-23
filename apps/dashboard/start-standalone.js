const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando Dashboard como projeto Angular standalone...');

// Mudar para o diretório do dashboard
process.chdir(__dirname);

try {
  // Instalar dependências se necessário
  console.log('📦 Verificando dependências...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Iniciar o servidor
  console.log('🌐 Iniciando servidor na porta 4201...');
  execSync('ng serve --port 4201', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Erro ao iniciar o dashboard:', error.message);
  process.exit(1);
} 