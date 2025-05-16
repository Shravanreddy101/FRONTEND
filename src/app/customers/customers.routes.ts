import { Routes } from '@angular/router';
import { provideRoutes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';

export default [
  {path: '', component: CustomersComponent, children: [{ path: 'dashboard', component: DashboardComponent }]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'cart', component: CartComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'ordered_products/:orderId', component: ViewOrderedProductsComponent},
] as Routes;
