# Migração de Roteamento: React → Angular

Este guia detalha como migrar roteamento do React Router para Angular Router.

## 📋 Mapeamento de Conceitos

| React Router | Angular Router | Descrição |
|--------------|----------------|-----------|
| `BrowserRouter` | `RouterModule` | Configuração do roteador |
| `Route` | `Route` | Definição de rotas |
| `Link` | `routerLink` | Navegação declarativa |
| `useNavigate` | `Router` | Navegação programática |
| `useParams` | `ActivatedRoute` | Parâmetros de rota |
| `Outlet` | `router-outlet` | Renderização de rotas |
| `Navigate` | `routerLink` | Redirecionamento |

## 🔄 Migração Básica

### React Router (Original)
```typescript
// App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Angular Router (Migrado)
```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: '**', component: NotFoundComponent }
];
```

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/users">Users</a>
  <a routerLink="/products">Products</a>
</nav>

<router-outlet></router-outlet>
```

## 🔄 Navegação Programática

### React (Original)
```typescript
import { useNavigate, useParams } from 'react-router-dom';

function UserList() {
  const navigate = useNavigate();

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={() => navigate('/users/new')}>
        Add User
      </button>
      {users.map(user => (
        <div key={user.id} onClick={() => handleUserClick(user.id)}>
          {user.name}
        </div>
      ))}
    </div>
  );
}
```

### Angular (Migrado)
```typescript
// user-list.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  constructor(private router: Router) {}

  handleUserClick(userId: string) {
    this.router.navigate(['/users', userId]);
  }

  handleBack() {
    this.router.navigate(['../']);
  }

  addUser() {
    this.router.navigate(['/users/new']);
  }
}
```

```html
<!-- user-list.component.html -->
<div>
  <button (click)="addUser()">Add User</button>
  <div *ngFor="let user of users" (click)="handleUserClick(user.id)">
    {{ user.name }}
  </div>
</div>
```

## 🔄 Parâmetros de Rota

### React (Original)
```typescript
import { useParams, useSearchParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const tab = searchParams.get('tab') || 'info';

  const handleTabChange = (newTab: string) => {
    setSearchParams({ tab: newTab });
  };

  return (
    <div>
      <h1>User {id}</h1>
      <div>
        <button onClick={() => handleTabChange('info')}>Info</button>
        <button onClick={() => handleTabChange('posts')}>Posts</button>
      </div>
      {tab === 'info' && <UserInfo userId={id} />}
      {tab === 'posts' && <UserPosts userId={id} />}
    </div>
  );
}
```

### Angular (Migrado)
```typescript
// user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  tab: string = 'info';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.route.queryParams.subscribe(params => {
      this.tab = params['tab'] || 'info';
    });
  }

  handleTabChange(newTab: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: newTab }
    });
  }
}
```

```html
<!-- user-detail.component.html -->
<div>
  <h1>User {{ userId }}</h1>
  <div>
    <button (click)="handleTabChange('info')">Info</button>
    <button (click)="handleTabChange('posts')">Posts</button>
  </div>
  <app-user-info *ngIf="tab === 'info'" [userId]="userId"></app-user-info>
  <app-user-posts *ngIf="tab === 'posts'" [userId]="userId"></app-user-posts>
</div>
```

## 🔄 Lazy Loading

### React (Original)
```typescript
import { lazy, Suspense } from 'react';

const UserList = lazy(() => import('./UserList'));
const ProductList = lazy(() => import('./ProductList'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Angular (Migrado)
```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./user-list/user-list.component')
      .then(m => m.UserListComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./product-list/product-list.component')
      .then(m => m.ProductListComponent)
  }
];
```

## 🔄 Guards e Resolvers

### React (Original)
```typescript
// AuthGuard.tsx
import { Navigate, useLocation } from 'react-router-dom';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// App.tsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

