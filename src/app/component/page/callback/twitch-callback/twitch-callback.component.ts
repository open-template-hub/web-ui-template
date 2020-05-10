import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-twitch-callback',
  templateUrl: './twitch-callback.component.html',
  styleUrls: ['./twitch-callback.component.scss']
})
export class TwitchCallbackComponent implements OnInit {

  environment = environment;

  constructor() {}

  ngOnInit(): void {}
}
