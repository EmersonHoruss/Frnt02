import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SupplyProductsRoutingModule } from './supply-products-routing.module';
import { RegisterProductsComponent } from './register-products/register-products.component';
import { AssignPricesComponent } from './assign-prices/assign-prices.component';
import { KindPricesComponent } from './kind-prices/kind-prices.component';
import { HeadquarterComponent } from './headquarter/headquarter.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ErrorMsgComponent } from 'src/app/components/shared/error-msg/error-msg.component';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterProductComponent } from './register-product/register-product.component';
import { NullToStringPipe } from './register-products/pipes/null-to-string.pipe';
import { MoneyPipe } from './register-products/pipes/money.pipe';
import { ProductRegisterComponent } from './product-register/product-register.component';

@NgModule({
  declarations: [
    RegisterProductsComponent,
    AssignPricesComponent,
    KindPricesComponent,
    HeadquarterComponent,
    ErrorMsgComponent,
    RegisterProductComponent,
    NullToStringPipe,
    MoneyPipe,
    ProductRegisterComponent,
  ],
  imports: [
    CommonModule,
    SupplyProductsRoutingModule,
    FormsModule,
    NgSelectModule,
    SweetAlert2Module,
    SharedModule
  ],
})
export class SupplyProductsModule {}
