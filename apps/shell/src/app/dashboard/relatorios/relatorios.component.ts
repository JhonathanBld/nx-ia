import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  template: `
    <div class="relatorios-container">
      <h2>📊 Relatórios do Dashboard</h2>
      <p>Visualize estatísticas e métricas importantes do sistema.</p>

      <mat-grid-list cols="3" rowHeight="200px" gutterSize="16px">
        <mat-grid-tile>
          <mat-card class="metric-card">
            <mat-card-header>
              <mat-card-title>👥 Usuários</mat-card-title>
              <mat-card-subtitle>Total de usuários ativos</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="metric-value">1,247</div>
              <div class="metric-change positive">+12% este mês</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="metric-card">
            <mat-card-header>
              <mat-card-title>📦 Produtos</mat-card-title>
              <mat-card-subtitle>Produtos em estoque</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="metric-value">856</div>
              <div class="metric-change positive">+8% este mês</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="metric-card">
            <mat-card-header>
              <mat-card-title>💰 Vendas</mat-card-title>
              <mat-card-subtitle>Receita total</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="metric-value">R$ 45.2K</div>
              <div class="metric-change positive">+23% este mês</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="metric-card">
            <mat-card-header>
              <mat-card-title>📈 Pedidos</mat-card-title>
              <mat-card-subtitle>Pedidos processados</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="metric-value">342</div>
              <div class="metric-change negative">-5% este mês</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="metric-card">
            <mat-card-header>
              <mat-card-title>⭐ Avaliações</mat-card-title>
              <mat-card-subtitle>Média de satisfação</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="metric-value">4.8/5</div>
              <div class="metric-change positive">+0.2 este mês</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="metric-card">
            <mat-card-header>
              <mat-card-title>🚀 Performance</mat-card-title>
              <mat-card-subtitle>Uptime do sistema</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="metric-value">99.9%</div>
              <div class="metric-change positive">+0.1% este mês</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>

      <div class="actions-container">
        <button mat-raised-button color="primary">
          <mat-icon>download</mat-icon>
          Exportar Relatório
        </button>
        <button mat-raised-button color="accent">
          <mat-icon>print</mat-icon>
          Imprimir
        </button>
        <button mat-raised-button>
          <mat-icon>share</mat-icon>
          Compartilhar
        </button>
      </div>
    </div>
  `,
  styles: [`
    .relatorios-container {
      padding: 20px;
    }

    .relatorios-container h2 {
      margin-bottom: 8px;
      color: #333;
    }

    .relatorios-container p {
      margin-bottom: 24px;
      color: #666;
    }

    .metric-card {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    .metric-value {
      font-size: 32px;
      font-weight: bold;
      color: #1976d2;
      margin: 16px 0 8px 0;
    }

    .metric-change {
      font-size: 14px;
      font-weight: 500;
    }

    .metric-change.positive {
      color: #2e7d32;
    }

    .metric-change.negative {
      color: #c62828;
    }

    .actions-container {
      margin-top: 32px;
      display: flex;
      gap: 16px;
    }
  `]
})
export class RelatoriosComponent {} 