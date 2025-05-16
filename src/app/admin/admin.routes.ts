import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { PostCouponComponent } from './components/post-coupon/post-coupon.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PostFAQComponent } from './components/post-faq/post-faq.component';

export const adminRoutes: Routes = [
  {path: '',component: AdminComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', component: PostCategoryComponent},
  {path: 'product', component: PostProductComponent},
  {path: 'coupons', component: CouponsComponent},
  {path: 'post-coupon', component: PostCouponComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'faq/:productId', component: PostFAQComponent},
  {path: 'update/:productId', component: PostProductComponent},

];

