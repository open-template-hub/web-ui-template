import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../util/constant';

@Component( {
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: [ './terms.component.scss', '../raw-landing-layout.component.scss' ]
} )
export class TermsComponent implements OnInit {

  URLS = URLS;

  constructor() {
  }

  ngOnInit(): void {
  }

}
