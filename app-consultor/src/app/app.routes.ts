import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListaConsultoresComponent } from './components/lista-consultores/lista-consultores.component';
import { FormConsultorComponent } from './components/form-consultor/form-consultor.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'consultores',
    component: ListaConsultoresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consultor/novo',
    component: FormConsultorComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'consultor/editar/:id',
    component: FormConsultorComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'sobre',
    component: SobreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
