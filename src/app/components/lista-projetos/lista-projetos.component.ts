import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../models/projeto.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormProjetoComponent } from '../form-projeto/form-projeto.component';
import { TarefaService } from 'src/app/services/tarefa.service';
import { finalize, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lista-projetos',
  templateUrl: './lista-projetos.component.html',
  styleUrls: ['./lista-projetos.component.css'],
})
export class ListaProjetosComponent implements OnInit {
  projetos: Projeto[] = [];
  carregando = true;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private dialog: MatDialog,
    private tarefaService: TarefaService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarProjetos();
  }


  novoProjeto(): void {
    const dialogRef = this.dialog.open(FormProjetoComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      // NÃO enviar id: deixe o JSON Server criar
      const payload = {
        nome: result.nome,
        descricao: result.descricao
        // ...outros campos que seu form tiver
      };

      this.projetoService.criar(payload).subscribe({
        next: (criado) => {
          console.log('Criado pelo servidor:', criado); // criado.id = gerado automaticamente
          this.carregarProjetos(); // recarrega a lista com o id correto
        },
        error: (err) => {
          console.error('Falha ao criar projeto', err);
          this.snack.open('Falha ao criar projeto', 'OK', { duration: 3000 });
        }
      });
    });
  }


  editarProjeto(projeto: Projeto): void {
    const dialogRef = this.dialog.open(FormProjetoComponent, {
      width: '400px',
      data: { projeto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const projetoEditado = { ...projeto, ...result, id: Number(projeto.id) };
        this.projetoService.atualizar(Number(projetoEditado.id), projetoEditado).subscribe(() => {
          this.carregarProjetos();
        });
      }
    });
  }

  carregarProjetos(): void {
    this.carregando = true;
    this.projetoService.listar().subscribe({
      next: (dados) => {
        this.projetos = dados;
        this.carregando = false;
        console.log('Projetos carregados:', this.projetos);
      },
      error: () => {
        this.carregando = false;
        alert('Erro ao carregar projetos!');
      }
    });
  }

  removerProjeto(projetoId: number) {
    const confirma = confirm('Excluir o projeto e TODAS as suas tarefas?');
    if (!confirma) return;

    this.tarefaService.removerTodasDoProjeto(projetoId).pipe(
      switchMap(() => this.projetoService.remover(projetoId)),
      finalize(() => this.carregarProjetos())
    ).subscribe({
      next: () => this.snack.open('Projeto e tarefas excluídos.', 'OK', { duration: 3000 }),
      error: () => this.snack.open('Falha ao excluir.', 'OK', { duration: 4000 })
    });
  }

  abrirProjeto(id: number): void {
    this.router.navigate(['/projects', id]);
  }
}