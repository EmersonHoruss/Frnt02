import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { XdComponent } from './xd/xd.component';


@NgModule({
  declarations: [
    XdComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule
  ]
})
export class SaleModule { }
