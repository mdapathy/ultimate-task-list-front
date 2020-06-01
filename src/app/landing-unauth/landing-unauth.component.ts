import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-unauth',
  templateUrl: './landing-unauth.component.html',
  styleUrls: ['./landing-unauth.component.css']
})
export class LandingUnauthComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/signup']);
    } else {
      this.router.navigate(['/app']);

    }
  }

}
