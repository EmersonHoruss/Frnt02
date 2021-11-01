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
import { TicketComponent } from './components/ticket/ticket.component';
import { DeliverSaleComponent } from './components/deliver-sale/deliver-sale.component';
import { AssignPricesComponent } from './components/assign-prices/assign-prices.component';
import { AssignProductsComponent } from './components/assign-products/assign-products.component';
import { VentasDiariasComponent } from './reportes/ventas-diarias/ventas-diarias.component';
import { VentasEstacionComponent } from './reportes/ventas-estacion/ventas-estacion.component';

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'sales', component: SalesComponent },
  {
    path: 'sales-detail',
    component: SalesDetailComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'assign-prices',
    component: AssignPricesComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'assign-products',
    component: AssignProductsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'ticket',
    component: TicketComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'deliver-sale',
    component: DeliverSaleComponent,
    // canActivate: [AuthGuard],
  },
  // {
  //   path: 'search-client',
  //   component: SearchClientComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'pay-sale-order',
    component: PaySaleOrderComponent,
    // canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent},
  {
    path: 'register-product',
    component: ProductRegisterComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'ventas-diarias',
    component: VentasDiariasComponent
  },
  // {
  //   path: 'ventas-fecha-festiva'
  // },
  {
    path: 'ventas-estacion',
    component: VentasEstacionComponent
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
