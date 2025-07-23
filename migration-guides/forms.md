# Migração de Formulários: React → Angular

Este guia detalha como migrar formulários do React para Angular Reactive Forms.

## 📋 Mapeamento de Conceitos

| React | Angular | Descrição |
|-------|---------|-----------|
| `useState` | `FormControl` | Controle de campo individual |
| `useState` | `FormGroup` | Grupo de campos |
| `useState` | `FormArray` | Array de campos |
| `onChange` | `valueChanges` | Mudanças de valor |
| `onSubmit` | `(ngSubmit)` | Submissão do formulário |
| `value` | `formControlName` | Binding de valor |
| `checked` | `formControlName` | Binding de checkbox |

## 🔄 Migração Básica

### React (Original)
```typescript
import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    active: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
          Active
        </label>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Angular (Migrado)
```typescript
// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.min(0)],
      active: [false]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    }
  }
}
```

```html
<!-- user-form.component.html -->
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <div>
    <label>Name:</label>
    <input
      type="text"
      formControlName="name"
    />
    <div *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">
      Name is required
    </div>
  </div>
  
  <div>
    <label>Email:</label>
    <input
      type="email"
      formControlName="email"
    />
    <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
      Valid email is required
    </div>
  </div>
  
  <div>
    <label>Age:</label>
    <input
      type="number"
      formControlName="age"
    />
    <div *ngIf="userForm.get('age')?.invalid && userForm.get('age')?.touched">
      Age must be positive
    </div>
  </div>
  
  <div>
    <label>
      <input
        type="checkbox"
        formControlName="active"
      />
      Active
    </label>
  </div>
  
  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

## 🔄 Validação de Formulários

### React (Original)
```typescript
import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
      </div>
      
      <div>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Angular (Migrado)
```typescript
// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    }
    
    if (control?.hasError('email')) {
      return 'Email is invalid';
    }
    
    if (control?.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    
    return '';
  }
}
```

```html
<!-- user-form.component.html -->
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <div>
    <input
      type="text"
      formControlName="name"
      placeholder="Name"
    />
    <span *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">
      {{ getErrorMessage('name') }}
    </span>
  </div>
  
  <div>
    <input
      type="email"
      formControlName="email"
      placeholder="Email"
    />
    <span *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
      {{ getErrorMessage('email') }}
    </span>
  </div>
  
  <div>
    <input
      type="password"
      formControlName="password"
      placeholder="Password"
    />
  </div>
  
  <div>
    <input
      type="password"
      formControlName="confirmPassword"
      placeholder="Confirm Password"
    />
    <span *ngIf="userForm.hasError('passwordMismatch')">
      {{ getErrorMessage('confirmPassword') }}
    </span>
  </div>
  
  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

## 🔄 Formulários Dinâmicos

### React (Original)
```typescript
import React, { useState } from 'react';

function DynamicForm() {
  const [fields, setFields] = useState([
    { id: 1, name: '', value: '' }
  ]);

  const addField = () => {
    setFields([...fields, { id: Date.now(), name: '', value: '' }]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateField = (id, field, value) => {
    setFields(fields.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', fields);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.id}>
          <input
            type="text"
            value={field.name}
            onChange={(e) => updateField(field.id, 'name', e.target.value)}
            placeholder="Field name"
          />
          <input
            type="text"
            value={field.value}
            onChange={(e) => updateField(field.id, 'value', e.target.value)}
            placeholder="Field value"
          />
          <button type="button" onClick={() => removeField(field.id)}>
            Remove
          </button>
        </div>
      ))}
      
      <button type="button" onClick={addField}>Add Field</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Angular (Migrado)
```typescript
// dynamic-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent {
  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({
      fields: this.fb.array([
        this.fb.group({
          name: [''],
          value: ['']
        })
      ])
    });
  }

  get fields() {
    return this.dynamicForm.get('fields') as FormArray;
  }

  addField() {
    this.fields.push(this.fb.group({
      name: [''],
      value: ['']
    }));
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  onSubmit() {
    console.log('Form submitted:', this.dynamicForm.value);
  }
}
```

```html
<!-- dynamic-form.component.html -->
<form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()">
  <div formArrayName="fields">
    <div *ngFor="let field of fields.controls; let i = index" [formGroupName]="i">
      <input
        type="text"
        formControlName="name"
        placeholder="Field name"
      />
      <input
        type="text"
        formControlName="value"
        placeholder="Field value"
      />
      <button type="button" (click)="removeField(i)">Remove</button>
    </div>
  </div>
  
  <button type="button" (click)="addField()">Add Field</button>
  <button type="submit">Submit</button>
