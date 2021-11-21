import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { environmentCommon } from 'src/environments/environment-common';
import { User } from '../../../model/user/user.model';

@Component( {
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: [ './profile-card.component.scss' ],
} )
export class ProfileCardComponent {
  environment = environment;
  environmentCommon = environmentCommon;
  employeePhotoLoaded = false;

  @Input() user: any = {
    name: '',
    title: '',
    bio: '',
    social: {
      linkedIn: '',
      twitter: '',
      github: '',
    },
  };

  @Input() photoUri: string = undefined

  constructor() {
    // Intentionally blank
  }

  setEmployeePhotoLoaded = () => {
    this.employeePhotoLoaded = true;
  };


  parseSocialUrl(url: string): string {
    const directories = url.split('/');
    console.log(directories[(directories.length - 1)])
    return directories[(directories.length - 1)];
  };
}
