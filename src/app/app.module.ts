import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Routes
import { APP_ROUTING } from './app.routes';

//Modules
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
// import { MatCheckbox } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SidebarModule } from 'ng-sidebar';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesDetailComponent } from './components/sales-detail/sales-detail.component';
import { SearchClientComponent } from './components/search-client/search-client.component';
import { RegisterModifyClientComponent } from './components/Modal/register-modify-client/register-modify-client.component';
import { PaySaleOrderComponent } from './components/pay-sale-order/pay-sale-order.component';
import { UpdateDetailSOComponent } from './components/update-detail-so/update-detail-so.component';
import { PruebaComponent } from './modules/components/prueba/prueba.component';

import { LoginComponent } from './components/login/login.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { DeliverSaleComponent } from './components/deliver-sale/deliver-sale.component';
import { AssignPricesComponent } from './components/assign-prices/assign-prices.component';
import { AssignProductsComponent } from './components/assign-products/assign-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SalesComponent,
    SalesDetailComponent,
    SearchClientComponent,
    RegisterModifyClientComponent,
    PaySaleOrderComponent,
    UpdateDetailSOComponent,
    PruebaComponent,
    LoginComponent,
    ProductRegisterComponent,
    TicketComponent,
    DeliverSaleComponent,
    AssignPricesComponent,
    AssignProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // MatCheckbox,
    APP_ROUTING,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatTableModule,
    SweetAlert2Module,
    SidebarModule.forRoot(),
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
