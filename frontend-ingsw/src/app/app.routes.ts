import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {authGuard} from './auth/auth.guard';

export const routes: Routes = [{path:"", redirectTo:"/login", pathMatch:"full"},
                               {path:'register', component: RegisterComponent},
                               {path:"login", component: LoginComponent},
                               {path:"home", component: HomeComponent, canActivate:[authGuard]}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutes{}
