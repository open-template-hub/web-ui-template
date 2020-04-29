import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../../../service/loading/loading.service';

@Component({
  selector: 'app-button1',
  templateUrl: './button1.component.html',
  styleUrls: ['./button1.component.scss']
})
export class Button1Component implements OnInit {

  @Input() text: string = 'Button';

  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
  }

  ngOnInit(): void {
  }
}
