import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-dribbble-callback',
  templateUrl: './dribbble-callback.component.html',
  styleUrls: ['./dribbble-callback.component.scss']
})
export class DribbbleCallbackComponent implements OnInit {

  environment = environment;

  constructor() {}

  ngOnInit(): void {}
}
