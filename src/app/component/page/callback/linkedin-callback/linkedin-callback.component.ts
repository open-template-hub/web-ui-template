import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-linkedin-callback',
  templateUrl: './linkedin-callback.component.html',
  styleUrls: ['./linkedin-callback.component.scss']
})
export class LinkedinCallbackComponent implements OnInit {

  environment = environment;

  constructor() {}

  ngOnInit(): void {}
}
