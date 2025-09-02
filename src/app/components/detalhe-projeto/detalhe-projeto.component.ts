import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from '../../services/projeto.service';
import { TarefaService } from '../../services/tarefa.service';
import { Projeto } from '../../models/projeto.model';
import { Tarefa } from '../../models/tarefa.model';
import { MatDialog } from '@angular/material/dialog';
import { FormProjetoComponent } from '../form-projeto/form-projeto.component';
import { FormTarefaComponent } from '../form-tarefa/form-tarefa.component';

@Component({
  selector: 'detalhe-projeto',
  templateUrl: './detalhe-projeto.component.html',
  styleUrls: ['./detalhe-projeto.component.css']
})
export class DetalheProjetoComponent implements OnInit {
  projeto!: Projeto;
  tarefas: Tarefa[] = [];
  projetoId!: number; // agora é number

  constructor(
    private route: ActivatedRoute,
    private projetoService: ProjetoService,
    private tarefaService: TarefaService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projetoId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarProjeto();
    this.carregarTarefas();
  }

carregarProjeto(): void {
  this.projetoService.buscarPorId(this.projetoId).subscribe({
    next: proj => {
      this.projeto = proj;
      console.log('Projeto carregado:', proj);
    },
    error: err => {
      console.error('Erro ao carregar projeto:', err);
    }
  });
}

  carregarTarefas(): void {
    this.tarefaService.listarPorProjeto(this.projetoId).subscribe(tarefas => {
      this.tarefas = tarefas;
    });
  }

  editarProjeto(projeto: Projeto): void {
    const dialogRef = this.dialog.open(FormProjetoComponent, {
      width: '500px',
      data: { projeto: this.projeto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const projetoEditado = { ...this.projeto, ...result };
        this.projetoService.atualizar(this.projetoId, projetoEditado).subscribe(() => {
          this.carregarProjeto();
        });
      }
    });
  }

novaTarefa(): void {
  const dialogRef = this.dialog.open(FormTarefaComponent, {
    width: '500px',
    data: { projetoId: this.projetoId }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    const payload = {
      projetoId: this.projetoId, 
      ...result
    };

    this.tarefaService.criar(payload).subscribe({
      next: (criada) => {
        console.log('Tarefa criada:', criada); 
        this.carregarTarefas();                
      },
      error: (err) => {
        console.error('Falha ao criar tarefa', err);        
      }
    });
  });
}


  editarTarefa(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(FormTarefaComponent, {
      width: '600px',
      data: { tarefa }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tarefaEditada: Tarefa = {
          ...tarefa,
          ...result,
          projetoId: tarefa.projetoId
        };
        this.tarefaService.atualizar(Number(tarefaEditada.id), tarefaEditada).subscribe(() => {
          this.carregarTarefas();
        });
      }
    });
  }

  removerTarefa(id: number): void {
    if (confirm('Deseja realmente remover esta tarefa?')) {
      this.tarefaService.remover(id).subscribe(() => {
        this.carregarTarefas();
      });
    }
  }

  voltarParaLista() {
    this.router.navigate(['/projects']);
  }
}