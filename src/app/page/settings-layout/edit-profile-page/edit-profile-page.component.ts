import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthToken } from 'src/app/model/auth/auth-token.model';
import { URLS } from '../../../data/navigation/navigation.data';
import { PROFILE_IMG } from '../../../data/profile/profile.data';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { BusinessLogicService } from '../../../service/business-logic/business-logic.service';
import { FileStorageService } from '../../../service/file-storage/file-storage.service';
import { InformationService } from '../../../service/information/information.service';
import { LoadingService } from '../../../service/loading/loading.service';
import { ToastService } from '../../../service/toast/toast.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit, OnDestroy {
  currentUser: AuthToken;
  userInfoForm: FormGroup;
  submitted = false;
  loading = false;
  userInfo: any = {};
  profileImg = PROFILE_IMG;
  candidateProfileImg = undefined;

  imageChangedEvent: any = '';

  URLS = URLS;
  icon: any = undefined;

  @ViewChild( 'searchArea' ) searchArea: ElementRef;

  appHeroContent = [
    {text: 'Edit Profile', level: 3}
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public businessLogicService: BusinessLogicService,
    private fileStorageService: FileStorageService,
    private loadingService: LoadingService,
    private informationService: InformationService,
    private toastService: ToastService
  ) {
    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );
    this.authenticationService.currentUser.subscribe( currentUser => this.currentUser = currentUser );

    this.businessLogicService.userInfo.subscribe( userInfo => {
        this.userInfo = userInfo;
      }
    );

    this.fileStorageService.sharedProfileImage.subscribe( profileImg => {
        if ( profileImg?.file?.data ) {
          this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
        }
      }
    );
  }

  get f() {
    return this.userInfoForm.controls;
  }

  ngOnInit() {
    this.userInfoForm = this.formBuilder.group( {
      firstName: [ this.businessLogicService.userInfoValue?.payload?.firstName, Validators.required ],
      lastName: [ this.businessLogicService.userInfoValue?.payload?.lastName, Validators.required ],
      bio: [ this.businessLogicService.userInfoValue?.payload?.bio, Validators.maxLength( 500 ) ],
      location: [ this.businessLogicService.userInfoValue?.payload?.location ],
      phone: [ this.businessLogicService.userInfoValue?.payload?.phone, Validators.pattern( '[+]?[0-9]+' ) ],
      website: [ this.businessLogicService.userInfoValue?.payload?.website ],
      twitter: [ this.businessLogicService.userInfoValue?.payload?.social?.twitter ],
      linkedin: [ this.businessLogicService.userInfoValue?.payload?.social?.linkedin ],
      github: [ this.businessLogicService.userInfoValue?.payload?.social?.github ],
    } );
  }

  onSubmit() {
    if ( this.loading ) {
      return;
    }

    this.submitted = true;

    // stop here if form is invalid
    if ( this.userInfoForm.invalid ) {
      if ( this.f.twitter.invalid || this.f.linkedin.invalid || this.f.github.invalid ) {
        this.toastService.error( 'Please provide a valid username.', '');
      }
      if ( this.f.phone.invalid ) {
        this.toastService.error( 'Please provide a valid phone number.', '' );
      }
      if ( this.f.lastName.invalid ) {
        this.toastService.error( 'Please provide a last name.', '' );
      }
      if ( this.f.firstName.invalid ) {
        this.toastService.error( 'Please provide a first name.', '' );
      }
      return;
    }

    if ( this.candidateProfileImg ) {
      this.fileStorageService.createFile( this.candidateProfileImg, this.userInfo.username + '/profile_img', 'profile image', 'image/png' )
      .subscribe( response => {
          this.fileStorageService.setProfileImageFileData( this.candidateProfileImg );
          this.updateMyInfo( response.id );
        }
      );
    } else {
      this.updateMyInfo( this.businessLogicService.userInfoValue?.payload?.profileImageId );
    }
  }

  ngOnDestroy() {
    this.informationService.clearInformation();
  }

  fileChangeEvent( event: any ): void {
    this.imageChangedEvent = event;
  }

  imageCropped( event: ImageCroppedEvent ) {
    this.candidateProfileImg = event.base64;
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

  fixUrl( url: string, input: any ): any {
    if ( !input ) {
      return input;
    }
    if ( input.startsWith( 'www' ) ) {
      input = url.slice( 0, 8 ) + input;
    } else if ( !input.includes( url ) ) {
      input = url + input;
    }
    return input;
  }

  private updateMyInfo( profileImageId ) {
    const payload = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      bio: this.f.bio.value,
      location: this.f.location.value,
      phone: this.f.phone.value,
      website: this.f.website.value,
      social: {
        twitter: this.f.twitter.value,
        linkedin: this.f.linkedin.value,
        github: this.f.github.value
      },
      profileImageId
    };

    this.businessLogicService.updateMyInfo( payload )
    .subscribe( () => {
        this.businessLogicService.me().subscribe( result => {
          this.router.navigate( [ URLS.dashboard.root ] );
        });
      }
    );
  }
}
