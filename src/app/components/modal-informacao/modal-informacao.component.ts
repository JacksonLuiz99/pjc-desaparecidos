import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-modal-informacao',
  templateUrl: './modal-informacao.component.html',
  styleUrls: ['./modal-informacao.component.css']
})
export class ModalInformacaoComponent {
  form = this.fb.group({
    informacao: ['', Validators.required],
    data: ['', Validators.required],
    anexos: [null]
  });

  selectedFiles: File[] = [];
  loading = false;
  sucesso = false;
  erro = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ModalInformacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ocoId: number }
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

    const formData = new FormData();
    formData.append('informacao', this.form.value.informacao!);
    formData.append('data', this.form.value.data!);
    formData.append('ocoId', this.data.ocoId.toString());

    this.selectedFiles.forEach((file, i) => {
      formData.append('anexos', file);
    });

    this.loading = true;
    this.http.post('https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido', formData).subscribe({
      next: () => {
        this.sucesso = true;
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.erro = true;
        this.loading = false;
      }
    });
  }
}
