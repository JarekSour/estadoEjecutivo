import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadChildren: 'app/components/login/login.module#LoginModule' },
    { path: 'home', loadChildren: 'app/components/home/home.module#HomeModule' },
    { path: 'cliente/:id', loadChildren: 'app/components/cliente/cliente.module#ClienteModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
