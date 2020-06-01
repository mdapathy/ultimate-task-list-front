import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../_services/authentication/authentication.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,

  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams
        .subscribe(params => {
          if (params.key !== null && params.key !== undefined) {
            this.activate(params.key);
          } else {
            this.router.navigate(['/']);
          }
        }));
  }



  activate(activationUrl: string) {
    this.subscriptions.push(
      this.authenticationService.activate(activationUrl).subscribe(
        (result) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.router.navigate(['/login']); //TODO send errror
        }
      ));
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
