import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { URLS } from '../../data/navigation/navigation.data';
import { Product, ProductLine } from '../../model/product/product.model';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable( {
  providedIn: 'root'
} )
export class ProductService {

  URLS = URLS;

  public product: Observable<Product>;
  public premiumProducts: Observable<any>;
  public premiumProductsSubject: BehaviorSubject<any>;
  private productSubject: BehaviorSubject<Product>;
  private productStorageKey = 'product';
  private premiumProductsStorageKey = 'premiumProducts';

  constructor(
      private http: HttpClient,
      private router: Router,
      private authenticationService: AuthenticationService
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

    this.authenticationService.currentUser.subscribe( currentUser => {
      if ( !currentUser ) {
        this.logout();
      }
    } );
  }

  setSelectedProduct( product: Product ) {
    if ( product ) {
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

  checkProduct( productId: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/product?product_id=${ productId }` )
    .subscribe( ( premiumProduct ) => {
      this.setPremiumProduct( premiumProduct );
    } );
  }

  redirectToProductUrl( product: Product, productLine: ProductLine ) {
    if ( !product.redirectToUrl ) {
      this.router.navigate( [ URLS.product + '/' + productLine.key + '/' + product.key ] ).then( () => {
        return true;
      } );
    } else {
      window.open( product.url, '_blank' );
    }
  }

  logout() {
    localStorage.removeItem( this.productStorageKey );
    this.premiumProductsSubject.next( undefined );
  }

  private setPremiumProduct( premiumProducts: any ) {
    localStorage.setItem( this.premiumProductsStorageKey, JSON.stringify( premiumProducts ) );
    this.premiumProductsSubject.next( premiumProducts );
  }
}
