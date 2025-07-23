import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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

import { <%= className %>Component } from './<%= fileName %>.component';

describe('<%= className %>Component', () => {
  let component: <%= className %>Component;
  let fixture: ComponentFixture<<%= className %>Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
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
        <%= className %>Component
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(<%= className %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchTerm).toBe('');
    expect(component.displayedColumns).toEqual(['id', 'nome', 'status', 'acoes']);
    expect(component.totalItems).toBe(0);
    expect(component.pageSize).toBe(10);
  });

  it('should load data on init', () => {
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('<%= className %> component initialized');
    expect(component.totalItems).toBe(component.items.length);
  });

  it('should apply filters', () => {
    spyOn(console, 'log');
    component.filters = { nome: 'teste', status: 'ativo' };
    component.applyFilters();
    expect(console.log).toHaveBeenCalledWith('Aplicando filtros:', component.filters);
  });

  it('should clear filters', () => {
    spyOn(console, 'log');
    component.filters = { nome: 'teste', status: 'ativo' };
    component.searchTerm = 'teste';
    component.clearFilters();
    expect(component.filters).toEqual({});
    expect(component.searchTerm).toBe('');
    expect(console.log).toHaveBeenCalledWith('Filtros limpos');
  });

  it('should open create dialog', () => {
    spyOn(console, 'log');
    component.openCreateDialog();
    expect(console.log).toHaveBeenCalledWith('Abrindo dialog de criação');
  });

  it('should edit item', () => {
    spyOn(console, 'log');
    const item = { id: 1, nome: 'Teste', status: 'Ativo' };
    component.editItem(item);
    expect(console.log).toHaveBeenCalledWith('Editando item:', item);
  });

  it('should delete item', () => {
    spyOn(console, 'log');
    const item = { id: 1, nome: 'Teste', status: 'Ativo' };
    component.deleteItem(item);
    expect(console.log).toHaveBeenCalledWith('Excluindo item:', item);
  });

  it('should view item', () => {
    spyOn(console, 'log');
    const item = { id: 1, nome: 'Teste', status: 'Ativo' };
    component.viewItem(item);
    expect(console.log).toHaveBeenCalledWith('Visualizando item:', item);
  });
}); 