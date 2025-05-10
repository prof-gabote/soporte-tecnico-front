import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Client } from '../model/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private api = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Client[]>(this.api);
  }

  getById(id: number) {
    return this.http.get<Client>(`${this.api}/${id}`);
  }

  create(client: Client) {
    return this.http.post<Client>(this.api, client);
  }

  update(id: number, client: Client) {
    return this.http.put<Client>(`${this.api}/${id}`, client);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
