import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

interface MenuItem {
  name: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="'navigation'"
        [mode]="'side'"
        [opened]="true"
      >
        <mat-toolbar class="sidebar-header">
          <h2>🚀 MFE Shell</h2>
        </mat-toolbar>

        <mat-nav-list class="sidebar-menu">
          <!-- Home -->
          <a mat-list-item routerLink="/" routerLinkActive="active-link">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>🏠 Home</span>
          </a>

          <!-- Dashboard MFE -->
          <mat-expansion-panel class="mfe-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>dashboard</mat-icon>
                📊 Dashboard MFE
              </mat-panel-title>
            </mat-expansion-panel-header>

            <mat-nav-list>
              <a
                mat-list-item
                routerLink="/dashboard"
                routerLinkActive="active-link"
              >
                <mat-icon matListItemIcon>dashboard</mat-icon>
                <span matListItemTitle>📈 Dashboard</span>
              </a>
              <a
                mat-list-item
                routerLink="/dashboard/usuarios"
                routerLinkActive="active-link"
              >
                <mat-icon matListItemIcon>people</mat-icon>
                <span matListItemTitle>👥 Usuários</span>
              </a>
              <a
                mat-list-item
                routerLink="/dashboard/produtos"
                routerLinkActive="active-link"
              >
                <mat-icon matListItemIcon>inventory</mat-icon>
                <span matListItemTitle>📦 Produtos</span>
              </a>
              <a
                mat-list-item
                routerLink="/dashboard/relatorios"
                routerLinkActive="active-link"
              >
                <mat-icon matListItemIcon>assessment</mat-icon>
                <span matListItemTitle>📊 Relatórios</span>
              </a>
            </mat-nav-list>
          </mat-expansion-panel>

          <!-- Admin MFE (futuro) -->
          <mat-expansion-panel class="mfe-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>admin_panel_settings</mat-icon>
                ⚙️ Admin MFE
              </mat-panel-title>
            </mat-expansion-panel-header>

            <mat-nav-list>
              <a
                mat-list-item
                routerLink="/admin"
                routerLinkActive="active-link"
              >
                <mat-icon matListItemIcon>settings</mat-icon>
                <span matListItemTitle>🔧 Configurações</span>
              </a>
              <a
                mat-list-item
                routerLink="/admin/users"
                routerLinkActive="active-link"
              >
                <mat-icon matListItemIcon>manage_accounts</mat-icon>
                <span matListItemTitle>👤 Gerenciar Usuários</span>
              </a>
              <a
                mat-list-item
                routerLink="/admin/permissions"
                routerLinkActive="active-link"
              >
                <mat-icon matListItemIcon>security</mat-icon>
                <span matListItemTitle>🔐 Permissões</span>
              </a>

              <a mat-list-item routerLink="/dashboard/telasimples" routerLinkActive="active-link">
                <mat-icon matListItemIcon>list</mat-icon>
                <span matListItemTitle>telasimples</span>
              </a>
            </mat-nav-list>
          </mat-expansion-panel>

          <!-- Finance MFE (futuro) -->
          <mat-expansion-panel class="mfe-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>account_balance</mat-icon>
                💰 Finance MFE
              </mat-panel-title>
            </mat-expansion-panel-header>

            <mat-nav-list> </mat-nav-list>
          </mat-expansion-panel>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="sidenav-content">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: 100vh;
      }

      .sidenav {
        width: 280px;
        background: #fafafa;
        border-right: 1px solid #e0e0e0;
      }

      .sidebar-header {
        background: #3f51b5;
        color: white;
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
      }

      .sidebar-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
      }

      .sidebar-menu {
        padding: 0;
      }

      .mfe-panel {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        border-bottom: 1px solid #e0e0e0;
      }

      .mfe-panel .mat-expansion-panel-header {
        padding: 0 16px;
        height: 48px;
      }

      .mfe-panel .mat-expansion-panel-header-title {
        font-size: 14px;
        font-weight: 500;
        color: #333;
      }

      .mfe-panel .mat-expansion-panel-body {
        padding: 0;
      }

      .mfe-panel mat-nav-list {
        padding: 0;
      }

      .mfe-panel mat-nav-list a {
        padding-left: 32px;
        height: 40px;
        font-size: 13px;
        color: #666;
      }

      .mfe-panel mat-nav-list a:hover {
        background: #f5f5f5;
      }

      .active-link {
        background: #e3f2fd !important;
        color: #1976d2 !important;
      }

      .sidenav-content {
        padding: 20px;
        background: #fafafa;
      }

      mat-icon {
        margin-right: 8px;
      }
    `,
  ],
})
export class SidebarComponent {}
