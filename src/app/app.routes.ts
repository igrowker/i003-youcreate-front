import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [

  { path:'landing', component:LandingComponent },
  { path:'dashboard', component:DashboardComponent },
  { path:'**', component:NotFoundComponent }

];