### Angular (Migrado)
```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isAuthenticated()) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }

  private isAuthenticated(): boolean {
    // Implementar lógica de autenticação
    return false;
  }
}
```

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];
```

## 🔄 Nested Routes

### React (Original)
```typescript
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserLayout />}>
          <Route index element={<UserList />} />
          <Route path=":id" element={<UserDetail />} />
          <Route path="new" element={<UserForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function UserLayout() {
  return (
    <div>
      <nav>
        <Link to="/users">List</Link>
        <Link to="/users/new">Add</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

### Angular (Migrado)
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'users',
    component: UserLayoutComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: ':id', component: UserDetailComponent },
      { path: 'new', component: UserFormComponent }
    ]
  }
];
```

```html
<!-- user-layout.component.html -->
<div>
  <nav>
    <a routerLink="/users">List</a>
    <a routerLink="/users/new">Add</a>
  </nav>
  <router-outlet></router-outlet>
</div>
```

## 🔄 Query Parameters

### React (Original)
```typescript
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'name';

  const handleFilter = (newCategory: string) => {
    setSearchParams({ category: newCategory, sort });
  };

  const handleSort = (newSort: string) => {
    setSearchParams({ category, sort: newSort });
  };

  return (
    <div>
      <select value={category} onChange={(e) => handleFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      
      <select value={sort} onChange={(e) => handleSort(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
}
```

### Angular (Migrado)
```typescript
// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  category: string = 'all';
  sort: string = 'name';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || 'all';
      this.sort = params['sort'] || 'name';
    });
  }

  handleFilter(newCategory: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: newCategory, sort: this.sort }
    });
  }

  handleSort(newSort: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.category, sort: newSort }
    });
  }
}
```

```html
<!-- product-list.component.html -->
<div>
  <select [value]="category" (change)="handleFilter($event.target.value)">
    <option value="all">All</option>
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
  </select>
  
  <select [value]="sort" (change)="handleSort($event.target.value)">
    <option value="name">Name</option>
    <option value="price">Price</option>
  </select>
</div>
```

## 🎯 Padrões Recomendados

### 1. Use RouterModule.forRoot() na Configuração
```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

### 2. Use RouterLink para Navegação Declarativa
```html
<a routerLink="/users" routerLinkActive="active">Users</a>
```

### 3. Use Router para Navegação Programática
```typescript
constructor(private router: Router) {}

navigateToUser(id: string) {
  this.router.navigate(['/users', id]);
}
```

### 4. Use ActivatedRoute para Parâmetros
```typescript
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.params.subscribe(params => {
    this.userId = params['id'];
  });
}
```

### 5. Use Guards para Proteção de Rotas
```typescript
{ 
  path: 'admin', 
  component: AdminComponent,
  canActivate: [AuthGuard, AdminGuard]
}
```

## 📋 Checklist de Migração

### ✅ Configuração Básica
- [ ] Configurar RouterModule
- [ ] Definir rotas principais
- [ ] Configurar lazy loading
- [ ] Implementar guards necessários

### ✅ Navegação
- [ ] Migrar Links para routerLink
- [ ] Migrar useNavigate para Router
- [ ] Migrar useParams para ActivatedRoute
- [ ] Migrar query parameters

### ✅ Estrutura
- [ ] Migrar nested routes
- [ ] Configurar outlets
- [ ] Implementar resolvers
- [ ] Configurar redirects

### ✅ Funcionalidades Avançadas
- [ ] Implementar guards de autenticação
- [ ] Configurar lazy loading
- [ ] Migrar query parameters
- [ ] Implementar resolvers de dados

## 🤖 Prompts para IA

### GitHub Copilot
```bash
# Migrar roteamento React para Angular
Migre este roteamento React para Angular Router:

[cole o código React aqui]
```

### Cursor
```bash
# Converter configuração de rotas
Converta esta configuração de rotas React para Angular:

[cole o código React aqui]
```

---

**Lembre-se**: O roteamento é fundamental para a navegação da aplicação. Mantenha a estrutura de URLs consistente durante a migração. 