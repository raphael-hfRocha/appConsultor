import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <div class="app-container">
      <app-navbar *ngIf="showNavbar"></app-navbar>
      <main class="main-content" [class.with-navbar]="showNavbar">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .main-content {
      transition: all 0.3s ease;
    }

    .main-content.with-navbar {
      padding-top: 70px;
    }

    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    * {
      box-sizing: border-box;
    }
  `]
})
export class AppComponent implements OnInit {
  showNavbar = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.showNavbar = !!user;
    });
  }
}
