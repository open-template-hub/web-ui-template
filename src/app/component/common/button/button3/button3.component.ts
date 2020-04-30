import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../../../service/loading/loading.service';

@Component({
  selector: 'app-button3',
  templateUrl: './button3.component.html',
  styleUrls: ['./button3.component.scss']
})
export class Button3Component implements OnInit {

  @Input() text: string = '';
  @Input() brand: string = 'angular';
  @Input() rounded: boolean = false;

  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
  }

  ngOnInit(): void {
  }
}
