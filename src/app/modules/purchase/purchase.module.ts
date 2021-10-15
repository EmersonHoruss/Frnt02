import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { SupplyProductsModule } from './supply-products/supply-products.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    SupplyProductsModule,
    FormsModule,
  ],
})
export class PurchaseModule {}
