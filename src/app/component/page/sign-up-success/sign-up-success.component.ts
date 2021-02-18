import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-sign-up-success',
  templateUrl: './sign-up-success.component.html',
  styleUrls: [ './sign-up-success.component.scss' ]
} )
export class SignUpSuccessComponent implements OnInit {

  email = '';

  constructor( private route: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      if ( params.email ) {
        this.email = params.email;
      }
    } );
  }
}
