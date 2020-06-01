import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-auth',
  templateUrl: './landing-auth.component.html',
  styleUrls: ['./landing-auth.component.css']
})
export class LandingAuthComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue === undefined ||
      this.authenticationService.currentUserValue === null) {
      this.router.navigateByUrl('login');
    }
  }

}
