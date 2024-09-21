import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { CollaboratorPaymentsComponent } from "./layout/collaborator-payments/collaborator-payments.component";

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {path: 'home', component: DashboardComponent },
      {path: 'payments', component: CollaboratorPaymentsComponent },
    ]
  }
]
