import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  initPayment(paymentConfigKey: string, productId: string, quantity: number) {
    return this.http.post<any>(`${environment.serverUrl}/payment`, {
      paymentConfigKey,
      productId,
      quantity
    }).pipe(map(async (response) => {

      const stripe = await loadStripe('pk_test_LZDfXm3C2xYHGP7VBihlh10s00aOC1FSz8');

      const {error} = await stripe.redirectToCheckout({
        sessionId: response.id
      });

      console.error(error);
    }));
  }
}
