import { Component, OnInit } from '@angular/core';
import { AuthToken } from '../../../../model/AuthToken';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { BasicInfoService } from '../../../../service/basic-info/basic-info.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { ErrorService } from '../../../../service/error/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: AuthToken;
  basicInfoForm: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  basicInfo: any = {};
  profileImg = './assets/profile-img.png';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private basicInfoService: BasicInfoService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    this.errorService.sharedError.subscribe(error => this.error = error);

    this.basicInfoService.basicInfo.subscribe(basicInfo => {
        this.basicInfo = basicInfo;
        if (basicInfo.profileImg) {
          this.profileImg = basicInfo.profileImg;
        }
      }
    );
  }

  ngOnInit() {
    this.basicInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  get f() {
    return this.basicInfoForm.controls;
  }

  onSubmit() {
    if (this.loading) {
      return;
    }

    this.submitted = true;

    // stop here if form is invalid
    if (this.basicInfoForm.invalid) {
      return;
    }

    this.loadingService.setLoading(true);

    this.basicInfoService.updateUserInfo(this.f.firstName.value, this.f.lastName.value)
      .subscribe(() => {
          this.loadingService.setLoading(false);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.loadingService.setLoading(false);
          this.errorService.setError(error);
        }
      );
  }
}
