import { Component, OnInit } from '@angular/core';
import { AuthToken } from '../../../model/AuthToken';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { ErrorService } from '../../../service/error/error.service';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../service/loading/loading.service';
import { PaymentService } from '../../../service/payment/payment.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: AuthToken;
  userInfo: any = {};
  error = '';
  environment = environment;

  premium = undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private basicInfoService: BasicInfoService,
    private paymentService: PaymentService,
    private errorService: ErrorService
  ) {
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    this.basicInfoService.userInfo.subscribe(userInfo => this.userInfo = userInfo);
    this.errorService.sharedError.subscribe(error => this.error = error);
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.basicInfoService.me()
      .subscribe(userInfo => {
          this.userInfo = userInfo;

          if (!this.userInfo.payload) {
            this.basicInfoService.createMyInfo()
              .subscribe(() => {
                  this.loadingService.setLoading(false);
                  this.router.navigate(['/dashboard/welcome']);
                },
                error => {
                  this.loadingService.setLoading(false);
                  this.errorService.setError(error.message);
                }
              );
          } else {
            this.loadingService.setLoading(false);
          }
        },
        error => {
          this.loadingService.setLoading(false);
          this.errorService.setError(error.message);
        }
      );
    this.hasPremium();
  }

  getPremium(paymentMethod) {
    this.loadingService.setLoading(true);
    this.paymentService.initPayment(paymentMethod, '0276d8d1-0945-412b-92d1-084a6e3f7554', 1);
  }

  hasPremium() {

    this.paymentService.checkReceipt('0276d8d1-0945-412b-92d1-084a6e3f7554').subscribe( response => {
      if (response.successful_receipts.length > 0) {
        response.successful_receipts.forEach(receipt => {
          if (receipt.status === 'SUCCESS') {
            this.premium = true;
          }
        })
      }
    });
  }
}
