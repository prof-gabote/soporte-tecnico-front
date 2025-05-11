import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/client.service';
import { Company } from '../../../model/client.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  standalone: true,
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class ClientFormComponent implements OnInit {
  form: FormGroup;
  companies: Company[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private http: HttpClient,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      fullName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      companyId: [null]
    });
  }

  get isValidEmail(): boolean {
    const emailControl = this.form.get('email');
    return emailControl?.valid || false;
  }

  ngOnInit(): void {
    this.http.get<Company[]>(`${environment.apiUrlClients}/companies`).subscribe({
      next: (data) => this.companies = data,
      error: () => this.toast.show('Error cargando empresas', 'danger')
    });
  }

  onSubmit() {
    const client = {
      ...this.form.value,
      company: { companyId: this.form.value.companyId }
    };

    this.clientService.create(client).subscribe(() => {
      this.toast.show('Cliente creado', 'success');
      this.form.reset();
    });
  }
}
