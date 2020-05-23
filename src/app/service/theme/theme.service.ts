import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkThemeSubject: BehaviorSubject<string>;
  public darkTheme: Observable<string>;

  private sideNavClosedSubject: BehaviorSubject<string>;
  public sideNavClosed: Observable<string>;

  public brand = {
    brandLogo: '',
  };

  constructor() {
    let darkThemeStorageItem = localStorage.getItem('darkTheme') ? localStorage.getItem('darkTheme') : sessionStorage.getItem('darkTheme');
    darkThemeStorageItem = darkThemeStorageItem ? darkThemeStorageItem : 'false';
    this.darkThemeSubject = new BehaviorSubject<string>(darkThemeStorageItem);
    this.darkTheme = this.darkThemeSubject.asObservable();

    let sideNavClosedStorageItem = localStorage.getItem('sideNavClosed') ? localStorage.getItem('sideNavClosed') : sessionStorage.getItem('sideNavClosed');
    sideNavClosedStorageItem = sideNavClosedStorageItem ? sideNavClosedStorageItem : 'false';
    this.sideNavClosedSubject = new BehaviorSubject<string>(sideNavClosedStorageItem);
    this.sideNavClosed = this.sideNavClosedSubject.asObservable();

    if (environment.production) {
      this.brand.brandLogo = './assets/brand-logo.png';
    } else {
      this.brand.brandLogo = './assets/brand-logo-blue.png'
    }
  }

  initTheme(darkThemePreferred: boolean) {
    let darkThemePreferredStorageItem = darkThemePreferred ? 'true' : 'false';

    if (localStorage.getItem('currentUser')) {
      sessionStorage.removeItem('darkTheme');
      localStorage.setItem('darkTheme', darkThemePreferredStorageItem);
    } else {
      sessionStorage.setItem('darkTheme', darkThemePreferredStorageItem);
    }
    this.darkThemeSubject.next(darkThemePreferredStorageItem);
  }

  initSideNavClosed(sideNavClosePreferred: boolean) {
    let sideNavClosedStorageItem = sideNavClosePreferred ? 'true' : 'false';

    if (localStorage.getItem('currentUser')) {
      sessionStorage.removeItem('sideNavClosed');
      localStorage.setItem('sideNavClosed', sideNavClosedStorageItem);
    } else {
      sessionStorage.setItem('sideNavClosed', sideNavClosedStorageItem);
    }
    this.darkThemeSubject.next(sideNavClosedStorageItem);
  }

  switchDarkTheme() {
    let darkThemeStorageItem = localStorage.getItem('darkTheme') ? localStorage.getItem('darkTheme') : sessionStorage.getItem('darkTheme');
    let switchedTheme = darkThemeStorageItem === 'true' ? 'false' : 'true';

    if (localStorage.getItem('currentUser')) {
      sessionStorage.removeItem('darkTheme');
      localStorage.setItem('darkTheme', switchedTheme);
    } else {
      sessionStorage.setItem('darkTheme', switchedTheme);
    }

    this.darkThemeSubject.next(switchedTheme);
  }

  toggleSideNav() {
    let sideNavClosedStorageItem = localStorage.getItem('sideNavClosed') ? localStorage.getItem('sideNavClosed') : sessionStorage.getItem('sideNavClosed');
    let toggledSideNavClosed = sideNavClosedStorageItem === 'true' ? 'false' : 'true';

    if (localStorage.getItem('currentUser')) {
      sessionStorage.removeItem('sideNavClosed');
      localStorage.setItem('sideNavClosed', toggledSideNavClosed);
    } else {
      sessionStorage.setItem('sideNavClosed', toggledSideNavClosed);
    }

    this.sideNavClosedSubject.next(toggledSideNavClosed);
  }

  clearThemes() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('darkTheme');
      localStorage.removeItem('sideNavClosed');
    }
    sessionStorage.removeItem('darkTheme');
    sessionStorage.removeItem('sideNavClosed');

    this.darkThemeSubject.next('false');
    this.sideNavClosedSubject.next('false');
  }
}
