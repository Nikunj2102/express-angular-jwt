import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard' , component: DashboardComponent , canActivate:[AuthGuard]},
  {path:'profile' , component: ProfileComponent , canActivate:[AuthGuard]},
  {path:'register' , component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
