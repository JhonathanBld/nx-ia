# Workspace Nx Angular com Generator Personalizado

Este workspace Nx Angular foi criado com um generator personalizado para gerar telas Angular padrão, incluindo documentação para migração React → Angular.

## 🚀 Estrutura do Projeto

```
usando-nx/
├── apps/
│   └── dashboard/          # App Angular principal
├── libs/
│   └── schematics/         # Lib com generator personalizado
├── migration-guides/       # Documentação de migração React → Angular
├── tela-usuarios.json      # Exemplo de configuração JSON
└── README.md              # Este arquivo
```

## 📋 Características Implementadas

### ✅ 1. Workspace Nx com Angular
- Workspace inicializado com preset Angular
- App "dashboard" criado automaticamente

### ✅ 2. Generator Personalizado "generate-screen"
- Localizado em `libs/schematics/src/generators/generate-screen/`
- Gera componentes Angular completos com:
  - Componente TypeScript com OnInit
  - Template HTML com filtro e tabela
  - Estilos SCSS responsivos
  - Testes unitários

### ✅ 3. Configuração do Collection
- `libs/schematics/collection.json` configurado
- `libs/schematics/package.json` criado
- Schema JSON definido

### ✅ 4. Arquivo de Configuração JSON
- `tela-usuarios.json` com exemplo completo
- Configuração para filtros, colunas, ações
- Notas de migração React → Angular

### ✅ 5. Documentação de Migração
- Pasta `migration-guides/` criada
- `README.md` com guia completo
- `component-patterns.md` com exemplos detalhados

### ✅ 6. Instruções para IA
- Prompts para GitHub Copilot
- Instruções para Cursor
- Dicas de migração nos templates

## 🛠️ Como Usar

### Gerar uma Nova Tela

```bash
# Comando para gerar uma tela chamada "usuarios"
npx nx g @usando-nx/schematics:generate-screen usuarios

# Comando para gerar uma tela em projeto específico
npx nx g @usando-nx/schematics:generate-screen produtos --project=dashboard
```

### Estrutura Gerada

O generator cria a seguinte estrutura:

```
apps/dashboard/src/app/usuarios/
├── usuarios.component.ts
├── usuarios.component.html
├── usuarios.component.scss
└── usuarios.component.spec.ts
```

### Executar o App

```bash
# Servir o app dashboard
npx nx serve dashboard

# Build do projeto
npx nx build dashboard

# Executar testes
npx nx test dashboard
```

## 📚 Documentação de Migração

### Guias Disponíveis

1. **README Principal**: `migration-guides/README.md`
   - Visão geral da migração
   - Checklist completo
   - Ferramentas recomendadas

2. **Padrões de Componentes**: `migration-guides/component-patterns.md`
   - Mapeamento React → Angular
   - Exemplos de conversão
   - Lifecycle hooks
   - Templates vs JSX

### Assistência com IA

#### GitHub Copilot
```bash
# Prompt para converter componente React
Converta este componente React para Angular seguindo o padrão do generator generate-screen:

[cole o código React aqui]
```

#### Cursor
```bash
# Prompt para refatoração
Converta este código React para Angular seguindo o padrão do generator generate-screen
```

## 🎯 Padrões Estabelecidos

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

## 🔧 Configuração JSON

O arquivo `tela-usuarios.json` contém:

- **Filtros**: Configuração de campos de busca
- **Colunas**: Definição de colunas da tabela
- **Ações**: Botões e operações disponíveis
- **Paginação**: Configuração de paginação
- **API**: Endpoints e métodos
- **Migração**: Notas para conversão React → Angular

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

## 📋 Checklist de Migração

### ✅ Pré-migração
- [ ] Analisar estrutura do projeto React
- [ ] Identificar dependências externas
- [ ] Mapear componentes principais
- [ ] Definir estratégia de migração

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

## 🚀 Comandos Úteis

```bash
# Gerar nova tela
npx nx g @usando-nx/schematics:generate-screen usuarios

# Executar testes
npx nx test dashboard

# Build do projeto
npx nx build dashboard

# Servir aplicação
npx nx serve dashboard

# Lint do projeto
npx nx lint dashboard
```

## 📞 Suporte

Para dúvidas sobre migração ou uso do generator:

1. **Consulte a documentação** em `migration-guides/`
2. **Use GitHub Copilot/Cursor** com prompts específicos
3. **Analise exemplos** gerados pelo `generate-screen`
4. **Revise padrões** estabelecidos nos templates

---

**Lembre-se**: A migração é um processo iterativo. Comece pequeno, teste cada componente migrado e mantenha a funcionalidade existente funcionando durante todo o processo.
