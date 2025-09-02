# README - Desafio Angular

## 📋 Descrição

Este projeto é uma aplicação Angular 16 para gerenciamento de **projetos** e **tarefas**, desenvolvida como parte de um desafio técnico para vaga de Senior Full Stack.

A aplicação utiliza **Angular Material** para UI, **json-server** como backend fake, e segue boas práticas de arquitetura, componentização e testes automatizados.

---

## 🏗️ Arquitetura & Tecnologias

- **Componentização:**  
  - Componentes para listagem, criação e edição de projetos e tarefas.
  - Componentes compartilhados para header e footer.

- **Serviços:**  
  - Serviços para comunicação com a API REST (`ProjetoService`, `TarefaService`).

- **Guards & Interceptors:**  
  - **Implementados, porém desativados no código** para facilitar testes e avaliação.  
    Caso deseje ativar, basta descomentar as referências nos módulos e arquivos correspondentes.
    - `AuthGuard` protege rotas, redirecionando usuários não autenticados para `/login` (./login apenas como exemplo,pois não tem esse Endpoint nesseprojeto).
    - Interceptor adiciona token de autenticação nas requisições HTTP.

- **Modelos:**  
  - Interfaces e tipos para projetos e tarefas em `models/`.

- **State Management:**  
  - Utiliza RxJS para gerenciamento reativo dos dados.

- **UI:**  
  - Utiliza **Angular Material** para responsividade, layout e componentes visuais.

---

## 📁 Estrutura de Pastas

```
src/app/
  components/
    detalhe-projeto/
    form-projeto/
    form-tarefa/
    lista-projetos/
  guards/
    auth.guard.ts
  interceptors/
    auth.interceptor.ts
  models/
    projeto.model.ts
    tarefa.model.ts
  services/
    projeto.service.ts
    tarefa.service.ts
  shared/
    header/
    footer/
```

---

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Suba o backend fake:
   ```bash
   npm install -g json-server
   json-server --watch db.json --port 3000
   ```

3. Rode a aplicação Angular:
   ```bash
   ng serve
   ```

4. Acesse [http://localhost:4200/projects](http://localhost:4200/projects)

---


## 🧪 Testes

- Testes unitários para componente lista-projetos.component e serviço projeto.service
- Para rodar os testes:
  ```bash
  ng test
  ```

---

## 📦 Backend Fake

- O arquivo `db.json` contém dados de exemplo para projetos e tarefas.
- Endpoints disponíveis:
  - `/projects`
  - `/tasks`

---

## 💡 Decisões Técnicas

- Angular Material para UI responsiva e moderna.
- RxJS para manipulação reativa dos dados.
- Guards e Interceptors implementados para segurança e tratamento global de requisições (desativados por padrão).
- Estrutura modular para facilitar manutenção e escalabilidade.

---

## 👨‍💻 Autor

Desenvolvido por Marcos Bontempo dos Santos