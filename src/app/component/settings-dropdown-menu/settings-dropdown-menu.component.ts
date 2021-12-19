import { Component, ElementRef, HostListener, Input, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { URLS } from '../../data/navigation/navigation.data';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { UtilService } from '../../service/util/util.service';

@Component( {
  selector: 'app-dropdown-menu',
  templateUrl: './settings-dropdown-menu.component.html',
  styleUrls: [ './settings-dropdown-menu.component.scss' ],
} )
export class SettingsDropdownMenuComponent {
  URLS = URLS;

  @Input() isDropdownOpen = false;
  @Input() dropdownParent: ElementRef = null;
  @Input() items: any[] = []

  @ViewChild( 'toggleButton' ) toggleButton: ElementRef;
  @ViewChild( 'dropdownContent' ) dropdownContent: ElementRef;

  closeDropdownInternalClicked = false;

  constructor(
    private utilService: UtilService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openDropdown() {
    this.isDropdownOpen = true;
    this.closeDropdownInternalClicked = true;
  }

  @HostListener( 'document:mouseover', [ '$event' ] )
  onHover( event ) {
    if ( this.dropdownParent?.nativeElement === undefined &&
        !this.utilService.isSmallScreen() &&
        !(
            this.toggleButton?.nativeElement?.contains( event.target ) ||
            this.dropdownContent?.nativeElement?.contains( event.target ) ||
            event.target.contains( this.toggleButton?.nativeElement ) ||
            event.target.contains( this.dropdownContent?.nativeElement )
        ) ) {
      this.closeDropdown();
    }
  }

  @HostListener( 'document:click', [ '$event' ] )
  onClick( event ) {
    if ( this.dropdownContent?.nativeElement?.contains( event.target ) ) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    this.closeDropdownInternalClicked = false;
  }

  closeDropDownInternal() {
    this.closeDropdownInternalClicked = true;
    this.utilService.delay( 500 ).then( () => {
      this.closeDropdown();
    } );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate( [ '/' ] ).then( () => {
      return true;
    } );
  }
}
