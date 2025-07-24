import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teste-simples',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTabsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './teste-simples.component.html',
  styleUrls: ['./teste-simples.component.scss']
})
export class TesteSimplesComponent implements OnInit {
  searchTerm = '';
  displayedColumns: string[] = ['id', 'nome', 'status', 'acoes'];

  filters: any = {
    nome: '',
    status: ''
  };

  items: any[] = [
    { id: 1, nome: 'Item 1', status: 'Ativo' },
    { id: 2, nome: 'Item 2', status: 'Inativo' },
    { id: 3, nome: 'Item 3', status: 'Ativo' }
  ];

  totalItems = 0;
  pageSize = 10;

  ngOnInit(): void {
    console.log('TesteSimples component initialized');
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