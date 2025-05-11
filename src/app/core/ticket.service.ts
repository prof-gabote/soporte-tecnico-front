import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ticket } from '../model/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiTickets = `${environment.apiUrlTickets}/tickets`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Ticket[]>(this.apiTickets);
  }

  getById(id: number) {
    return this.http.get<Ticket>(`${this.apiTickets}/${id}`);
  }

  create(ticket: Ticket) {
    return this.http.post<Ticket>(this.apiTickets, ticket);
  }

  update(id: number, ticket: Ticket) {
    return this.http.put<Ticket>(`${this.apiTickets}/${id}`, ticket);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiTickets}/${id}`);
  }
}
