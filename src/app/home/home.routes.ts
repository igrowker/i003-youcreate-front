import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { authGuard } from "../core/guards/auth.guard";



export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./layout/dashboard/dashboard.component').then(c => c.DashboardComponent), },
      { path: 'payments', loadComponent: () => import('./layout/collaborator-payments/collaborator-payments.component').then(c => c.CollaboratorPaymentsComponent), },
      { path: 'tax-obligations', loadComponent: () => import('./layout/tax-obligations-component/tax-obligations-component.component').then(c => c.TaxObligationsComponentComponent), },
      { path: 'income', loadComponent: () => import('./layout/income/income.component').then(c => c.IncomeComponent), },
      { path: 'profile', loadComponent: () => import('./layout/profile/profile.component').then(c => c.ProfileComponent), },
      { path: 'account-data', loadComponent: () => import('./layout/profile/account-data/account-data.component').then(c => c.AccountDataComponent), }
    ]
  }
]
