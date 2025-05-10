import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/client.service';
import { Client } from '../../../model/client.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  standalone: true,
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService, private toast: ToastService) { }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(c => this.clients = c);
  }

  guardarEmail(client: Client) {
    this.clientService.update(client.id!, client).subscribe({
      next: () => this.toast.show('Correo actualizado correctamente', 'success'),
      error: () => this.toast.show('Error al guardar el correo', 'danger')
    });
  }

  eliminarCliente(id: number) {
    this.toast.showConfirm('¿Eliminar cliente?', () => {
      this.clientService.delete(id).subscribe({
        next: () => {
          this.clients = this.clients.filter(c => c.id !== id);
          this.toast.show('Cliente eliminado', 'success');
        },
        error: () => this.toast.show('Error al eliminar cliente', 'danger')
      });
    });
  }

}
