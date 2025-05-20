import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrackOrderComponent } from './track-order/track-order.component';

export const routes: Routes = [
    {path: "login", component:LoginComponent},
    {path: "signup", component:SignupComponent},
    {path: "order", component:TrackOrderComponent},
    { path: 'customers', loadChildren: () => import('./customers/customers.routes').then(m => m.default)},
    {path: 'admin',loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)},
];
