import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { <%= className %>Component } from './<%= fileName %>.component';

/**
 * Testes unitários para <%= className %>Component
 * 
 * Este arquivo foi gerado automaticamente pelo generator 'generate-screen'
 * e contém testes básicos para validar o funcionamento do componente.
 * 
 * DICAS PARA MIGRAÇÃO REACT -> ANGULAR:
 * - Jest -> Jasmine/Karma
 * - render() -> TestBed.createComponent()
 * - screen.getByText() -> fixture.debugElement.query()
 * - fireEvent -> triggerEventHandler
 * - waitFor -> fakeAsync + tick
 */
describe('<%= className %>Component', () => {
  let component: <%= className %>Component;
  let fixture: ComponentFixture<<%= className %>Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ <%= className %>Component ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(<%= className %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    // Simula dados carregados
    component.loadData();
    
    // Aguarda o setTimeout
    setTimeout(() => {
      expect(component.items.length).toBeGreaterThan(0);
      expect(component.loading).toBeFalse();
    }, 1100);
  });

  it('should filter data when search term changes', () => {
    // Setup dados iniciais
    component.items = [
      { id: 1, nome: 'João Silva', email: 'joao@exemplo.com' },
      { id: 2, nome: 'Maria Santos', email: 'maria@exemplo.com' }
    ];
    component.filteredItems = [...component.items];

    // Testa filtro por nome
    component.searchTerm = 'João';
    component.filterData();
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].nome).toBe('João Silva');

    // Testa filtro por email
    component.searchTerm = 'maria@exemplo.com';
    component.filterData();
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].email).toBe('maria@exemplo.com');

    // Testa filtro vazio
    component.searchTerm = '';
    component.filterData();
    expect(component.filteredItems.length).toBe(2);
  });

  it('should add new item when handleAdd is called', () => {
    const initialLength = component.items.length;
    component.handleAdd();
    
    expect(component.items.length).toBe(initialLength + 1);
    expect(component.items[component.items.length - 1].nome).toBe('Novo Item');
  });

  it('should delete item when handleDelete is called', () => {
    component.items = [
      { id: 1, nome: 'João Silva', email: 'joao@exemplo.com' },
      { id: 2, nome: 'Maria Santos', email: 'maria@exemplo.com' }
    ];
    component.filteredItems = [...component.items];

    component.handleDelete(1);
    
    expect(component.items.length).toBe(1);
    expect(component.items[0].id).toBe(2);
  });

  it('should handle search input changes', () => {
    const mockEvent = { target: { value: 'test' } };
    spyOn(component, 'filterData');
    
    component.onSearchChange(mockEvent);
    
    expect(component.searchTerm).toBe('test');
    expect(component.filterData).toHaveBeenCalled();
  });
}); 