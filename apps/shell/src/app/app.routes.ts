import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'dashboard/usuarios',
    loadComponent: () => import('./dashboard/usuarios/usuarios.component').then(m => m.UsuariosComponent)
  },
  {
    path: 'dashboard/produtos',
    loadComponent: () => import('./dashboard/produtos/produtos.component').then(m => m.ProdutosComponent)
  },
  {
    path: 'dashboard/relatorios',
    loadComponent: () => import('./dashboard/relatorios/relatorios.component').then(m => m.RelatoriosComponent)
  }
]; 