import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'tickets', loadComponent: () => import('./pages/tickets/ticket-list/ticket-list.component').then(m => m.TicketListComponent) },
      { path: 'tickets/new', loadComponent: () => import('./pages/tickets/ticket-form/ticket-form.component').then(m => m.TicketFormComponent) },
      { path: 'clients', loadComponent: () => import('./pages/clients/client-list/client-list.component').then(m => m.ClientListComponent) },
      { path: 'clients/new', loadComponent: () => import('./pages/clients/client-form/client-form.component').then(m => m.ClientFormComponent) }
    ]
  }
];