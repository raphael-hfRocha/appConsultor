import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              class="form-control"
              [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
            >
            <div class="invalid-feedback" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              Email é obrigatório e deve ser válido
            </div>
          </div>

          <div class="form-group">
            <label for="password">Senha:</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password"
              class="form-control"
              [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
            >
            <div class="invalid-feedback" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              Senha é obrigatória
            </div>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-100"
            [disabled]="loginForm.invalid || loading"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>

          <div class="alert alert-danger mt-3" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </form>

        <div class="demo-credentials">
          <h5>Credenciais de Demonstração:</h5>
          <div class="credential-box">
            <strong>Administrador:</strong><br>
            Email: admin&#64;empresa.com<br>
            Senha: admin123
          </div>
          <div class="credential-box">
            <strong>Usuário Comum:</strong><br>
            Email: user&#64;empresa.com<br>
            Senha: user123
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .btn {
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .w-100 {
      width: 100%;
    }

    .alert {
      padding: 0.75rem;
      border-radius: 5px;
      margin-top: 1rem;
    }

    .alert-danger {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }

    .demo-credentials {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
    }

    .demo-credentials h5 {
      text-align: center;
      margin-bottom: 1rem;
      color: #666;
      font-size: 0.9rem;
    }

    .credential-box {
      background: #f8f9fa;
      padding: 0.75rem;
      border-radius: 5px;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
      line-height: 1.4;
    }

    .mt-3 {
      margin-top: 1rem;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Se já estiver logado, redireciona
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/consultores']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.loading = false;
          if (response) {
            this.router.navigate(['/consultores']);
          } else {
            this.errorMessage = 'Email ou senha inválidos';
          }
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Erro ao fazer login. Tente novamente.';
        }
      });
    }
  }
}