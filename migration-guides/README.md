# Guia de Migração React → Angular

Este diretório contém documentação e guias para auxiliar na migração de código React para Angular, seguindo os padrões estabelecidos pelo generator `generate-screen`.

## 📚 Documentação Disponível

### 1. [Padrões de Componentes](./component-patterns.md)
Guia completo sobre como converter componentes React para Angular, incluindo:
- Estrutura de componentes
- Lifecycle hooks
- Props e eventos
- Templates vs JSX

### 2. [Gerenciamento de Estado](./state-management.md)
Como migrar diferentes abordagens de estado:
- useState → BehaviorSubject/Signals
- Redux → NgRx
- Context API → Services
- Zustand → Services com BehaviorSubject

### 3. [Roteamento](./routing.md)
Migração de roteamento:
- React Router → Angular Router
- Navegação programática
- Guards e resolvers
- Lazy loading

### 4. [Formulários](./forms.md)
Conversão de formulários:
- Controlled components → Reactive Forms
- Form validation
- Custom validators
- Form arrays

### 5. [Testes](./testing.md)
Migração de testes:
- Jest → Jasmine/Karma
- React Testing Library → Angular Testing Utilities
- Mocks e spies
- E2E testing

## 🤖 Assistência com IA

### GitHub Copilot
Use prompts específicos para migração:

```
# Converter componente React para Angular
Converta este componente React para Angular seguindo o padrão do generator generate-screen:

[cole o código React aqui]

# Converter JSX para template Angular
Transforme este JSX em template Angular:

[cole o JSX aqui]

# Migrar useState para BehaviorSubject
Migre este useState para BehaviorSubject:

[cole o código React aqui]
```

### Cursor
Utilize o Cursor para refatoração inteligente:

1. **Selecione o código React** que deseja migrar
2. **Use Ctrl+K** para abrir o chat
3. **Digite**: "Converta este código React para Angular seguindo o padrão do generator generate-screen"
4. **Revise e ajuste** o código gerado

## 🛠️ Ferramentas Recomendadas

### Extensões VS Code
- **Angular Language Service**: Suporte completo ao Angular
- **TypeScript Importer**: Importação automática de tipos
- **Auto Rename Tag**: Renomeação automática de tags HTML
- **Bracket Pair Colorizer**: Visualização de pares de colchetes

### Extensões Cursor
- **Angular Snippets**: Snippets para Angular
- **TypeScript Hero**: Organização de imports
- **Path Intellisense**: Autocomplete de caminhos

## 📋 Checklist de Migração

### ✅ Pré-migração
- [ ] Analisar estrutura do projeto React
- [ ] Identificar dependências externas
- [ ] Mapear componentes principais
- [ ] Definir estratégia de migração (gradual vs completa)

### ✅ Durante a migração
- [ ] Converter componentes um por vez
- [ ] Manter funcionalidade existente
- [ ] Escrever testes para componentes migrados
- [ ] Documentar mudanças

### ✅ Pós-migração
- [ ] Validar funcionalidade completa
- [ ] Otimizar performance
- [ ] Atualizar documentação
- [ ] Treinar equipe nos novos padrões

## 🎯 Padrões do Generator

O generator `generate-screen` estabelece padrões que devem ser seguidos:

### Estrutura de Arquivos
```
src/app/{nome-da-tela}/
├── {nome-da-tela}.component.ts
├── {nome-da-tela}.component.html
├── {nome-da-tela}.component.scss
└── {nome-da-tela}.component.spec.ts
```

### Convenções de Nomenclatura
- **Componentes**: PascalCase + "Component" (ex: `UsuariosComponent`)
- **Arquivos**: kebab-case (ex: `usuarios.component.ts`)
- **Seletor**: `app-` + kebab-case (ex: `app-usuarios`)

### Padrões de Código
- **Lifecycle**: Implementar `OnInit` para inicialização
- **Estado**: Usar `BehaviorSubject` para estado reativo
- **Eventos**: Usar `(click)`, `(change)`, etc.
- **Templates**: Usar `*ngIf`, `*ngFor`, `{{ }}`

## 🚀 Comandos Úteis

### Gerar nova tela
```bash
npx nx g @usando-nx/schematics:generate-screen usuarios
```

### Executar testes
```bash
npx nx test dashboard
```

### Build do projeto
```bash
npx nx build dashboard
```

### Servir aplicação
```bash
npx nx serve dashboard
```

## 📞 Suporte

Para dúvidas sobre migração ou uso do generator:

1. **Consulte a documentação** neste diretório
2. **Use GitHub Copilot/Cursor** com prompts específicos
3. **Analise exemplos** gerados pelo `generate-screen`
4. **Revise padrões** estabelecidos nos templates

---

**Lembre-se**: A migração é um processo iterativo. Comece pequeno, teste cada componente migrado e mantenha a funcionalidade existente funcionando durante todo o processo. 