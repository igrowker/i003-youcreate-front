import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './register/register.component'


export const routes: Routes = [

  { path:'register', component:RegisterComponent },
  { path:'landing', component:LandingComponent },
  { path:'dashboard', component:DashboardComponent },
  { path:'**', component:NotFoundComponent },

];
