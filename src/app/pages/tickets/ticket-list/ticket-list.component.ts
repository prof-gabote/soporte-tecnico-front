import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../core/ticket.service';
import { Ticket } from '../../../model/ticket.model';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  standalone: true,
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  imports: [CommonModule, RouterModule]
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private toast: ToastService) { }

  ngOnInit(): void {
    this.ticketService.getAll().subscribe(t => this.tickets = t);
  }

  toggleEstado(ticket: Ticket) {
    const nuevoEstado = ticket.status === 'ABIERTO' ? 'CERRADO' : 'ABIERTO';

    const actualizado: Ticket = {
      ...ticket,
      status: nuevoEstado
    };

    this.ticketService.update(ticket.ticketId!, actualizado).subscribe({
      next: () => {
        ticket.status = nuevoEstado; // Actualiza localmente
      },
      error: () => this.toast.show('Error al actualizar el estado del ticket', 'danger')
    });
  }

  eliminarTicket(id: number) {
    this.toast.showConfirm('¿Eliminar ticket?', () => {
      this.ticketService.delete(id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(t => t.ticketId !== id);
          this.toast.show('Ticket eliminado', 'success');
        },
        error: () => this.toast.show('Error al eliminar ticket', 'danger')
      });
    });
  }
}
