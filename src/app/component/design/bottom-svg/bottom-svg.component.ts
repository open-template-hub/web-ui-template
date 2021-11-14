import { Component } from '@angular/core';
import { ThemeService } from '../../../service/theme/theme.service';
import { ThemeDesignSettings } from '../../../data/theme/theme.data';

@Component({
  selector: 'app-bottom-svg',
  templateUrl: './bottom-svg.component.html',
  styleUrls: ['./bottom-svg.component.scss']
})
export class BottomSvgComponent {

  themeDesignSetting;

  ThemeDesignSettings = ThemeDesignSettings;

  constructor(
    private themeService: ThemeService
  ) {
    this.themeService.themeDesignSetting.subscribe( themeDesignSetting => this.themeDesignSetting = themeDesignSetting );
  }
}
