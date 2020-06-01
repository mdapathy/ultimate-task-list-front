import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }


  logOut() {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/');

  }

}
