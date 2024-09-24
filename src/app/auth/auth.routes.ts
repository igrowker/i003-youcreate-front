import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'register', loadComponent: () => import('./layout/register/register.component').then(c => c.RegisterComponent) },
    ]
  }
]
