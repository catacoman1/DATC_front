import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { TopComponent } from './top/top.component';
import { HttpClientModule } from '@angular/common/http';
import { NewTaskComponent } from './new-task/new-task.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, NavbarComponent, TopComponent, NewTaskComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
