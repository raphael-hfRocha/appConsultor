import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <a routerLink="/consultores" class="brand-link">
            <span class="brand-icon">👨‍💼</span>
            <span class="brand-text">App Consultor</span>
          </a>
        </div>

        <div class="navbar-menu" [class.active]="menuOpen">
          <div class="navbar-nav" *ngIf="currentUser">
            <a 
              routerLink="/consultores" 
              routerLinkActive="active"
              class="nav-link"
              (click)="closeMenu()"
            >
              <span class="nav-icon">📋</span>
              <span>Consultores</span>
            </a>
            
            <a 
              routerLink="/sobre" 
              routerLinkActive="active"
              class="nav-link"
              (click)="closeMenu()"
            >
              <span class="nav-icon">ℹ️</span>
              <span>Sobre</span>
            </a>
          </div>

          <div class="navbar-user" *ngIf="currentUser">
            <div class="user-info">
              <span class="user-icon">{{ getUserIcon() }}</span>
              <div class="user-details">
                <span class="user-name">{{ currentUser.name }}</span>
                <span class="user-role">{{ getUserRole() }}</span>
              </div>
            </div>
            
            <button 
              class="btn btn-logout"
              (click)="logout()"
            >
              <span class="logout-icon">🚪</span>
              <span>Sair</span>
            </button>
          </div>
        </div>

        <button 
          class="navbar-toggle"
          (click)="toggleMenu()"
          *ngIf="currentUser"
        >
          <span class="toggle-icon">{{ menuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }

    .navbar-brand {
      flex-shrink: 0;
    }

    .brand-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: white;
      font-weight: 700;
      font-size: 1.3rem;
      transition: opacity 0.3s;
    }

    .brand-link:hover {
      opacity: 0.8;
    }

    .brand-icon {
      font-size: 2rem;
      margin-right: 10px;
    }

    .brand-text {
      display: none;
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 30px;
      flex: 1;
      justify-content: space-between;
      margin-left: 40px;
    }

    .navbar-nav {
      display: flex;
      gap: 25px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.3s;
      white-space: nowrap;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }

    .nav-link.active {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .nav-icon {
      font-size: 1.1rem;
    }

    .navbar-user {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      color: white;
    }

    .user-icon {
      background: rgba(255, 255, 255, 0.2);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .user-details {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .user-role {
      font-size: 0.8rem;
      opacity: 0.8;
      font-weight: 400;
    }

    .btn-logout {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s;
    }

    .btn-logout:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    .logout-icon {
      font-size: 1rem;
    }

    .navbar-toggle {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background 0.3s;
    }

    .navbar-toggle:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .toggle-icon {
      font-size: 1.3rem;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .brand-text {
        display: inline;
      }

      .navbar-toggle {
        display: block;
      }

      .navbar-menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        flex-direction: column;
        padding: 20px;
        gap: 20px;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        margin-left: 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .navbar-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .navbar-nav {
        flex-direction: column;
        gap: 15px;
        width: 100%;
      }

      .nav-link {
        justify-content: center;
        padding: 12px 16px;
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .navbar-user {
        flex-direction: column;
        gap: 15px;
        width: 100%;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }

      .user-info {
        flex-direction: column;
        text-align: center;
        gap: 8px;
      }

      .user-details {
        align-items: center;
      }

      .btn-logout {
        justify-content: center;
        width: 100%;
        padding: 12px;
      }
    }

    @media (max-width: 480px) {
      .navbar-container {
        padding: 0 15px;
      }

      .brand-link {
        font-size: 1.1rem;
      }

      .brand-icon {
        font-size: 1.5rem;
      }
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isAdmin = false;
  menuOpen = false;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
        this.isAdmin = this.authService.isAdmin();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserIcon(): string {
    return this.isAdmin ? '👨‍💼' : '👤';
  }

  getUserRole(): string {
    return this.isAdmin ? 'Administrador' : 'Usuário';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeMenu();
  }
}