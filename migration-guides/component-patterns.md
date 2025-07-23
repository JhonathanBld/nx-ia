# Padrões de Componentes: React → Angular

Este guia detalha como converter componentes React para Angular, seguindo os padrões estabelecidos pelo generator `generate-screen`.

## 🔄 Mapeamento Básico

| React | Angular | Exemplo |
|-------|---------|---------|
| `function Component()` | `@Component()` | `export class UsuariosComponent` |
| `useState()` | `BehaviorSubject` | `private items$ = new BehaviorSubject([])` |
| `useEffect()` | `ngOnInit()` | `ngOnInit(): void { }` |
| `props` | `@Input()` | `@Input() title: string` |
| `onClick` | `(click)` | `(click)="handleClick()"` |
| `className` | `class` | `class="container"` |
| `{condition && <div>}` | `*ngIf` | `*ngIf="condition"` |
| `{items.map()}` | `*ngFor` | `*ngFor="let item of items"` |

## 📦 Estrutura de Componentes

### React (Antes)
```jsx
import React, { useState, useEffect } from 'react';

function UsuariosList({ title, onUserSelect }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="usuarios-container">
      <h1>{title}</h1>
      <input
        type="text"
        placeholder="Buscar usuários..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} onClick={() => onUserSelect(user)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsuariosList;
```

### Angular (Depois)
```typescript
// usuarios.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @Input() title: string = '';
  @Output() userSelect = new EventEmitter<any>();

  private users$ = new BehaviorSubject<any[]>([]);
  private loading$ = new BehaviorSubject<boolean>(false);
  private searchTerm$ = new BehaviorSubject<string>('');

  get users() { return this.users$.value; }
  get loading() { return this.loading$.value; }
  get searchTerm() { return this.searchTerm$.value; }
  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  constructor() { }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.loading$.next(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      this.users$.next(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      this.loading$.next(false);
    }
  }

  onSearchChange(event: any): void {
    this.searchTerm$.next(event.target.value);
  }

  onUserSelect(user: any): void {
    this.userSelect.emit(user);
  }
}
```

```html
<!-- usuarios.component.html -->
<div class="usuarios-container">
  <h1>{{ title }}</h1>
  
  <input
    type="text"
    placeholder="Buscar usuários..."
    [value]="searchTerm"
    (input)="onSearchChange($event)"
  />
  
  <div *ngIf="loading" class="loading">
    Carregando...
  </div>
  
  <table *ngIf="!loading">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr 
        *ngFor="let user of filteredUsers; trackBy: trackByFn"
        (click)="onUserSelect(user)"
      >
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 🎯 Lifecycle Hooks

### React → Angular

| React | Angular | Descrição |
|-------|---------|-----------|
| `useEffect(() => {}, [])` | `ngOnInit()` | Inicialização do componente |
| `useEffect(() => {}, [dep])` | `ngOnChanges()` | Reação a mudanças de inputs |
| `useEffect(() => { return cleanup }, [])` | `ngOnDestroy()` | Limpeza ao destruir |
| `useEffect(() => {}, [dep])` | `ngDoCheck()` | Detecção de mudanças customizada |

### Exemplo de Lifecycle

```typescript
// React
function MyComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    // Inicialização
    loadUser(userId);
    
    // Cleanup
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [userId]);

  useEffect(() => {
    // Reação a mudanças
    if (user) {
      const sub = userService.subscribe(user.id);
      setSubscription(sub);
    }
  }, [user]);

  return <div>{user?.name}</div>;
}
```

```typescript
// Angular
@Component({
  selector: 'app-my-component',
  template: '<div>{{ user?.name }}</div>'
})
export class MyComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userId: string = '';
  
  private user: any = null;
  private subscription: any = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Inicialização
    this.loadUser(this.userId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reação a mudanças de inputs
    if (changes['userId'] && !changes['userId'].firstChange) {
      this.loadUser(this.userId);
    }
  }

  ngOnDestroy(): void {
    // Cleanup
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadUser(id: string): void {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
      this.setupSubscription(user);
    });
  }

  private setupSubscription(user: any): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.userService.subscribe(user.id);
  }
}
```

## 🔄 Gerenciamento de Estado

### useState → BehaviorSubject

```typescript
// React
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Angular
private users$ = new BehaviorSubject<any[]>([]);
private loading$ = new BehaviorSubject<boolean>(false);
private error$ = new BehaviorSubject<string | null>(null);

// Getters para facilitar acesso
get users() { return this.users$.value; }
get loading() { return this.loading$.value; }
get error() { return this.error$.value; }

// Setters
setUsers(users: any[]) { this.users$.next(users); }
setLoading(loading: boolean) { this.loading$.next(loading); }
setError(error: string | null) { this.error$.next(error); }
```

### Context API → Services

```typescript
// React Context
const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  
  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}

