import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { environment } from '../../../../../environments/environment';
import { first } from 'rxjs/operators';
import { LoadingService } from '../../../../service/loading/loading.service';

@Component({
  selector: 'app-dribbble-callback',
  templateUrl: './dribbble-callback.component.html',
  styleUrls: ['./dribbble-callback.component.scss']
})
export class DribbbleCallbackComponent implements OnInit {

  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');

    if (!code || !state) {
      this.error = 'Please try again later';
      return;
    }

    this.authenticationService.socialLogin(environment.dribbbleTag, code, state)
      .pipe(first())
      .subscribe(
        () => {
          this.loadingService.setLoading(false);
          this.router.navigate([this.returnUrl]);
        },
        errorResponse => {
          if (typeof errorResponse.error === "string")  {
            this.error = errorResponse.error;
          } else if (errorResponse.statusText) {
            this.error = errorResponse.statusText;
          }
        });
  }
}
