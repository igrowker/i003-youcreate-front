import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [

  { path:'', component:LandingComponent, pathMatch: 'full' },
  { path:'home',  loadChildren: () => import('./home/home.routes').then( c => c.HOME_ROUTES  ), canActivate:[authGuard]},
  { path:'auth',  loadChildren: () => import('./auth/auth.routes').then( c => c.AUTH_ROUTES  )},
  { path:'accounts/confirm-email/:key', redirectTo:'/home', pathMatch:'full' },
  { path: '**', component: NotFoundComponent }
];
