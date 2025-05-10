import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../core/ticket.service';
import { Category } from '../../../model/ticket.model';
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
  categorias: Category[] = [];

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
    this.http.get<Category[]>(`${environment.apiUrl}/categorias`).subscribe({
      next: (data) => this.categorias = data,
      error: () => this.toast.show('Error cargando categorías', 'danger')
    });
  }

  onSubmit() {
    const ticket = {
      ...this.form.value,
      category: { id: this.form.value.categoryId }
    };

    this.ticketService.create(ticket).subscribe(() => {
      this.toast.show('Ticket creado', 'success');
      this.form.reset();
    });
  }
}
