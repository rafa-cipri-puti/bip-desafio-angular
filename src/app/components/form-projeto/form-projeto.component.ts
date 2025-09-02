import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Projeto } from '../../models/projeto.model';

@Component({
  selector: 'form-projeto',
  templateUrl: './form-projeto.component.html'
})
export class FormProjetoComponent {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projeto?: Projeto } = {}
  ) {
    const projeto = this.data?.projeto || { nome: '', descricao: '' };
    this.form = this.fb.group({
      nome: [projeto.nome, [Validators.required, Validators.maxLength(30)]],
      descricao: [projeto.descricao, [Validators.required, Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    let result = { ...this.form.value };
    // Inclui o id se estiver editando
    if (this.data && this.data.projeto && this.data.projeto.id !== undefined) {
      result.id = Number(this.data.projeto.id);
    }
    this.dialogRef.close(result);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
