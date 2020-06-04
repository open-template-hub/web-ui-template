import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService) {
  }

  getProduct(productId: string) {
    return this.http.get<any>(`${environment.serverUrl}/product`, {params: {product_id: productId}});
  }
}
