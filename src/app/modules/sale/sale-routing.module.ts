import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XdComponent } from './xd/xd.component';

const routes: Routes = [{ path: 'xd', component: XdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleRoutingModule {}
