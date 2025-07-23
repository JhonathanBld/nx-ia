# Migração de Gerenciamento de Estado: React → Angular

Este guia detalha como migrar diferentes abordagens de gerenciamento de estado do React para Angular.

## 📋 Mapeamento de Conceitos

| React | Angular | Descrição |
|-------|---------|-----------|
| `useState` | `BehaviorSubject` | Estado reativo simples |
| `useReducer` | `BehaviorSubject` + métodos | Estado complexo |
| `useContext` | `Service` + `BehaviorSubject` | Estado global |
| Redux | NgRx | Estado global complexo |
| Zustand | `Service` + `BehaviorSubject` | Estado global simples |

## 🔄 Migração de useState

### React (Original)
```typescript
import React, { useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Angular (Migrado)
```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  private usersSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  users$ = this.usersSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  async fetchUsers() {
    this.loadingSubject.next(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      this.usersSubject.next(data);
    } catch (err: any) {
      this.errorSubject.next(err.message);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  ngOnInit() {
    this.fetchUsers();
  }
}
```

```html
<!-- user-list.component.html -->
<div>
  <p *ngIf="loading$ | async">Carregando...</p>
  <p *ngIf="error$ | async as error">Erro: {{ error }}</p>
  <div *ngFor="let user of users$ | async">
    {{ user.name }}
  </div>
</div>
```

## 🔄 Migração de useReducer

### React (Original)
```typescript
import React, { useReducer } from 'react';

const initialState = {
  users: [],
  loading: false,
  error: null
};

function userReducer(state, action) {
  switch (action.type) {
    case 'FETCH_USERS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, users: action.payload, loading: false };
    case 'FETCH_USERS_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

function UserList() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    dispatch({ type: 'FETCH_USERS_START' });
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_USERS_ERROR', payload: err.message });
    }
  };

  return (
    <div>
      {state.loading && <p>Carregando...</p>}
      {state.error && <p>Erro: {state.error}</p>}
      {state.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Angular (Migrado)
```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  private stateSubject = new BehaviorSubject<UserState>({
    users: [],
    loading: false,
    error: null
  });

  state$ = this.stateSubject.asObservable();

  private updateState(updates: Partial<UserState>) {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...updates
    });
  }

  async fetchUsers() {
    this.updateState({ loading: true, error: null });
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      this.updateState({ users: data, loading: false });
    } catch (err: any) {
      this.updateState({ error: err.message, loading: false });
    }
  }

  ngOnInit() {
    this.fetchUsers();
  }
}
```

```html
<!-- user-list.component.html -->
<div>
  <p *ngIf="(state$ | async)?.loading">Carregando...</p>
  <p *ngIf="(state$ | async)?.error as error">Erro: {{ error }}</p>
  <div *ngFor="let user of (state$ | async)?.users">
    {{ user.name }}
  </div>
</div>
```

## 🔄 Migração de useContext

### React (Original)
```typescript
// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const removeUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider value={{
      users,
      loading,
      addUser,
      removeUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}
```

### Angular (Migrado)
```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  users$ = this.usersSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  addUser(user: any) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }

  removeUser(id: string) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next(currentUsers.filter(user => user.id !== id));
  }
}
```

```typescript
// user-list.component.ts
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  constructor(private userService: UserService) {}

  get users$() {
    return this.userService.users$;
  }

  get loading$() {
    return this.userService.loading$;
  }

  addUser(user: any) {
    this.userService.addUser(user);
  }

  removeUser(id: string) {
    this.userService.removeUser(id);
  }
}
```

## 🔄 Migração de Redux para NgRx

### React + Redux (Original)
```typescript
// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersError } = userSlice.actions;
export default userSlice.reducer;
```

### Angular + NgRx (Migrado)
```typescript
// user.actions.ts
import { createAction, props } from '@ngrx/store';

export const fetchUsers = createAction('[User] Fetch Users');
export const fetchUsersSuccess = createAction(
  '[User] Fetch Users Success',
  props<{ users: any[] }>()
);
export const fetchUsersError = createAction(
  '[User] Fetch Users Error',
  props<{ error: string }>()
);
```

```typescript
// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.fetchUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.fetchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(UserActions.fetchUsersError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
```

```typescript
// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUsers),
      mergeMap(() => fetch('/api/users')
        .then(response => response.json())
        .then(users => UserActions.fetchUsersSuccess({ users }))
        .catch(error => UserActions.fetchUsersError({ error: error.message }))
      )
    )
  );

  constructor(private actions$: Actions) {}
}
```

## 🔄 Migração de Zustand

### React + Zustand (Original)
```typescript
// userStore.ts
import create from 'zustand';

interface UserStore {
  users: any[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (user: any) => void;
  removeUser: (id: string) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  addUser: (user) => {
    set({ users: [...get().users, user] });
  },
  removeUser: (id) => {
    set({ users: get().users.filter(user => user.id !== id) });
  }
}));
```

### Angular (Migrado)
```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface UserState {
  users: any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private stateSubject = new BehaviorSubject<UserState>({
    users: [],
    loading: false
  });

  state$ = this.stateSubject.asObservable();

  private updateState(updates: Partial<UserState>) {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...updates
    });
  }

  async fetchUsers() {
    this.updateState({ loading: true });
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      this.updateState({ users, loading: false });
    } catch (error) {
      this.updateState({ loading: false });
    }
  }

  addUser(user: any) {
    const currentState = this.stateSubject.value;
    this.updateState({
      users: [...currentState.users, user]
    });
  }

  removeUser(id: string) {
    const currentState = this.stateSubject.value;
    this.updateState({
      users: currentState.users.filter(user => user.id !== id)
    });
  }
}
```

## 🎯 Padrões Recomendados

### 1. Use BehaviorSubject para Estado Local
```typescript
// Para estado simples
private dataSubject = new BehaviorSubject<any[]>([]);
data$ = this.dataSubject.asObservable();
```

### 2. Use Services para Estado Global
```typescript
@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  private stateSubject = new BehaviorSubject<AppState>(initialState);
  state$ = this.stateSubject.asObservable();
}
```

### 3. Use NgRx para Aplicações Complexas
```typescript
// Para aplicações com múltiplos estados e side effects
export const appReducer = combineReducers({
  users: userReducer,
  products: productReducer
});
```

### 4. Use Signals (Angular 16+)
```typescript
// Para estado reativo moderno
export class UserComponent {
  users = signal<any[]>([]);
  loading = signal(false);

  async fetchUsers() {
    this.loading.set(true);
    const users = await this.userService.getUsers();
    this.users.set(users);
    this.loading.set(false);
  }
}
```

## 📋 Checklist de Migração

### ✅ useState → BehaviorSubject
- [ ] Criar BehaviorSubject para cada estado
- [ ] Expor Observable para template
- [ ] Migrar setters para .next()
- [ ] Atualizar template para usar async pipe

### ✅ useReducer → BehaviorSubject + métodos
- [ ] Criar interface para estado
- [ ] Implementar métodos de atualização
- [ ] Migrar actions para métodos
- [ ] Atualizar template

### ✅ useContext → Service
- [ ] Criar service com BehaviorSubject
- [ ] Injetar service nos componentes
- [ ] Migrar providers para root
- [ ] Atualizar injeção de dependência

### ✅ Redux → NgRx
- [ ] Configurar NgRx store
- [ ] Criar actions, reducers, effects
- [ ] Migrar selectors
- [ ] Atualizar componentes

### ✅ Zustand → Service
- [ ] Criar service com estado global
- [ ] Migrar métodos de atualização
- [ ] Injetar service onde necessário
- [ ] Atualizar templates

## 🤖 Prompts para IA

### GitHub Copilot
```bash
# Migrar useState para BehaviorSubject
Migre este useState para BehaviorSubject seguindo o padrão Angular:

[cole o código React aqui]
```

### Cursor
```bash
# Converter gerenciamento de estado
Converta este gerenciamento de estado React para Angular:

[cole o código React aqui]
```

---

**Lembre-se**: A migração de estado é um dos aspectos mais importantes. Mantenha a reatividade e performance durante a migração. 