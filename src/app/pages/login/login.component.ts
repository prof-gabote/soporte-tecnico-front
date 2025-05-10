import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Inicializas el formulario dentro del constructor
    this.form = this.fb.group({
      userOrEmail: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('Credenciales inválidas')
    });
  }
}
