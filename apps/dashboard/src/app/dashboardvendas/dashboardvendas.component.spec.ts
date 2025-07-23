import { ComponentFixture, TestBed } from '@angular/core/testing';
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

import { DashboardvendasComponent } from './dashboardvendas.component';

describe('DashboardvendasComponent', () => {
  let component: DashboardvendasComponent;
  let fixture: ComponentFixture<DashboardvendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        ReactiveFormsModule,
        DashboardvendasComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardvendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dashboard data', () => {
    expect(component.displayedColumns).toEqual(['id', 'cliente', 'produto', 'valor', 'data', 'status', 'acoes']);
    expect(component.items.length).toBeGreaterThan(0);
    expect(component.totalItems).toBe(component.items.length);
  });

  it('should have correct filters structure', () => {
    expect(component.filters).toHaveProperty('periodo');
    expect(component.filters).toHaveProperty('categoria');
    expect(component.filters).toHaveProperty('vendedor');
    expect(component.filters).toHaveProperty('status');
  });

  it('should load data on init', () => {
    component.ngOnInit();
    expect(component.totalItems).toBe(component.items.length);
  });

  it('should apply filters', () => {
    component.filters = { periodo: '2024-01', categoria: 'eletronicos', vendedor: 'João', status: 'ativo' };
    component.applyFilters();
    expect(component.filters.periodo).toBe('2024-01');
  });

  it('should clear filters', () => {
    component.filters = { periodo: '2024-01', categoria: 'eletronicos', vendedor: 'João', status: 'ativo' };
    component.searchTerm = 'teste';
    component.clearFilters();
    expect(component.filters).toEqual({ periodo: '', categoria: '', vendedor: '', status: '' });
    expect(component.searchTerm).toBe('');
  });

  it('should handle item actions', () => {
    const item = { id: 1, cliente: 'João Silva', produto: 'iPhone 13', valor: 'R$ 5.999', data: '2024-01-15', status: 'Ativo' };
    
    expect(() => component.viewItem(item)).not.toThrow();
    expect(() => component.editItem(item)).not.toThrow();
    expect(() => component.deleteItem(item)).not.toThrow();
  });

  it('should display dashboard header', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.dashboard-header h1').textContent).toContain('📊 Dashboard de Vendas');
  });

  it('should display metrics cards', () => {
    const compiled = fixture.nativeElement;
    const metricCards = compiled.querySelectorAll('.metric-card');
    expect(metricCards.length).toBe(4); // 4 cards de métricas
  });

  it('should display charts section', () => {
    const compiled = fixture.nativeElement;
    const chartCards = compiled.querySelectorAll('.chart-card');
    expect(chartCards.length).toBe(2); // 2 gráficos
  });

  it('should display data table', () => {
    const compiled = fixture.nativeElement;
    const table = compiled.querySelector('.data-table');
    expect(table).toBeTruthy();
  });
}); 