// Angular Service
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users$ = new BehaviorSubject<any[]>([]);
  
  get users() { return this.users$.value; }
  get usersObservable() { return this.users$.asObservable(); }
  
  setUsers(users: any[]) {
    this.users$.next(users);
  }
  
  addUser(user: any) {
    const currentUsers = this.users;
    this.users$.next([...currentUsers, user]);
  }
}
```

## 🎨 Templates vs JSX

### Conditional Rendering

```jsx
// React
{isLoading && <div>Loading...</div>}
{user && <UserProfile user={user} />}
{error ? <ErrorMessage error={error} /> : <SuccessMessage />}
```

```html
<!-- Angular -->
<div *ngIf="isLoading">Loading...</div>
<app-user-profile *ngIf="user" [user]="user"></app-user-profile>
<app-error-message *ngIf="error; else success" [error]="error"></app-error-message>
<ng-template #success>
  <app-success-message></app-success-message>
</ng-template>
```

### Loops

```jsx
// React
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}
```

```html
<!-- Angular -->
<app-user-card 
  *ngFor="let user of users; trackBy: trackByFn" 
  [user]="user"
></app-user-card>
```

```typescript
// Função trackBy para performance
trackByFn(index: number, item: any): any {
  return item.id;
}
```

### Event Handling

```jsx
// React
<button onClick={handleClick}>Click me</button>
<input onChange={handleChange} value={value} />
<form onSubmit={handleSubmit}>
```

```html
<!-- Angular -->
<button (click)="handleClick()">Click me</button>
<input (input)="handleChange($event)" [value]="value" />
<form (ngSubmit)="handleSubmit()">
```

### Two-way Binding

```jsx
// React
<input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>
```

```html
<!-- Angular -->
<input [(ngModel)]="value" />
<!-- ou -->
<input [value]="value" (input)="value = $event.target.value" />
```

## 🧪 Testes

### React Testing Library → Angular Testing Utilities

```typescript
// React
import { render, screen, fireEvent } from '@testing-library/react';
import UsuariosList from './UsuariosList';

test('should render user list', () => {
  render(<UsuariosList title="Users" />);
  expect(screen.getByText('Users')).toBeInTheDocument();
});

test('should handle search', () => {
  render(<UsuariosList title="Users" />);
  const input = screen.getByPlaceholderText('Buscar usuários...');
  fireEvent.change(input, { target: { value: 'John' } });
  expect(input.value).toBe('John');
});
```

```typescript
// Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render user list', () => {
    component.title = 'Users';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Users');
  });

  it('should handle search', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'John';
    input.dispatchEvent(new Event('input'));
    expect(component.searchTerm).toBe('John');
  });
});
```

## 🤖 Prompts para IA

### GitHub Copilot
```
Converta este componente React para Angular seguindo o padrão do generator generate-screen:

[cole o código React aqui]

Inclua:
- BehaviorSubject para estado
- OnInit para lifecycle
- Template HTML separado
- EventEmitter para outputs
- Getters para acesso ao estado
```

### Cursor
```
Transforme este JSX em template Angular:

[cole o JSX aqui]

Use:
- *ngIf para conditional rendering
- *ngFor para loops
- (click) para event handlers
- {{ }} para interpolation
- [property] para property binding
```

## 📋 Checklist de Conversão

### ✅ Estrutura
- [ ] Converter função para classe
- [ ] Adicionar decorator `@Component`
- [ ] Separar template em arquivo HTML
- [ ] Criar arquivo de estilos SCSS
- [ ] Configurar seletor

### ✅ Estado
- [ ] Substituir `useState` por `BehaviorSubject`
- [ ] Criar getters para acesso ao estado
- [ ] Implementar setters quando necessário
- [ ] Usar `Observable` para reatividade

### ✅ Lifecycle
- [ ] Implementar `OnInit` para inicialização
- [ ] Usar `OnChanges` para reação a inputs
- [ ] Implementar `OnDestroy` para cleanup
- [ ] Configurar `OnPush` strategy se necessário

### ✅ Templates
- [ ] Converter JSX para HTML
- [ ] Substituir `className` por `class`
- [ ] Converter event handlers
- [ ] Implementar conditional rendering
- [ ] Configurar loops com `*ngFor`

### ✅ Inputs/Outputs
- [ ] Converter props para `@Input()`
- [ ] Converter callbacks para `@Output()`
- [ ] Usar `EventEmitter` para outputs
- [ ] Configurar tipos TypeScript

### ✅ Testes
- [ ] Converter testes Jest para Jasmine
- [ ] Usar `ComponentFixture` para testes
- [ ] Configurar `TestBed` adequadamente
- [ ] Implementar mocks e spies

---

**Dica**: Use o generator `generate-screen` como base para entender os padrões estabelecidos e siga a estrutura gerada automaticamente. 