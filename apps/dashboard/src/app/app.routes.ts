import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent)
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent)
  }
];
