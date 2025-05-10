import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../core/ticket.service';
import { Ticket } from '../../../model/ticket.model';

@Component({
  standalone: true,
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  imports: [CommonModule]
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getAll().subscribe(t => this.tickets = t);
  }
}
