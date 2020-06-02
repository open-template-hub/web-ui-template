import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {

  private userInfoSubject: BehaviorSubject<any>;
  public userInfo: Observable<any>;

  constructor(private http: HttpClient) {

    const userInfoStorageItem = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : sessionStorage.getItem('userInfo');
    this.userInfoSubject = new BehaviorSubject<any>(JSON.parse(userInfoStorageItem));
    this.userInfo = this.userInfoSubject.asObservable();
  }

  public get userInfoValue(): any {
    return this.userInfoSubject.value;
  }

  me() {
    return this.http.get<any>(`${environment.serverUrl}/user/me`)
      .pipe(map(userInfo => {
        this.userInfoSubject.next(userInfo);

        if (localStorage.getItem('currentUser')) {
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        }

        return userInfo;
      }));
  }

  createMyInfo() {
    return this.http.post<any>(`${environment.serverUrl}/user/me`, {
      payload: {
        firstName: ''
      }
    });
  }

  updateMyInfo(payload: any) {
    return this.http.put<any>(`${environment.serverUrl}/user/me`, {payload});
  }

  logout() {
    this.userInfoSubject.next(null);
  }
}
