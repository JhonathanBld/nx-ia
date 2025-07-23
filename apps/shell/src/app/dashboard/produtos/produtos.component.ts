import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>📦 Gerenciamento de Produtos</mat-card-title>
        <mat-card-subtitle>Dashboard MFE - Módulo de Produtos</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="search-container">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>🔍 Buscar produtos</mat-label>
            <input matInput [(ngModel)]="searchTerm" placeholder="Digite para buscar...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          
          <button mat-raised-button color="primary" class="add-button">
            <mat-icon>add</mat-icon>
            Adicionar Produto
          </button>
        </div>

        <table mat-table [dataSource]="produtos" class="produtos-table">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let produto">{{produto.id}}</td>
          </ng-container>

          <ng-container matColumnDef="nome">
            <th mat-header-cell *matHeaderCellDef>Nome</th>
            <td mat-cell *matCellDef="let produto">{{produto.nome}}</td>
          </ng-container>

          <ng-container matColumnDef="categoria">
            <th mat-header-cell *matHeaderCellDef>Categoria</th>
            <td mat-cell *matCellDef="let produto">
              <mat-chip color="primary" selected>{{produto.categoria}}</mat-chip>
            </td>
          </ng-container>

          <ng-container matColumnDef="preco">
            <th mat-header-cell *matHeaderCellDef>Preço</th>
            <td mat-cell *matCellDef="let produto">R$ {{produto.preco}}</td>
          </ng-container>

          <ng-container matColumnDef="estoque">
            <th mat-header-cell *matHeaderCellDef>Estoque</th>
            <td mat-cell *matCellDef="let produto">
              <span class="estoque-badge" [class.baixo]="produto.estoque < 10">
                {{produto.estoque}} unidades
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="acoes">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let produto">
              <button mat-icon-button color="primary" matTooltip="Editar">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" matTooltip="Excluir">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .search-container {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      align-items: center;
    }

    .search-field {
      flex: 1;
      max-width: 400px;
    }

    .add-button {
      height: 56px;
    }

    .produtos-table {
      width: 100%;
    }

    .estoque-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      background: #e8f5e8;
      color: #2e7d32;
    }

    .estoque-badge.baixo {
      background: #fff3e0;
      color: #f57c00;
    }

    mat-card {
      margin: 16px;
    }
  `]
})
export class ProdutosComponent {
  searchTerm = '';
  displayedColumns: string[] = ['id', 'nome', 'categoria', 'preco', 'estoque', 'acoes'];
  
  produtos = [
    { id: 1, nome: 'Notebook Dell', categoria: 'Eletrônicos', preco: 3500.00, estoque: 15 },
    { id: 2, nome: 'Mouse Wireless', categoria: 'Acessórios', preco: 89.90, estoque: 45 },
    { id: 3, nome: 'Teclado Mecânico', categoria: 'Acessórios', preco: 299.90, estoque: 8 },
    { id: 4, nome: 'Monitor 24"', categoria: 'Eletrônicos', preco: 899.90, estoque: 12 },
    { id: 5, nome: 'Webcam HD', categoria: 'Acessórios', preco: 159.90, estoque: 25 }
  ];
} 