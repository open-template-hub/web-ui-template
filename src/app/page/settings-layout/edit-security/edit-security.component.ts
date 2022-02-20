import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyticsService } from 'src/app/service/analytics/analytics.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { TwoFactorCodeService } from 'src/app/service/two-factor-code/two-factor-code.service';

@Component({
  selector: 'app-edit-security',
  templateUrl: './edit-security.component.html',
  styleUrls: ['./edit-security.component.scss']
})
export class EditSecurityComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  loading = false;

  maskedPhoneNumberOptions = {
    beginningLengthThreshold: 3,
    lastLengthThreshold: 2
  };

  constructor(
    private fromBuilder: FormBuilder,
    private toastService: ToastService,
    private twoFactorCodeService: TwoFactorCodeService,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.form = this.fromBuilder.group( {
      phoneNumber: [ '', Validators.required ]   
    } );
  }

  onPhoneNumberSubmit() {
    if( this.loading ) {
      return;
    }
     
    this.submitted = true;

    const phoneNumberErrorMessage = 'Please provide a valid phone number';

    if( this.form.invalid ) {
      if( this.form.controls.phoneNumber.invalid ) {
        this.toastService.error( phoneNumberErrorMessage );
      }
      return;
    }
    
    this.submitPhoneNumber()
  }

  submitPhoneNumber() {
    this.twoFactorCodeService.submitPhoneNumber(
      this.form.controls.phoneNumber.value 
    ).subscribe(
      () => {
        // TODO: Mask phone number
        const analyticsData = {
          payload: {
            message: `Submitted phone number: ${this.form.controls.phoneNumber.value}`,
          },
          category: '2FA'
        };

        this.analyticsService.logEvent( analyticsData ).subscribe();

        this.toastService.success("Code sent");
      }
    )
  }
}
