import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-<%= fileName %>',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    FormsModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>📋 <%= className %></mat-card-title>
        <mat-card-subtitle>Gerenciamento de <%= className %></mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="search-container">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>🔍 Buscar <%= fileName %></mat-label>
            <input matInput [(ngModel)]="searchTerm" placeholder="Digite para buscar...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          
          <button mat-raised-button color="primary" class="add-button">
            <mat-icon>add</mat-icon>
            Adicionar <%= className %>
          </button>
        </div>

        <table mat-table [dataSource]="items" class="items-table">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let item">{{item.id}}</td>
          </ng-container>

          <ng-container matColumnDef="nome">
            <th mat-header-cell *matHeaderCellDef>Nome</th>
            <td mat-cell *matCellDef="let item">{{item.nome}}</td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let item">{{item.email}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let item">
              <span class="status-badge" [class.active]="item.ativo">
                {{item.ativo ? 'Ativo' : 'Inativo'}}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="acoes">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let item">
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

    .items-table {
      width: 100%;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      background: #ffebee;
      color: #c62828;
    }

    .status-badge.active {
      background: #e8f5e8;
      color: #2e7d32;
    }

    mat-card {
      margin: 16px;
    }
  `]
})
export class <%= className %>Component implements OnInit {
  searchTerm = '';
  displayedColumns: string[] = ['id', 'nome', 'email', 'status', 'acoes'];
  
  items = [
    { id: 1, nome: 'Item 1', email: 'item1@exemplo.com', ativo: true },
    { id: 2, nome: 'Item 2', email: 'item2@exemplo.com', ativo: true },
    { id: 3, nome: 'Item 3', email: 'item3@exemplo.com', ativo: false }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('<%= className %> component initialized');
  }
} 