import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
