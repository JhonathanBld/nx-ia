import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-telasimples',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
  ],
  templateUrl: './telasimples.component.html',
  styleUrls: ['./telasimples.component.scss'],
})
export class TelasimplesComponent implements OnInit {
  searchTerm = '';
  displayedColumns: string[] = ['id', 'nome', 'status', 'acoes'];

  filters: any = {
    nome: '',
    status: '',
  };

  items: any[] = [
    { id: 1, nome: 'Item 1', status: 'Ativo' },
    { id: 2, nome: 'Item 2', status: 'Inativo' },
    { id: 3, nome: 'Item 3', status: 'Ativo' },
  ];

  totalItems = 0;
  pageSize = 10;

  ngOnInit(): void {
    console.log('Telasimples component initialized');
    this.loadData();
  }

  loadData() {
    console.log('Carregando dados...');
    this.totalItems = this.items.length;
  }

  applyFilters() {
    console.log('Aplicando filtros:', this.filters);
  }

  clearFilters() {
    this.filters = {};
    this.searchTerm = '';
    console.log('Filtros limpos');
  }

  openCreateDialog() {
    console.log('Abrindo dialog de criação');
  }

  editItem(item: any) {
    console.log('Editando item:', item);
  }

  deleteItem(item: any) {
    console.log('Excluindo item:', item);
  }

  viewItem(item: any) {
    console.log('Visualizando item:', item);
  }
}
