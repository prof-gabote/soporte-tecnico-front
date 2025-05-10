import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { RouterModule } from '@angular/router'; // 👈 IMPORTANTE

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule]
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
