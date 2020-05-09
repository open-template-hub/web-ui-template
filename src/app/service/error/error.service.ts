import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private error = new BehaviorSubject('');
  sharedError = this.error.asObservable();

  constructor() { }

  setError(error: string) {
    this.error.next(error)
  }
}
