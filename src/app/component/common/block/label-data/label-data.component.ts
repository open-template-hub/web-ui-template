import { Component, Input, OnInit } from '@angular/core';

@Component( {
  selector: 'app-label-data',
  templateUrl: './label-data.component.html',
  styleUrls: [ './label-data.component.scss' ]
} )
export class LabelDataComponent implements OnInit {

  @Input() label = '';
  @Input() data = '';
  @Input() isClickable = false;
  @Input() noMargin = '';
  @Input() contrast = false;
  @Input() leftTopMargin = false;
  @Input() dim = false;
  @Input() highlight = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
