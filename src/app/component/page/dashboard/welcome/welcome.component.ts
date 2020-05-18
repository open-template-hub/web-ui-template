import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { BasicInfoService } from '../../../../service/basic-info/basic-info.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  basicInfoForm: FormGroup;
  userInfo: any = {};
  submitted = false;
  error = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private basicInfoService: BasicInfoService,
    private loadingService: LoadingService
  ) {
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
    this.authenticationService.userInfo.subscribe(userInfo => this.userInfo = userInfo);
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
  }
}
