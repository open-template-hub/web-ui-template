import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { ThemeService } from '../../../../service/theme/theme.service';
import { environment } from '../../../../../environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-twitter-callback',
  templateUrl: './twitter-callback.component.html',
  styleUrls: ['./twitter-callback.component.scss']
})
export class TwitterCallbackComponent implements OnInit {

  returnUrl: string;
  error = '';
  brandLogo: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    this.brandLogo = this.themeService.brandLogo;

    // get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    const oauth_token = this.route.snapshot.queryParamMap.get('oauth_token');
    const oauth_verifier = this.route.snapshot.queryParamMap.get('oauth_verifier');

    if (!oauth_token || !oauth_verifier) {
      this.error = 'Please try again later';
      return;
    }

    this.authenticationService.socialLoginOAuthV1(environment.twitterTag, oauth_token, oauth_verifier)
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
