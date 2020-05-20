import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../service/theme/theme.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { LoadingService } from '../../../service/loading/loading.service';

@Component({
 selector: 'app-callback',
 templateUrl: './callback.component.html',
 styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

 social: any;
 returnUrl: string;
 error: string = '';

 brand = {
  brandLogo: '',
 };

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private themeService: ThemeService,
  private authenticationService: AuthenticationService,
  private loadingService: LoadingService
 ) {
 }

 ngOnInit(): void {
  this.brand = this.themeService.brand;

  this.social = this.route.snapshot.data['social'];

  // get return url from route parameters or default to '/dashboard'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

  let callbackParams = {
   code: undefined,
   state: undefined,
   oauth_token: undefined,
   oauth_verifier: undefined
  }

  if (this.social.callbackParams.includes('code')) {
   if (!this.route.snapshot.queryParamMap.has('code')) {
    this.error = 'Please try again later';
    return;
   }
   callbackParams.code = this.route.snapshot.queryParamMap.get('code');
  }

  if (this.social.callbackParams.includes('state')) {
   if (!this.route.snapshot.queryParamMap.has('state')) {
    this.error = 'Please try again later';
    return;
   }
   callbackParams.state = this.route.snapshot.queryParamMap.get('state');
  }

  if (this.social.callbackParams.includes('oauth_token')) {
   if (!this.route.snapshot.queryParamMap.has('oauth_token')) {
    this.error = 'Please try again later';
    return;
   }
   callbackParams.oauth_token = this.route.snapshot.queryParamMap.get('oauth_token');
  }

  if (this.social.callbackParams.includes('oauth_verifier')) {
   if (!this.route.snapshot.queryParamMap.has('oauth_verifier')) {
    this.error = 'Please try again later';
    return;
   }
   callbackParams.oauth_verifier = this.route.snapshot.queryParamMap.get('oauth_verifier');
  }

  this.authenticationService.socialLogin(this.social.tag, callbackParams)
   .pipe(first())
   .subscribe(
    () => {
     this.loadingService.setLoading(false);
     this.router.navigate([this.returnUrl]);
    },
    errorResponse => {
     if (typeof errorResponse.error === 'string') {
      this.error = errorResponse.error;
     } else if (errorResponse.statusText) {
      this.error = errorResponse.statusText;
     }
    });
 }
}
