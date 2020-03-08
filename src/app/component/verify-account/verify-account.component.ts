import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  loading = true;
  error = '';

  constructor(private route: ActivatedRoute,
              public router: Router,
              private authenticationService: AuthenticationService) {
  }

  token = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;

      this.authenticationService.verify(this.token)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false;
          },
          error => {
            this.error = error;
            this.loading = false;
          });

    });
  }
}
