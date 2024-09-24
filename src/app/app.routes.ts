import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './auth/layout/register/register.component'



export const routes: Routes = [

  { path:'', component:LandingComponent },
  { path:'home',  loadChildren: () => import('./home/home.routes').then( c => c.HOME_ROUTES  )},
  { path:'auth',  loadChildren: () => import('./auth/auth.routes').then( c => c.AUTH_ROUTES  )},
  { path: '**', component: NotFoundComponent }


];
