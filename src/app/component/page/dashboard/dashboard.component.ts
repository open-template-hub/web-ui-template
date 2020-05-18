import {Component, OnInit} from '@angular/core';
import {AuthToken} from '../../../model/AuthToken';
import {AuthenticationService} from '../../../service/auth/authentication.service';
import {ErrorService} from '../../../service/error/error.service';
import {BasicInfoService} from '../../../service/basic-info/basic-info.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../../service/loading/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: AuthToken;
  userInfo: any = {};
  basicInfo: any;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private basicInfoService: BasicInfoService,
    private errorService: ErrorService
  ) {
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    this.errorService.sharedError.subscribe(error => this.error = error);
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.authenticationService.me()
      .subscribe(userInfo => {
          this.userInfo = userInfo;

          this.basicInfoService.getUserInfo(this.authenticationService.currentUserValue)
            .subscribe(basicInfo => {
                if (!basicInfo) {
                  this.basicInfoService.initUserInfo()
                    .subscribe(() => {
                        this.loadingService.setLoading(false);
                        this.router.navigate(['/dashboard/welcome']);
                      }
                    );
                } else {
                  this.basicInfo = basicInfo;
                }
              },
              error => {
                this.loadingService.setLoading(false);
                this.errorService.setError(error);
              }
            );
        },
        error => {
          this.loadingService.setLoading(false);
          this.errorService.setError(error.message);
        }
      );
  }
}
