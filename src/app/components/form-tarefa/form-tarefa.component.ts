import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'form-tarefa',
  templateUrl: './form-tarefa.component.html',
  styleUrls: ['./form-tarefa.component.css']
})
export class FormTarefaComponent {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tarefa?: any; projetoId?: number } = {}
  ) {
    const tarefa = this.data?.tarefa ?? {
      titulo: '',
      descricao: '',
      status: '',
      prioridade: ''
    };

    const status = this.normalizeStatus(tarefa.status);
    const prioridade = this.normalizePrioridade(tarefa.prioridade);

    this.form = this.fb.group({
      titulo: [tarefa.titulo ?? '', [Validators.required, Validators.maxLength(50)]],
      descricao: [tarefa.descricao ?? '', [Validators.required, Validators.maxLength(100)]],
      status: [status, Validators.required], 
      prioridade: [prioridade, [Validators.required, Validators.maxLength(20)]]
    });
  }

  private normalizeStatus(v: string | undefined): string {
    if (!v) return '';
    const s = v.toString().trim().toUpperCase();
    if (s === 'PENDENTE') return 'PENDENTE';
    if (s === 'EM ANDAMENTO') return 'EM ANDAMENTO';
    if (s === 'CONCLUIDA' || s === 'CONCLUÍDA') return 'CONCLUÍDA';
    return '';
  }

  private normalizePrioridade(v: string | undefined): string {
    if (!v) return '';
    const s = v.toString().trim().toUpperCase();
    if (s === 'BAIXA') return 'BAIXA';
    if (s === 'MEDIA' || s === 'MÉDIA') return 'MÉDIA';
    if (s === 'ALTA') return 'ALTA';
    return '';
  }

  fechar(): void {
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const tarefaData: any = {
      ...this.form.value,
      projetoId: Number(this.data.projetoId)
    };

    // Se for edição, preserva o id
    if (this.data.tarefa && this.data.tarefa.id !== undefined) {
      tarefaData.id = Number(this.data.tarefa.id);
    }

    this.dialogRef.close(tarefaData);
  }
}
