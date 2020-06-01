import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.loggedIn = !!this.authenticationService.currentUserValue;
   }

  ngOnInit(): void {
  }

  logOut(){
    this.authenticationService.logOut();
    this.router.navigateByUrl('/');
  }

}
