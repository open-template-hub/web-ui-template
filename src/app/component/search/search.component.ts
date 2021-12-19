import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { URLS } from '../../data/navigation/navigation.data';

@Component( {
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
} )
export class SearchComponent {
  searchResults = [];
  searchEnabled = true;
  URLS = URLS;

  @ViewChild( 'searchArea' )
  searchArea: ElementRef;

  @HostListener( 'document:click', [ '$event' ] )
  onDocumentClick( event ) {
    if ( this.searchArea?.nativeElement.contains( event.target ) ) {
      this.searchEnabled = true;
    } else {
      this.searchEnabled = false;
    }
  }

  search( event: any ) {
    const q = event.target.value;

    if ( !q || q.length < 3 ) {
      this.searchResults = [];
    }
  }
}
