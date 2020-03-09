import { Component } from '@angular/core';
import { AuthToken } from './model/AuthToken';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then(() => {
      this.darkTheme = 'false';
      return true;
    });
  }

  switchTheme() {
    this.darkTheme = this.darkTheme === 'true' ? 'false' : 'true';
    localStorage.setItem('darkTheme', this.darkTheme);
  }
}
