import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLS } from '../../../util/constant';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../service/theme/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input()
  hideShadow = false;
  @Input()
  popupPadding = false;

  brand = {
    brandLogo: '',
  };

  environment = environment;
  URLS = URLS;

  constructor(private router: Router,
              private themeService: ThemeService
  ) {
    this.brand = this.themeService.brand;
  }

  ngOnInit(): void {
  }
}
