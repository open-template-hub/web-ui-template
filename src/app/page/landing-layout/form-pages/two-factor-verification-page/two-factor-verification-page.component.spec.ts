import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorVerificationPageComponent } from './two-factor-verification-page.component';

describe('TwoFactorVerificationPageComponent', () => {
  let component: TwoFactorVerificationPageComponent;
  let fixture: ComponentFixture<TwoFactorVerificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoFactorVerificationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
