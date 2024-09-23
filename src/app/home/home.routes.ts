import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { CollaboratorPaymentsComponent } from "./layout/collaborator-payments/collaborator-payments.component";

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./layout/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'payments', loadComponent: () => import('./layout/collaborator-payments/collaborator-payments.component').then(c => c.CollaboratorPaymentsComponent) }

    ]
  }
]
