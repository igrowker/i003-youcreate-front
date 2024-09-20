import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './home/pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './home/layout/dashboard/dashboard.component';

export const routes: Routes = [

  { path:'landing', component:LandingComponent },
  
  { path:'home', component:HomeComponent, 
    children:[
      { path:'', redirectTo:'dashboard', pathMatch:'full' },
      { path:'dashboard', component:DashboardComponent }
    ] 
  },
  
  { path:'**', component:NotFoundComponent }

];
