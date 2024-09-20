import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '../app/register/register.component'

export const routes: Routes = [
    { path: '/register', component: RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

