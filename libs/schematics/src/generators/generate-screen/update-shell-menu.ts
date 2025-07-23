import * as fs from 'fs';
import * as path from 'path';

export function updateShellMenu(screenName: string, projectName = 'dashboard') {
  const shellSidebarPath = 'apps/shell/src/app/sidebar/sidebar.component.ts';
  
  if (!fs.existsSync(shellSidebarPath)) {
    console.log('⚠️ Shell sidebar não encontrado. Menu não será atualizado.');
    return;
  }

  const sidebarContent = fs.readFileSync(shellSidebarPath, 'utf8');
  
  // Criar o novo item do menu
  const menuItem = `
              <a mat-list-item routerLink="/${projectName}/${screenName}" routerLinkActive="active-link">
                <mat-icon matListItemIcon>${getIconForScreen(screenName)}</mat-icon>
                <span matListItemTitle>${getDisplayName(screenName)}</span>
              </a>`;

  // Encontrar onde inserir o novo item (antes do fechamento do mat-nav-list)
  const insertPosition = sidebarContent.lastIndexOf('            </mat-nav-list>');
  
  if (insertPosition !== -1) {
    const newContent = sidebarContent.slice(0, insertPosition) + 
                      menuItem + '\n' + 
                      sidebarContent.slice(insertPosition);
    
    fs.writeFileSync(shellSidebarPath, newContent);
    console.log(`✅ Menu atualizado: ${screenName} adicionado ao sidebar`);
  } else {
    console.log('⚠️ Não foi possível encontrar a posição para inserir o menu');
  }
}

function getIconForScreen(screenName: string): string {
  const iconMap: Record<string, string> = {
    'usuarios': 'people',
    'produtos': 'inventory',
    'relatorios': 'assessment',
    'clientes': 'person',
    'vendas': 'shopping_cart',
    'financeiro': 'account_balance',
    'configuracoes': 'settings'
  };
  
  return iconMap[screenName] || 'list';
}

function getDisplayName(screenName: string): string {
  const displayMap: Record<string, string> = {
    'usuarios': '👥 Usuários',
    'produtos': '📦 Produtos',
    'relatorios': '📊 Relatórios',
    'clientes': '👤 Clientes',
    'vendas': '🛒 Vendas',
    'financeiro': '💰 Financeiro',
    'configuracoes': '⚙️ Configurações'
  };
  
  return displayMap[screenName] || screenName;
}

module.exports = { updateShellMenu }; 