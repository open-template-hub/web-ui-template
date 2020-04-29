import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../../../service/loading/loading.service';

@Component({
  selector: 'app-card-1',
  templateUrl: './card-1.component.html',
  styleUrls: ['./card-1.component.scss']
})
export class Card1Component implements OnInit {

  @Input() title: string = 'Title';

  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
  }

  ngOnInit(): void {
  }
}
