import { Component, OnInit } from '@angular/core';
import { AuthToken } from '../../../model/AuthToken';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss']
})
export class LandingLayoutComponent implements OnInit {

  darkTheme: string;

  currentUser: AuthToken;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.darkTheme = localStorage.getItem('darkTheme');
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']).then(() => {
      this.darkTheme = 'false';
      return true;
    });
  }

  switchTheme() {
    this.darkTheme = this.darkTheme === 'true' ? 'false' : 'true';
    localStorage.setItem('darkTheme', this.darkTheme);
  }
}
