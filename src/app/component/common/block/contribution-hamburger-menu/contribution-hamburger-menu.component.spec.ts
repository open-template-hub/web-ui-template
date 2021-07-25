import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionHamburgerMenuComponent } from './contribution-hamburger-menu.component';

describe('ContributionHamburgerMenuComponent', () => {
  let component: ContributionHamburgerMenuComponent;
  let fixture: ComponentFixture<ContributionHamburgerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionHamburgerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionHamburgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
