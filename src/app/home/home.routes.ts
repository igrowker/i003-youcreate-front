import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { CollaboratorPaymentsComponent } from "./layout/collaborator-payments/collaborator-payments.component";

import { TaxObligationsComponentComponent } from "./layout/tax-obligations-component/tax-obligations-component.component";
import {  ProfileComponent } from "./layout/profile/profile.component";


export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./layout/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'payments', loadComponent: () => import('./layout/collaborator-payments/collaborator-payments.component').then(c => c.CollaboratorPaymentsComponent) },
      { path: 'tax-obligations', loadComponent: () => import('./layout/tax-obligations-component/tax-obligations-component.component').then(c => c.TaxObligationsComponentComponent) },
      { path: 'income', loadComponent: () => import('./layout/income/income.component').then(c => c.IncomeComponent) },
      { path: 'profile', loadComponent: () => import('./layout/profile/profile.component').then(c => c.ProfileComponent) },


    ]
  }
]
