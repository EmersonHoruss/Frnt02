import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignPricesComponent } from './assign-prices/assign-prices.component';
import { RegisterProductsComponent } from './register-products/register-products.component';
import { HeadquarterComponent } from './headquarter/headquarter.component';
import { KindPricesComponent } from './kind-prices/kind-prices.component';
import { RegisterProductComponent } from './register-product/register-product.component';
import { ProductRegisterComponent } from './product-register/product-register.component';

const routes: Routes = [
  // {
  //   path: 'register-products',
  //   component: RegisterProductsComponent,
  // },
  // {
  //   path: 'register-product',
  //   component: RegisterProductComponent,
  // },
  {
    path: 'product-register',
    component: ProductRegisterComponent,
  },
  {
    path: 'assign-prices',
    component: AssignPricesComponent,
  },
  {
    path: 'kind-prices',
    component: KindPricesComponent,
  },
  {
    path: 'headquarter',
    component: HeadquarterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplyProductsRoutingModule {}
