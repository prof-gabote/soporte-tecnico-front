import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../core/ticket.service';
import { Category, Ticket } from '../../../model/ticket.model';
import { Client } from '../../../model/client.model';
import { ClientService } from '../../../core/client.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  standalone: true,
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class TicketFormComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  clients: Client[] = [];

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private http: HttpClient,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      status: ['ABIERTO'],
      categoryId: [null],
      clientId: [null]
    });
  }

  ngOnInit(): void {
    this.http.get<Category[]>(`${environment.apiUrlTickets}/categories`).subscribe({
      next: (data) => this.categories = data,
      error: () => this.toast.show('Error cargando categorías', 'danger')
    });

    this.http.get<Client[]>(`${environment.apiUrlClients}/clients`).subscribe({
      next: (data) => this.clients = data,
      error: () => this.toast.show('Error cargando clientes', 'danger')
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toast.show('Formulario inválido', 'danger');
      return;
    }

    const ticket: Partial<Ticket> = {
      ...this.form.value,
      categoryId: Number(this.form.value.categoryId),
      clientId: Number(this.form.value.clientId)
    };

    this.ticketService.create(ticket as Ticket).subscribe(() => {
      this.toast.show('Ticket creado', 'success');
      this.form.reset();
    });
  }
}
