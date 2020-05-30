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

  initPayment(paymentConfig: any, productId: string, quantity: number) {
    return this.http.post<any>(`${environment.serverUrl}/payment`, {
      paymentConfigKey: paymentConfig.tag,
      productId,
      quantity
    }).subscribe(async (response) => {

      const stripe = await loadStripe(paymentConfig.publishableKey);

      const {error} = await stripe.redirectToCheckout({
        sessionId: response.id
      });

      console.error(error);
    });
  }
}
