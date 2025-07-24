# 🚀 Especificação para IA/Copilot - teste-simples

## 📋 Contexto do Projeto

- **Data**: 2025-07-24
- **Componente**: teste-simples
- **Prompt Original**: "teste"
- **Features Selecionadas**: filtros, tabela, acoes
- **Forçar IA**: ✅ Sim
- **Gerador**: Sistema Híbrido IA + Nx

## 🎯 Instruções para IA/Copilot

### 📝 Tarefa Principal
Você deve implementar um componente Angular completo baseado na seguinte especificação:

**Prompt do Usuário:**
```
teste
```

### 🏗️ Estrutura Técnica Esperada

#### 📁 Estrutura de Arquivos
```
apps/dashboard/src/app/teste-simples/
├── teste-simples.component.ts      # Lógica principal
├── teste-simples.component.html    # Template
├── teste-simples.component.scss    # Estilos
└── teste-simples.component.spec.ts # Testes
```

#### 🔧 Tecnologias Obrigatórias
- **Angular 17+** (standalone components)
- **Angular Material** (UI components)
- **TypeScript** (tipagem forte)
- **SCSS** (estilos)
- **RxJS** (reactive programming)

### 🎨 Especificações de Design

#### 🎯 Features Implementadas
#### 🔍 Filtros Avançados
- **Componentes**: MatExpansionPanel, MatFormField, MatInput
- **Funcionalidades**:
  - Filtros: Nome, Status, Data
  - Datepicker para períodos
  - Selects múltiplos
  - Chips para seleção
  - Busca em tempo real
- **UX**: Painel expansível, botões de ação

#### 📋 Tabela Dinâmica
- **Componentes**: MatTable, MatPaginator, MatSort
- **Funcionalidades**:
  - Colunas: ID, Nome, Status
  - Ordenação por colunas
  - Paginação
  - Ações por linha
  - Seleção múltipla
- **Dados**: Simular dados com interface TypeScript

#### ⚙️ Acoes
- Implementar funcionalidade específica conforme prompt

### 🎯 Instruções Detalhadas para Implementação

#### 1️⃣ **Análise do Prompt**
- Leia cuidadosamente o prompt do usuário
- Identifique todas as funcionalidades solicitadas
- Mapeie para as features selecionadas
- Considere casos de uso específicos

#### 2️⃣ **Estrutura do Componente**
```typescript
@Component({
  selector: 'app-teste-simples',
  standalone: true,
  imports: [
    // Imports baseados nas features
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material modules específicos
  ],
  templateUrl: './teste-simples.component.html',
  styleUrls: ['./teste-simples.component.scss']
})
export class teste-simplesComponent implements OnInit {
  // Propriedades baseadas nas features
  // Métodos de lógica de negócio
  // Dados simulados realistas
}
```

#### 3️⃣ **Template HTML**
- Use Angular Material components
- Implemente layout responsivo
- Adicione animações suaves
- Siga padrões de acessibilidade
- Use *ngIf e *ngFor adequadamente

#### 4️⃣ **Estilos SCSS**
- Design moderno e limpo
- Cores consistentes com tema
- Responsividade com media queries
- Animações CSS suaves
- Estados hover/focus

#### 5️⃣ **Dados Simulados**
- Crie interfaces TypeScript
- Simule dados realistas
- Implemente métodos de CRUD
- Use observables quando apropriado

### 📋 Checklist de Qualidade

#### ✅ **Funcionalidade**
- [ ] Todas as features implementadas
- [ ] Dados simulados funcionais
- [ ] Validações implementadas
- [ ] Responsividade testada

#### ✅ **Código**
- [ ] TypeScript com tipos corretos
- [ ] Imports otimizados
- [ ] Métodos bem estruturados
- [ ] Nomenclatura consistente

#### ✅ **UI/UX**
- [ ] Design moderno
- [ ] Animações suaves
- [ ] Feedback visual
- [ ] Acessibilidade

#### ✅ **Performance**
- [ ] Lazy loading quando apropriado
- [ ] Otimização de imports
- [ ] Dados paginados
- [ ] Debounce em filtros

### 🚀 Comandos de Desenvolvimento

```bash
# Servir aplicação
npx nx serve dashboard

# Testar componente
npx nx test dashboard

# Build do projeto
npx nx build dashboard

# Lint do código
npx nx lint dashboard
```

### 📚 Recursos Úteis

- **Angular Material**: https://material.angular.io/
- **Angular Docs**: https://angular.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **RxJS**: https://rxjs.dev/guide/overview

---

*Documentação gerada automaticamente para IA/Copilot - Sistema Híbrido IA + Nx*
*Data: 2025-07-24*
