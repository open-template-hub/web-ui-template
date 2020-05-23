import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { LoadingService } from '../../../service/loading/loading.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  loading = true;
  error = '';
  token = '';

  constructor(private route: ActivatedRoute,
              public router: Router,
              private authenticationService: AuthenticationService,
              private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);

    this.route.queryParams.subscribe(params => {
      this.token = params.token;

      this.authenticationService.verify(this.token)
        .pipe(first())
        .subscribe(
          () => {
            this.loadingService.setLoading(false);
          },
          error => {
            this.error = error;
            this.loadingService.setLoading(false);
          });

    });
  }
}
