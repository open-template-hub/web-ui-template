import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private profileImageSubject: BehaviorSubject<any>;
  public profileImage: Observable<any>;

  constructor(private http: HttpClient) {
    const profileImageStorageItem = localStorage.getItem('profileImage') ? localStorage.getItem('profileImage') : sessionStorage.getItem('profileImage');
    this.profileImageSubject = new BehaviorSubject<any>(JSON.parse(profileImageStorageItem));
    this.profileImage = this.profileImageSubject.asObservable();
  }

  public get profileImageValue(): any {
    return this.profileImageSubject.value;
  }

  downloadProfileImage(id: any) {
    return this.http.get<any>(`${environment.serverUrl}/file/me`, {params: {id}})
      .pipe(map(profileImage => {
        this.profileImageSubject.next(profileImage);

        if (localStorage.getItem('currentUser')) {
          localStorage.setItem('profileImage', JSON.stringify(profileImage));
        } else {
          sessionStorage.setItem('profileImage', JSON.stringify(profileImage));
        }

        return profileImage;
      }));
  }

  createFile(file: any, title: string, description: string, contentType: string) {
    return this.http.post<any>(`${environment.serverUrl}/file/me`, {
      key: 'S3',
      payload: {
        title,
        description,
        content_type: contentType,
        data: file
      }
    });
  }

  logout() {
    this.profileImageSubject.next(null);
  }
}
