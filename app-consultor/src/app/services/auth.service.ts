import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Dados mocados
  private users: User[] = [
    {
      id: 1,
      email: 'admin@empresa.com',
      password: 'admin123',
      name: 'Administrador',
      role: 'admin'
    },
    {
      id: 2,
      email: 'user@empresa.com',
      password: 'user123',
      name: 'Usuário Comum',
      role: 'user'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verifica se há usuário logado no localStorage apenas no browser
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  login(email: string, password: string): Observable<AuthResponse | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const authResponse: AuthResponse = {
        user: { ...user, password: '' }, // Remove senha da resposta
        token: 'mock-jwt-token-' + user.id
      };
      
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
        localStorage.setItem('token', authResponse.token);
      }
      this.currentUserSubject.next(authResponse.user);
      
      return of(authResponse);
    }
    
    return of(null);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}