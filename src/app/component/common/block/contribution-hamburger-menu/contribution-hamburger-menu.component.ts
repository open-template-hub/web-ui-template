import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-contribution-hamburger-menu',
  templateUrl: './contribution-hamburger-menu.component.html',
  styleUrls: ['./contribution-hamburger-menu.component.scss']
})
export class ContributionHamburgerMenuComponent implements OnInit {

  display = false
  environment = environment
  url = environment.serverUrl

  @ViewChild( 'menu' ) menu: ElementRef;
  @ViewChild( 'icon' ) icon: ElementRef;

  @Input() showCalendar = false;
  @Output() calendarClicked = new EventEmitter<boolean>();
  @Output() shareViaClicked = new EventEmitter<string>();

  constructor(
    private _eref: ElementRef
  ) { }

  ngOnInit(): void {
  }

  @HostListener( 'document:click', [ '$event' ] )
  onDocumentClick( event ) {
    if ( this.icon?.nativeElement.contains( event.target ) ) {
      this.display = !this.display
    } else if ( this.menu?.nativeElement.contains( event.target ) ) {
      this.display = true;
    } else {
      this.display = false;
    }
  }
}
