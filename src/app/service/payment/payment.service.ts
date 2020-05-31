import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService) {
  }

  initPayment(paymentConfig: any, productId: string, quantity: number) {
    return this.http.post<any>(`${environment.serverUrl}/payment`, {
      paymentConfigKey: paymentConfig.tag,
      productId,
      quantity
    }).subscribe(async (response) => {

      if (response.method === 'stripe') {
        const stripe = await loadStripe(paymentConfig.publishableKey);

        const {error} = await stripe.redirectToCheckout({
          sessionId: response.payload.id
        });

        console.error(error);
      } else if (response.method === 'coinbase') {
        this.loadingService.setLoading(false);
        console.log(response);
        window.location.href = `https://commerce.coinbase.com/charges/${response.payload.id}`;
      }
    });
  }
}
