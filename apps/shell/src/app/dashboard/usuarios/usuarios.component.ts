import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>👥 Gerenciamento de Usuários</mat-card-title>
        <mat-card-subtitle>Dashboard MFE - Módulo de Usuários</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="search-container">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>🔍 Buscar usuários</mat-label>
            <input matInput [(ngModel)]="searchTerm" placeholder="Digite para buscar...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          
          <button mat-raised-button color="primary" class="add-button">
            <mat-icon>add</mat-icon>
            Adicionar Usuário
          </button>
        </div>

        <table mat-table [dataSource]="usuarios" class="usuarios-table">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let usuario">{{usuario.id}}</td>
          </ng-container>

          <ng-container matColumnDef="nome">
            <th mat-header-cell *matHeaderCellDef>Nome</th>
            <td mat-cell *matCellDef="let usuario">{{usuario.nome}}</td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let usuario">{{usuario.email}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let usuario">
              <span class="status-badge" [class.active]="usuario.ativo">
                {{usuario.ativo ? 'Ativo' : 'Inativo'}}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="acoes">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let usuario">
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

    .usuarios-table {
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
export class UsuariosComponent {
  searchTerm = '';
  displayedColumns: string[] = ['id', 'nome', 'email', 'status', 'acoes'];
  
  usuarios = [
    { id: 1, nome: 'João Silva', email: 'joao@exemplo.com', ativo: true },
    { id: 2, nome: 'Maria Santos', email: 'maria@exemplo.com', ativo: true },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@exemplo.com', ativo: false },
    { id: 4, nome: 'Ana Oliveira', email: 'ana@exemplo.com', ativo: true },
    { id: 5, nome: 'Carlos Lima', email: 'carlos@exemplo.com', ativo: false }
  ];
} 