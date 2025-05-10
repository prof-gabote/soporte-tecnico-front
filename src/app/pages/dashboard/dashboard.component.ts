import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../core/ticket.service';
import { ClientService } from '../../core/client.service';
import { Ticket } from '../../model/ticket.model';
import { Client } from '../../model/client.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, NavbarComponent, RouterModule]
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  clients: Client[] = [];

  totalAbiertos = 0;
  totalCerrados = 0;
  
  mostrarResumen = false;

  constructor(
    private ticketService: TicketService,
    private clientService: ClientService,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.mostrarResumen = this.router.url === '/dashboard';
    });
  }

  ngOnInit(): void {
    this.ticketService.getAll().subscribe(tickets => {
      this.tickets = tickets;
      this.totalAbiertos = tickets.filter(t => t.status === 'ABIERTO').length;
      this.totalCerrados = tickets.filter(t => t.status === 'CERRADO').length;
    });

    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
    });
  }

  get ultimosTickets(): Ticket[] {
    return [...this.tickets].sort((a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    ).slice(0, 5);
  }
}
