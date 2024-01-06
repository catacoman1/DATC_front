import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopComponent } from './components/top/top.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { JwtInterceptor } from './jwt.interceptor';
import { TaskCardComponent } from './components/task-card/task-card.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, NavbarComponent, TopComponent, NewTaskComponent, AdminDashboardComponent,TaskCardComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,ReactiveFormsModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
