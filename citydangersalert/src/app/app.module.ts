import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { TopComponent } from './top/top.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewTaskComponent } from './new-task/new-task.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JwtInterceptor } from './jwt.interceptor';


@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, NavbarComponent, TopComponent, NewTaskComponent, AdminDashboardComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,ReactiveFormsModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
