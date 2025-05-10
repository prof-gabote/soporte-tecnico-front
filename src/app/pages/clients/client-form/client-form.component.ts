import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/client.service';
import { Empresa } from '../../../model/client.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class ClientFormComponent implements OnInit {
  form: FormGroup;
  empresas: Empresa[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      empresaId: [null]
    });
  }

  ngOnInit(): void {
    this.http.get<Empresa[]>(`${environment.apiUrl}/empresas`).subscribe({
      next: (data) => this.empresas = data,
      error: () => alert('Error cargando empresas')
    });
  }

  onSubmit() {
    const client = {
      ...this.form.value,
      empresa: { id: this.form.value.empresaId }
    };

    this.clientService.create(client).subscribe(() => {
      alert('Cliente creado');
      this.form.reset();
    });
  }
}
