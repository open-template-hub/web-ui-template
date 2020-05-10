import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-reddit-callback',
  templateUrl: './reddit-callback.component.html',
  styleUrls: ['./reddit-callback.component.scss']
})
export class RedditCallbackComponent implements OnInit {

  environment = environment;

  constructor() {}

  ngOnInit(): void {}
}
