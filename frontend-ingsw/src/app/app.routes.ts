import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {authGuard} from './auth/auth.guard';
import {RecordComponent} from './record/record.component';

export const routes: Routes = [{path:"", redirectTo:"/login", pathMatch:"full"},
                               {path:'register', component: RegisterComponent},
                               {path:"login", component: LoginComponent},
                               {path:"home", component: HomeComponent, canActivate:[authGuard]},
                               {path:"record", component: RecordComponent, canActivate:[authGuard]}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutes{}
