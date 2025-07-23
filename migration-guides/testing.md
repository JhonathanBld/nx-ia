# Migração de Testes: React → Angular

Este guia detalha como migrar testes do React Testing Library para Angular Testing Utilities.

## 📋 Mapeamento de Conceitos

| React Testing Library | Angular Testing Utilities | Descrição |
|----------------------|---------------------------|-----------|
| `render` | `TestBed.createComponent` | Renderização de componente |
| `screen` | `fixture.debugElement` | Acesso ao DOM |
| `getByText` | `debugElement.query` | Busca por texto |
| `getByRole` | `debugElement.query` | Busca por role |
| `fireEvent` | `triggerEventHandler` | Disparo de eventos |
| `waitFor` | `fixture.whenStable` | Aguardar operações assíncronas |
| `jest.fn()` | `jasmine.createSpy` | Criação de mocks |

## 🔄 Migração Básica

### React (Original)
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';

describe('UserList', () => {
  it('should render user list', () => {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    render(<UserList users={users} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should call onUserClick when user is clicked', () => {
    const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    const onUserClick = jest.fn();

    render(<UserList users={users} onUserClick={onUserClick} />);

    fireEvent.click(screen.getByText('John Doe'));

    expect(onUserClick).toHaveBeenCalledWith(1);
  });

  it('should show loading state', () => {
    render(<UserList users={[]} loading={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

### Angular (Migrado)
```typescript
// user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should render user list', () => {
    component.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('Jane Smith');
  });

  it('should call onUserClick when user is clicked', () => {
    component.users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    spyOn(component.userClick, 'emit');

    fixture.detectChanges();

    const userElement = fixture.debugElement.query(By.css('.user-item'));
    userElement.triggerEventHandler('click', null);

    expect(component.userClick.emit).toHaveBeenCalledWith(1);
  });

  it('should show loading state', () => {
    component.loading = true;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Loading...');
  });
});
```

## 🔄 Testes de Formulários

### React (Original)
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from './UserForm';

describe('UserForm', () => {
  it('should submit form with user data', async () => {
    const onSubmit = jest.fn();
    
    render(<UserForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      });
    });
  });

  it('should show validation errors', () => {
    render(<UserForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});
```

### Angular (Migrado)
```typescript
// user-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit form with user data', () => {
    spyOn(component.formSubmit, 'emit');

    component.userForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com'
    });

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.triggerEventHandler('click', null);

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    });
  });

  it('should show validation errors', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Name is required');
    expect(compiled.textContent).toContain('Email is required');
  });
});
```

## 🔄 Testes de Serviços

### React (Original)
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserList from './UserList';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserList', () => {
  it('should fetch and display users', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('should handle error', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Error loading users')).toBeInTheDocument();
    });
  });
});
```

### Angular (Migrado)
```typescript
// user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch and display users', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];

    component.ngOnInit();

    const req = httpMock.expectOne('/api/users');
    req.flush(mockUsers);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('Jane Smith');
  });

  it('should handle error', () => {
    component.ngOnInit();

    const req = httpMock.expectOne('/api/users');
    req.error(new ErrorEvent('Network error'));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Error loading users');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
```

## 🔄 Testes de Roteamento

### React (Original)
```typescript
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Routing', () => {
  it('should render home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to Home')).toBeInTheDocument();
  });

  it('should render user list page', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('User List')).toBeInTheDocument();
  });
});
```

### Angular (Migrado)
```typescript
// app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should render home page', () => {
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Welcome to Home');
  });

  it('should navigate to user list', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();

    const userLink = fixture.debugElement.query(By.css('a[routerLink="/users"]'));
    userLink.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });
});
```

## 🔄 Testes de Guards

### React (Original)
```typescript
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthGuard from './AuthGuard';

describe('AuthGuard', () => {
  it('should render children when authenticated', () => {
    const mockUseAuth = jest.fn().mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <AuthGuard useAuth={mockUseAuth}>
          <div>Protected Content</div>
        </AuthGuard>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect when not authenticated', () => {
    const mockUseAuth = jest.fn().mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter>
        <AuthGuard useAuth={mockUseAuth}>
          <div>Protected Content</div>
        </AuthGuard>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
```

### Angular (Migrado)
```typescript
// auth.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBe(true);
  });

  it('should redirect when not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
```

## 🔄 Testes de Eventos

### React (Original)
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  it('should increment count when button is clicked', () => {
    render(<Counter />);

    const button = screen.getByText('Increment');
    fireEvent.click(button);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('should handle input change', () => {
    render(<Counter />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(input).toHaveValue('Hello');
  });
});
```

### Angular (Migrado)
```typescript
// counter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increment count when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Count: 1');
  });

  it('should handle input change', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('input', { target: { value: 'Hello' } });

    fixture.detectChanges();

    expect(input.nativeElement.value).toBe('Hello');
  });
});
```

## 🎯 Padrões Recomendados

### 1. Use TestBed.configureTestingModule
```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [YourComponent],
    providers: [YourService]
  }).compileComponents();
});
```

### 2. Use ComponentFixture para Acesso ao DOM
```typescript
let fixture: ComponentFixture<YourComponent>;
let component: YourComponent;

beforeEach(() => {
  fixture = TestBed.createComponent(YourComponent);
  component = fixture.componentInstance;
});
```

### 3. Use spyOn para Mocks
```typescript
spyOn(component.someMethod, 'emit');
spyOn(service, 'getData').and.returnValue(of(mockData));
```

### 4. Use HttpTestingController para Testes de API
```typescript
let httpMock: HttpTestingController;

beforeEach(() => {
  httpMock = TestBed.inject(HttpTestingController);
});

afterEach(() => {
  httpMock.verify();
});
```

## 📋 Checklist de Migração

### ✅ Configuração Básica
- [ ] Configurar TestBed
- [ ] Migrar render para createComponent
- [ ] Configurar imports necessários
- [ ] Configurar providers

### ✅ Testes de Componentes
- [ ] Migrar screen.getByText para debugElement.query
- [ ] Migrar fireEvent para triggerEventHandler
- [ ] Migrar waitFor para fixture.whenStable
- [ ] Configurar detectChanges

### ✅ Testes de Serviços
- [ ] Configurar HttpTestingController
- [ ] Migrar mocks para spyOn
- [ ] Configurar providers de serviços
- [ ] Implementar verify de mocks

### ✅ Testes de Roteamento
- [ ] Configurar RouterTestingModule
- [ ] Migrar MemoryRouter para RouterTestingModule
- [ ] Configurar guards
- [ ] Testar navegação programática

## 🤖 Prompts para IA

### GitHub Copilot
```bash
# Migrar teste React para Angular
Migre este teste React para Angular Testing Utilities:

[cole o código React aqui]
```

### Cursor
```bash
# Converter teste de componente
Converta este teste de componente React para Angular:

[cole o código React aqui]
```

---

**Lembre-se**: Os testes Angular são mais estruturados e oferecem melhor integração com o framework. Use TestBed para configuração e ComponentFixture para acesso ao DOM. 