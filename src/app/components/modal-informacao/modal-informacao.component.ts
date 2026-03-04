import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';

@Component({
  selector: 'app-modal-informacao',
  templateUrl: './modal-informacao.component.html',
  styleUrls: ['./modal-informacao.component.css'],
})
export class ModalInformacaoComponent {
  form = this.fb.group({
    informacao: ['', Validators.required],
    data: ['', Validators.required],
    anexos: [null],
  });

  selectedFiles: File[] = [];
  loading = false;
  sucesso = false;
  erro = false;

  constructor(
    private fb: FormBuilder,
    private desaparecidosService: DesaparecidosService,
    private dialogRef: MatDialogRef<ModalInformacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ocoId: number },
  ) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  enviar() {
    if (this.form.invalid || !this.data.ocoId) return;

    const { informacao, data } = this.form.value;
    if (!informacao || !data) return;

    this.loading = true;
    this.desaparecidosService
      .enviarInformacoesDesaparecido(
        this.data.ocoId,
        informacao,
        '', // descricao não existe no html/form do componente no momento
        data,
        this.selectedFiles,
      )
      .subscribe({
        next: () => {
          this.sucesso = true;
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: () => {
          this.erro = true;
          this.loading = false;
        },
      });
  }
}
