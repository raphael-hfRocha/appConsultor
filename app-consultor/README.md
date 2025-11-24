# AppConsultor

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

## AppConsultor

Aplicação Angular de exemplo para gerenciamento de consultores.

Funcionalidades principais implementadas:

- Autenticação com usuários mocados (Administrador e Usuário Comum).
- Controle de acesso via `AuthGuard` e `AdminGuard`.
- CRUD completo de consultores (adicionar, editar, excluir) com estado centralizado via `ConsultorService`.
- Navegação entre telas: `Login`, `Consultores`, `Formulário de Cadastro/Edição` e `Sobre`.
- Formulários reativos (`Reactive Forms`) com validação.
- Comunicação entre componentes via `@Input()` e `@Output()` e `EventEmitter`.

Credenciais mocadas (para demonstração):

- Administrador: `admin@empresa.com` / `admin123` (acesso total: visualizar, adicionar, editar, excluir)
- Usuário Comum: `user@empresa.com` / `user123` (apenas visualizar lista)

Tecnologias:

- Angular (Standalone Components)
- TypeScript
- Angular Router
- Reactive Forms
- RxJS (BehaviorSubject para estado)

### Como rodar (desenvolvimento)

1. Instale dependências:

```powershell
npm install
```

2. Inicie a aplicação em modo de desenvolvimento:

```powershell
npm start
# ou
ng serve
```

3. Abra no navegador: `http://localhost:4200/`

### Build para produção

```powershell
npm run build
# resultado em: dist/app-consultor/
```

### Deploy rápido (opções)

- Vercel: crie um repositório no GitHub, conecte no Vercel e a plataforma detecta automaticamente o build. Configure `build command` como `npm run build` e `output directory` para `dist/app-consultor`.

- GitHub Pages (opção manual):

	1. Instale a ferramenta (opcional):

	```powershell
	npm install -g angular-cli-ghpages
	```

	2. Faça build de produção:

	```powershell
	npm run build -- --configuration production
	```

	3. Publique (exemplo com angular-cli-ghpages):

	```powershell
	npx angular-cli-ghpages --dir=dist/app-consultor
	```

Observação: Vercel é a opção mais simples (deploy automático via GitHub). GitHub Pages funciona bem para apps SPA desde que o roteamento seja tratado (use HashLocationStrategy se necessário).

### Estrutura relevante

- `src/app/services/auth.service.ts` : autenticação (dados mocados), login/logout e estado do usuário.
- `src/app/services/consultor.service.ts` : CRUD e estado centralizado dos consultores via `BehaviorSubject`.
- `src/app/components/login` : tela de login com Reactive Forms.
- `src/app/components/lista-consultores` : lista com filtros, ações de editar/excluir (apenas admin).
- `src/app/components/form-consultor` : formulário reativo para criar/editar consultores.
- `src/app/guards` : `AuthGuard` e `AdminGuard` protegem rotas.
- `src/app/app.routes.ts` : rotas da aplicação.

### Observações finais

O sistema usa dados mocados em memória (não há backend). Para integrar com uma API real, substitua os métodos do `ConsultorService` por chamadas HTTP e persista usuários/token em um servidor.

Se quiser, eu posso:

- Ajudar a adicionar deploy automático no GitHub Actions/Vercel.
- Adaptar o projeto para usar armazenamento persistente (fake API ou JSON server).

Bom trabalho e diga o que deseja seguir a partir daqui.
