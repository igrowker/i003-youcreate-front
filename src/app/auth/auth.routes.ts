import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'register', loadComponent: () => import('./layout/register/register.component').then(c => c.RegisterComponent) },
      { path: 'login', loadComponent: () => import('./layout/login/login.component').then(c => c.LoginComponent) },
      { path: 'verificar', loadComponent: () => import('./layout/email-verification/email-verification.component').then(c => c.EmailVerificationComponent) }
    ]
  }
]
