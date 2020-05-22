import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';

@Component({
 selector: 'app-dashboard-layout-top-nav',
 templateUrl: './dashboard-layout-top-nav.component.html',
 styleUrls: ['./dashboard-layout-top-nav.component.scss']
})
export class DashboardLayoutTopNavComponent implements OnInit {

 basicInfo: any = {};
 profileImg = './assets/profile-img.png';

 constructor(
  private basicInfoService: BasicInfoService
 ) {
  this.basicInfoService.basicInfo.subscribe(basicInfo => {
    if (basicInfo) {
      this.basicInfo = basicInfo;
    }

    if (this.basicInfo.profileImg) {
     this.profileImg = basicInfo.profileImg;
    }
   }
  );
 }

 ngOnInit(): void {
 }

}
