import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesDetailComponent } from './components/sales-detail/sales-detail.component';
import { SearchClientComponent } from './components/search-client/search-client.component';
import { PaySaleOrderComponent } from './components/pay-sale-order/pay-sale-order.component';
import { UpdateDetailSOComponent } from './components/update-detail-so/update-detail-so.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'sales-detail', component: SalesDetailComponent },
  { path: 'search-client', component: SearchClientComponent },
  { path: 'pay-sale-order', component: PaySaleOrderComponent },
  { path: 'update-detail-so', component: UpdateDetailSOComponent },
  {
    path: 'purchase',
    loadChildren: () =>
      import('./modules/purchase/purchase.module').then(
        (m) => m.PurchaseModule
      ),
  },
  {
    path: 'sale',
    loadChildren: () =>
      import('./modules/sale/sale.module').then((m) => m.SaleModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
