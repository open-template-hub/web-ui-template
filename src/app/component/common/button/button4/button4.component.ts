import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../../../service/loading/loading.service';

@Component({
  selector: 'app-button4',
  templateUrl: './button4.component.html',
  styleUrls: ['./button4.component.scss']
})
export class Button4Component implements OnInit {

  @Input() text: string = '';
  @Input() brand: string = 'angular';

  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
  }

  ngOnInit(): void {
  }
}
