import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private error = new BehaviorSubject('');
  sharedError = this.error.asObservable();

  constructor() {
  }

  setError(error: any) {
    if (typeof error === 'string') {
      this.error.next(error)
    } else if (error?.error?.message) {
      this.error.next(error.error.message);
    } else {
      this.error.next(JSON.stringify(error));
    }
  }
}
