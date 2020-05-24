import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';

@Component({
  selector: 'app-dashboard-layout-top-nav',
  templateUrl: './dashboard-layout-top-nav.component.html',
  styleUrls: ['./dashboard-layout-top-nav.component.scss']
})
export class DashboardLayoutTopNavComponent implements OnInit {

  userInfo: any = {};
  profileImg = './assets/profile-img.png';

  constructor(
    private basicInfoService: BasicInfoService
  ) {
    this.basicInfoService.userInfo.subscribe(userInfo => {
        if (userInfo) {
          this.userInfo = userInfo;
        }

        if (this.userInfo.profileImg) {
          this.profileImg = userInfo.profileImg;
        }
      }
    );
  }

  ngOnInit(): void {
  }

}
