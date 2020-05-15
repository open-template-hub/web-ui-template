import { Component, OnInit } from '@angular/core';
import { AuthToken } from '../../../model/AuthToken';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { ErrorService } from '../../../service/error/error.service';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: AuthToken;
  userInfo: any;
  error: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private basicInfoService: BasicInfoService,
    private errorService: ErrorService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.errorService.sharedError.subscribe(error => this.error = error);
  }

  ngOnInit(): void {
    this.basicInfoService.getUserInfo(this.authenticationService.currentUserValue)
      .subscribe( userInfo => {
        console.log('here');
        this.userInfo = userInfo;
      }
    );
    this.basicInfoService.userInfo.subscribe(x => this.userInfo = x);
  }
}
