import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up-success',
  templateUrl: './sign-up-success.component.html',
  styleUrls: ['./sign-up-success.component.scss']
})
export class SignUpSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  email = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
    });
  }
}
