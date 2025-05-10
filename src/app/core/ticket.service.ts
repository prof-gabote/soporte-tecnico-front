import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ticket } from '../model/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private api = `${environment.apiUrl}/tickets`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Ticket[]>(this.api);
  }

  getById(id: number) {
    return this.http.get<Ticket>(`${this.api}/${id}`);
  }

  create(ticket: Ticket) {
    return this.http.post<Ticket>(this.api, ticket);
  }

  update(id: number, ticket: Ticket) {
    return this.http.put<Ticket>(`${this.api}/${id}`, ticket);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
