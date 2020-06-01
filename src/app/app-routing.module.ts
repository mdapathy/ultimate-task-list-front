import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './user/log-in/log-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LandingUnauthComponent } from './landing-unauth/landing-unauth.component';
import { LandingAuthComponent } from './landing-auth/landing-auth.component';
import { ValidationComponent } from './validation/validation.component';


const routes: Routes = [
  { path: '', component: LandingUnauthComponent },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'app', component: LandingAuthComponent },
  { path: 'activate', component: ValidationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
