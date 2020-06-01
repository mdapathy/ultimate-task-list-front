import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ProjectService } from '../_services/project/project.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-landing-auth',
  templateUrl: './landing-auth.component.html',
  styleUrls: ['./landing-auth.component.css']
})
export class LandingAuthComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private projectService: ProjectService,

  ) {

  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue === undefined ||
      this.authenticationService.currentUserValue === null) {
      this.router.navigateByUrl('login');
    }
    this.projectService.getAllProjects().subscribe();
  }

}
