import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../../../service/loading/loading.service';

@Component({
  selector: 'app-button2',
  templateUrl: './button2.component.html',
  styleUrls: ['./button2.component.scss']
})
export class Button2Component implements OnInit {

  @Input() text: string = '';
  @Input() icon: string = 'fab fa-angular';
  @Input() rounded: boolean = false;

  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
  }

  ngOnInit(): void {
  }
}
