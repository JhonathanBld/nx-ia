import { Routes } from '@angular/router';
import { DashboardFinanceiroComponent } from './dashboard-financeiro/dashboard-financeiro.component';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard-financeiro/dashboard-financeiro.component').then((m) => m.DashboardFinanceiroComponent),
  },
];
