import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/client.service';
import { Client } from '../../../model/client.model';

@Component({
  standalone: true,
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  imports: [CommonModule]
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe(c => this.clients = c);
  }
}
