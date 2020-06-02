import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Form, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  loaded: boolean;
  emailMessage: string;
  passwordMessage: string;
  logInForm;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

    this.loaded = true;

  }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  onSubmit(loginData) {
    this.emailMessage = null;
    this.passwordMessage = null;
    if (this.validate(loginData)) {
      this.subscriptions.push(
        this.authenticationService.logIn(loginData.email, loginData.password).subscribe(
          (result) => {
            this.router.navigate(['/app']);
          },
          (error) => {
            this.logInForm.password = null;
            this.passwordMessage = error.error.message;
          }
        ));
    }
  }

  validate(loginData): boolean {
    if (loginData.email === '' || loginData.email == null) {
      this.emailMessage = 'Email cannot be empty';
    } else if (!loginData.email.match('^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$')) {
      this.emailMessage = 'Incorrect email';
    }

    if (loginData.password === '' || loginData.password == null) {
      this.passwordMessage = 'Password cannot be empty';
    }

    return this.emailMessage === null && this.passwordMessage === null;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
