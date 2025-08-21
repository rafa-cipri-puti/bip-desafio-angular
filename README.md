# Desafio Técnico - Angular (Senior)
Bem-vindo(a)! Este é o desafio técnico para candidatos a vaga **Pessoa Desenvolvedora - Full stack - Java e Angular**.  
Nosso objetivo é avaliar seu conhecimento em **arquitetura, boas práticas, testes e componentização**.
---

## 🎯 Objetivo do Teste
Crie uma aplicação Angular para gerenciamento de **projetos e tarefas**:
- Um projeto pode ter: `id`, `nome`, `descrição`.
- Uma tarefa pode ter: `id`, `título`, `descrição`, `status (pendente, em andamento, concluída)`, `prioridade`, `projetoId`.

### Requisitos funcionais:
1. **Listagem de projetos** e possibilidade de criar/editar/remover.
2. **Listagem de tarefas de um projeto** e possibilidade de criar/editar/remover.
3. Implementar **rotas**:
   - `/projects` → listagem de projetos
   - `/projects/:id` → detalhes + tarefas
   - `/projects/:id/tasks/:id` → edição de tarefa
4. Formulários reativos (Reactive Forms).
5. Consumo de API REST (pode usar [json-server](https://github.com/typicode/json-server) ou `https://jsonplaceholder.typicode.com/`).
6. Pelo menos **1 Guard** de rota e **1 Interceptor**.
7. **Testes unitários** para um serviço e um componente.
---

## 🧑‍💻 Diferenciais (não obrigatórios, mas valorizados)
- Uso de **NgRx** ou outro state management.
- Lazy loading de módulos.
- Responsividade (pode usar Angular Material ou outro).
- Testes e2e (Cypress ou Protractor).
- Documentação adicional no README explicando arquitetura.
---

## ✅ O que será avaliado
- Organização do código.
- Arquitetura de módulos e componentização.
- Uso idiomático do Angular (RxJS, AsyncPipe, Services, Guards, Interceptors).
- Boas práticas (clean code, commits claros).
- Testes unitários.
- Clareza na documentação.
---

## 🚀 Instruções
1. Faça um fork deste repositório.
2. Crie uma branch com seu nome:  
   ```
   git checkout -b feature/seu-nome
   ```
3. Implemente sua solução.
4. Abra um Pull Request para este repositório.
---

## 🛠️ Como rodar o projeto
```bash
# instalar dependências
npm install

# rodar aplicação
ng serve

# rodar testes
ng test
```
---

## 📦 Backend Fake
Você pode rodar um backend fake com `json-server`:
```bash
npm install -g json-server
json-server --watch db.json --port 3000
```
Crie um arquivo `db.json` com estrutura de projetos e tarefas.
---

Boa sorte 🚀  
