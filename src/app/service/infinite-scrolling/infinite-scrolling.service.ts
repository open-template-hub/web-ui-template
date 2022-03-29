import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class InfiniteScrollingService {
  public intersectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [ 0, 0.5, 1 ]
  };
  private intersectionSubject = new BehaviorSubject<boolean>( false );
  private observer: any =
      new IntersectionObserver( this.intersectionCallback.bind( this ), this.intersectionOptions );

  constructor() {
    // Intentionally blank
  }

  getObservable() {
    return this.intersectionSubject.asObservable();
  }

  intersectionCallback( entries, observer ) {
    entries.forEach( entry => {
      entry.intersectionRatio === 1 ?
          this.intersectionSubject.next( true ) : this.intersectionSubject.next( false );
    } );
  }

  setObserver() {
    return this.observer;
  }
}
