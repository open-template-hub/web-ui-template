import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../loading/loading.service';

@Injectable( {
  providedIn: 'root'
} )
export class ProductService {

  constructor(
      private http: HttpClient,
      private loadingService: LoadingService ) {
  }

  getProduct( productId: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/product`, { params: { product_id: productId } } );
  }
}