</form>
```

## 🔄 Formulários com Arrays

### React (Original)
```typescript
import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phones: [''],
    addresses: [{ street: '', city: '', zip: '' }]
  });

  const addPhone = () => {
    setFormData({
      ...formData,
      phones: [...formData.phones, '']
    });
  };

  const removePhone = (index) => {
    setFormData({
      ...formData,
      phones: formData.phones.filter((_, i) => i !== index)
    });
  };

  const updatePhone = (index, value) => {
    const newPhones = [...formData.phones];
    newPhones[index] = value;
    setFormData({
      ...formData,
      phones: newPhones
    });
  };

  const addAddress = () => {
    setFormData({
      ...formData,
      addresses: [...formData.addresses, { street: '', city: '', zip: '' }]
    });
  };

  const updateAddress = (index, field, value) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setFormData({
      ...formData,
      addresses: newAddresses
    });
  };

  return (
    <form>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Name"
      />
      
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
      />
      
      <div>
        <h3>Phones</h3>
        {formData.phones.map((phone, index) => (
          <div key={index}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => updatePhone(index, e.target.value)}
              placeholder="Phone"
            />
            <button type="button" onClick={() => removePhone(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addPhone}>Add Phone</button>
      </div>
      
      <div>
        <h3>Addresses</h3>
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <input
              type="text"
              value={address.street}
              onChange={(e) => updateAddress(index, 'street', e.target.value)}
              placeholder="Street"
            />
            <input
              type="text"
              value={address.city}
              onChange={(e) => updateAddress(index, 'city', e.target.value)}
              placeholder="City"
            />
            <input
              type="text"
              value={address.zip}
              onChange={(e) => updateAddress(index, 'zip', e.target.value)}
              placeholder="ZIP"
            />
          </div>
        ))}
        <button type="button" onClick={addAddress}>Add Address</button>
      </div>
    </form>
  );
}
```

### Angular (Migrado)
```typescript
// user-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      phones: this.fb.array(['']),
      addresses: this.fb.array([
        this.fb.group({
          street: [''],
          city: [''],
          zip: ['']
        })
      ])
    });
  }

  get phones() {
    return this.userForm.get('phones') as FormArray;
  }

  get addresses() {
    return this.userForm.get('addresses') as FormArray;
  }

  addPhone() {
    this.phones.push(this.fb.control(''));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  addAddress() {
    this.addresses.push(this.fb.group({
      street: [''],
      city: [''],
      zip: ['']
    }));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }
}
```

```html
<!-- user-form.component.html -->
<form [formGroup]="userForm">
  <input
    type="text"
    formControlName="name"
    placeholder="Name"
  />
  
  <input
    type="email"
    formControlName="email"
    placeholder="Email"
  />
  
  <div>
    <h3>Phones</h3>
    <div formArrayName="phones">
      <div *ngFor="let phone of phones.controls; let i = index">
        <input
          type="tel"
          [formControlName]="i"
          placeholder="Phone"
        />
        <button type="button" (click)="removePhone(i)">Remove</button>
      </div>
    </div>
    <button type="button" (click)="addPhone()">Add Phone</button>
  </div>
  
  <div>
    <h3>Addresses</h3>
    <div formArrayName="addresses">
      <div *ngFor="let address of addresses.controls; let i = index" [formGroupName]="i">
        <input
          type="text"
          formControlName="street"
          placeholder="Street"
        />
        <input
          type="text"
          formControlName="city"
          placeholder="City"
        />
        <input
          type="text"
          formControlName="zip"
          placeholder="ZIP"
        />
        <button type="button" (click)="removeAddress(i)">Remove</button>
      </div>
    </div>
    <button type="button" (click)="addAddress()">Add Address</button>
  </div>
</form>
```

## 🎯 Padrões Recomendados

### 1. Use FormBuilder para Criação de Formulários
```typescript
constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
}
```

### 2. Use Validators para Validação
```typescript
import { Validators } from '@angular/forms';

this.form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  age: ['', [Validators.min(0), Validators.max(120)]]
});
```

### 3. Use FormArray para Arrays Dinâmicos
```typescript
get items() {
  return this.form.get('items') as FormArray;
}

addItem() {
  this.items.push(this.fb.control(''));
}
```

### 4. Use Custom Validators para Validações Complexas
```typescript
function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  
  return null;
}
```

## 📋 Checklist de Migração

### ✅ Formulários Básicos
- [ ] Migrar useState para FormGroup
- [ ] Migrar onChange para formControlName
- [ ] Migrar onSubmit para (ngSubmit)
- [ ] Implementar validação

### ✅ Validação
- [ ] Migrar validação manual para Validators
- [ ] Implementar custom validators
- [ ] Configurar mensagens de erro
- [ ] Implementar validação em tempo real

### ✅ Formulários Dinâmicos
- [ ] Migrar arrays para FormArray
- [ ] Implementar add/remove dinâmico
- [ ] Configurar formArrayName
- [ ] Migrar controles aninhados

### ✅ Formulários Complexos
- [ ] Implementar FormArray para arrays
- [ ] Configurar FormGroup aninhados
- [ ] Migrar validação cruzada
- [ ] Implementar reset de formulário

## 🤖 Prompts para IA

### GitHub Copilot
```bash
# Migrar formulário React para Angular
Migre este formulário React para Angular Reactive Forms:

[cole o código React aqui]
```

### Cursor
```bash
# Converter validação de formulário
Converta esta validação de formulário React para Angular:

[cole o código React aqui]
```

---

**Lembre-se**: Os Reactive Forms do Angular oferecem mais controle e validação robusta. Use FormBuilder para criar formulários complexos de forma mais limpa. 