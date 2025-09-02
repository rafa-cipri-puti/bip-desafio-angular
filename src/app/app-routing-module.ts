import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProjetosComponent } from './components/lista-projetos/lista-projetos.component';
import { DetalheProjetoComponent } from './components/detalhe-projeto/detalhe-projeto.component';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'projects', component: ListaProjetosComponent },
  // { path: 'projects/:id', component: DetalheProjetoComponent, canActivate: [AuthGuard] }, // ATIVA O GUARD
  { path: 'projects/:id', component: DetalheProjetoComponent},
  { path: 'projects/:id/tasks/:id', component: FormTarefaComponent},
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}