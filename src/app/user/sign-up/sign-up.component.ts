import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  signUpForm;

  emailMessage: string;
  passwordMessage: string;
  confirmPasswordMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  onSubmit(signUpData) {
    this.emailMessage = null;
    this.passwordMessage = null;
    this.confirmPasswordMessage = null;

    if (this.validate(signUpData)) {
      this.subscriptions.push(
        this.authenticationService.signUp(signUpData.email, signUpData.password).subscribe(
          (result) => {
            alert('Check your email!');
          },
          (error) => {
            this.confirmPasswordMessage = error.error;
            this.signUpForm.password = null;
            this.signUpForm.confirmPassword = null;
          }
        ));
    }
  }

  validate(signUpData): boolean {
    if (signUpData.email === '' || signUpData.email == null) {
      this.emailMessage = 'Email cannot be empty';
    } else if (!signUpData.email.match(
      '^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$')) {
      this.emailMessage = 'Incorrect email';
    }

    if (signUpData.password === '' || signUpData.password == null) {
      this.passwordMessage = 'Password cannot be empty';
    } else if (!signUpData.password.match('.{6,}')) {
      this.passwordMessage = 'Password must be 6 characters long at least';

    }

    if (signUpData.confirmPassword === '' || signUpData.confirmPassword == null) {
      this.confirmPasswordMessage = 'Password cannot be empty';
    } else if (signUpData.confirmPassword !== signUpData.password) {
      this.confirmPasswordMessage = 'Passwords don\'t match';
    }

    return this.emailMessage === null && this.passwordMessage === null && this.confirmPasswordMessage === null;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
