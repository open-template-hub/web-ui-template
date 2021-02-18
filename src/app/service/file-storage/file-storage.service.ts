import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class FileStorageService {

  public profileImage: Observable<any>;
  private profileImageSubject: BehaviorSubject<any>;

  constructor( private http: HttpClient ) {
    const profileImageStorageItem = localStorage.getItem( 'profileImage' ) ? localStorage.getItem( 'profileImage' ) : sessionStorage.getItem( 'profileImage' );
    this.profileImageSubject = new BehaviorSubject<any>( JSON.parse( profileImageStorageItem ) );
    this.profileImage = this.profileImageSubject.asObservable();
  }

  public get profileImageValue(): any {
    return this.profileImageSubject.value;
  }

  downloadProfileImage( id: any ) {
    return this.http.get<any>( `${ environment.serverUrl }/file/me`, { params: { id } } )
    .pipe( map( profileImage => {
      this.profileImageSubject.next( profileImage );

      if ( localStorage.getItem( 'currentUser' ) ) {
        localStorage.setItem( 'profileImage', JSON.stringify( profileImage ) );
      } else {
        sessionStorage.setItem( 'profileImage', JSON.stringify( profileImage ) );
      }

      return profileImage;
    } ) );
  }

  createFile( file: any, title: string, description: string, contentType: string ) {
    return this.http.post<any>( `${ environment.serverUrl }/file/me`, {
      key: 'S3',
      payload: {
        title,
        description,
        content_type: contentType,
        data: file,
        is_public: true
      }
    } );
  }

  logout() {
    this.profileImageSubject.next( null );
  }
}
