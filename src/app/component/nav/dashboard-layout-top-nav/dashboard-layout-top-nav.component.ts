import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';
import { FileStorageService } from '../../../service/file-storage/file-storage.service';

@Component( {
  selector: 'app-dashboard-layout-top-nav',
  templateUrl: './dashboard-layout-top-nav.component.html',
  styleUrls: [ './dashboard-layout-top-nav.component.scss' ]
} )
export class DashboardLayoutTopNavComponent implements OnInit {

  userInfo: any = {};
  profileImg = './assets/profile-img.png';

  constructor(
      private basicInfoService: BasicInfoService,
      private fileStorageService: FileStorageService
  ) {
    this.basicInfoService.userInfo.subscribe( userInfo => {
          if ( userInfo ) {
            this.userInfo = userInfo;
          }

          if ( this.userInfo.profileImg ) {
            this.profileImg = userInfo.profileImg;
          }
        }
    );

    this.fileStorageService.profileImage.subscribe( profileImg => {
          if ( profileImg?.file?.data ) {
            this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
          }
        }
    );
  }

  ngOnInit(): void {
  }

}
