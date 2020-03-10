import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkThemeSubject: BehaviorSubject<string>;
  public darkTheme: Observable<string>;

  constructor() {
    let darkThemeStorageItem = localStorage.getItem('darkTheme') ? localStorage.getItem('darkTheme') : sessionStorage.getItem('darkTheme');
    darkThemeStorageItem = darkThemeStorageItem ? darkThemeStorageItem : 'false';
    this.darkThemeSubject = new BehaviorSubject<string>(darkThemeStorageItem);
    this.darkTheme = this.darkThemeSubject.asObservable();
  }

  initDarkTheme(darkThemePreferred: boolean) {
    let darkThemePreferredStorageItem = darkThemePreferred ? 'true' : 'false';

    if (localStorage.getItem('currentUser')) {
      sessionStorage.removeItem('darkTheme');
      localStorage.setItem('darkTheme', darkThemePreferredStorageItem);
    } else {
      sessionStorage.setItem('darkTheme', darkThemePreferredStorageItem);
    }
    this.darkThemeSubject.next(darkThemePreferredStorageItem);
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

  clearThemes() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('darkTheme');
    }
    sessionStorage.removeItem('darkTheme');

    this.darkThemeSubject.next('false');
  }
}
