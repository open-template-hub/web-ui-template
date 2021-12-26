import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../model/product/product.model';

@Injectable( {
  providedIn: 'root'
} )
export class ProductService {

  public product: Observable<Product>;
  private productSubject: BehaviorSubject<Product>;
  private productStorageKey = 'product'

  public premiumProducts: Observable<any>
  public premiumProductsSubject: BehaviorSubject<any>
  private premiumProductsStorageKey = 'premiumProducts'

  constructor(
    private http: HttpClient
  ) {
    let productStorageItem: Product = JSON.parse( localStorage.getItem( this.productStorageKey ) ?
        localStorage.getItem( this.productStorageKey ) : sessionStorage.getItem( this.productStorageKey ) );
    productStorageItem = productStorageItem ? productStorageItem : undefined;

    let premiumProductsStorageItem: any = JSON.parse( localStorage.getItem( this.premiumProductsStorageKey ) );
    premiumProductsStorageItem = premiumProductsStorageItem ? premiumProductsStorageItem : undefined;

    this.productSubject = new BehaviorSubject<Product>( productStorageItem );
    this.product = this.productSubject.asObservable();

    this.premiumProductsSubject = new BehaviorSubject<any>( premiumProductsStorageItem );
    this.premiumProducts = this.premiumProductsSubject.asObservable();
  }

  setSelectedProduct( product: Product ) {
    if (product) {
      if ( localStorage.getItem( 'currentUser' ) ) {
        sessionStorage.removeItem( this.productStorageKey );
        localStorage.setItem( this.productStorageKey, JSON.stringify( product ) );
      } else {
        sessionStorage.setItem( this.productStorageKey, JSON.stringify( product ) );
      }
      this.productSubject.next( product );
    } else {
      localStorage.removeItem( this.productStorageKey );
      sessionStorage.removeItem( this.productStorageKey );
    }
  }

  private setPremiumProduct( premiumProducts: any ) {
    localStorage.setItem( this.premiumProductsStorageKey, JSON.stringify( premiumProducts ) )
    this.premiumProductsSubject.next( premiumProducts )
  }

  checkProduct( productId: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/product?product_id=${ productId }` )
    .subscribe( ( premiumProduct ) => {
      this.setPremiumProduct( premiumProduct );
    } );
  }

  logout() {
    localStorage.removeItem( this.productStorageKey );
    this.premiumProductsSubject.next( undefined )
  }
}
