import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../../../service/theme/theme.service';
import { ErrorService } from '../../../../service/error/error.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  @Input() social: string = '';
  @Input() socialLogo: string = '';

  error: string = '';

  brand = {
    brandLogo: '',
  };

  constructor(
    private themeService: ThemeService,
    private errorService: ErrorService
  ) {
    this.errorService.sharedError.subscribe(error => this.error = error);
  }

  ngOnInit(): void {
    this.brand = this.themeService.brand;
  }
}
