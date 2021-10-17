import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesDetailComponent } from './components/sales-detail/sales-detail.component';
import { SearchClientComponent } from './components/search-client/search-client.component';
import { PaySaleOrderComponent } from './components/pay-sale-order/pay-sale-order.component';
import { UpdateDetailSOComponent } from './components/update-detail-so/update-detail-so.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { NoLoginGuard } from './core/guard/no-login.guard';

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent, canActivate: [NoLoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  {
    path: 'sales-detail',
    component: SalesDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search-client',
    component: SearchClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pay-sale-order',
    component: PaySaleOrderComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NoLoginGuard] },
  {
    path: 'register-product',
    component: ProductRegisterComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'purchase',
  //   loadChildren: () =>
  //     import('./modules/purchase/purchase.module').then(
  //       (m) => m.PurchaseModule
  //     ),
  // },
  // {
  //   path: 'sale',
  //   loadChildren: () =>
  //     import('./modules/sale/sale.module').then((m) => m.SaleModule),
  // },
  // {
  //   path: 'user',
  //   loadChildren: () =>
  //     import('./modules/user/user.module').then((m) => m.UserModule),
  // },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
