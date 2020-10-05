import { Component, OnInit } from '@angular/core';
import { AuthToken } from '../../../../model/AuthToken';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { BasicInfoService } from '../../../../service/basic-info/basic-info.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { ErrorService } from '../../../../service/error/error.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileStorageService } from '../../../../service/file-storage/file-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: AuthToken;
  userInfoForm: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  userInfo: any = {};
  profileImg = './assets/profile-img.png';

  imageChangedEvent: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private basicInfoService: BasicInfoService,
    private fileStorageService: FileStorageService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    this.errorService.sharedError.subscribe(error => this.error = error);

    this.basicInfoService.userInfo.subscribe(userInfo => {
        this.userInfo = userInfo;
      }
    );

    this.fileStorageService.profileImage.subscribe(profileImg => {
        if (profileImg?.file?.data) {
          this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
        }
      }
    );
  }

  ngOnInit() {
    this.userInfoForm = this.formBuilder.group({
      firstName: [this.basicInfoService.userInfoValue?.payload?.firstName, Validators.required],
      lastName: [this.basicInfoService.userInfoValue?.payload?.lastName, Validators.required]
    });
  }

  get f() {
    return this.userInfoForm.controls;
  }

  onSubmit() {
    if (this.loading) {
      return;
    }

    this.submitted = true;

    // stop here if form is invalid
    if (this.userInfoForm.invalid) {
      return;
    }

    this.loadingService.setLoading(true);

    this.fileStorageService.createFile(this.profileImg, this.userInfo.username + '/profile_img', 'profile image', 'image/png')
      .subscribe(response => {
          const payload = {
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value,
            profileImageId: response.id
          }

          this.basicInfoService.updateMyInfo(payload)
            .subscribe(() => {
                this.loadingService.setLoading(false);
                this.router.navigate(['/dashboard']);
              },
              error => {
                this.loadingService.setLoading(false);
                this.errorService.setError(error);
              }
            );
        },
        error => {
          this.loadingService.setLoading(false);
          this.errorService.setError(error);
        }
      );

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.profileImg = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }
}
