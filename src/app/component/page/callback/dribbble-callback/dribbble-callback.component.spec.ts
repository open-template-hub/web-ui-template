import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DribbbleCallbackComponent } from './dribbble-callback.component';

describe('DribbbleCallbackComponent', () => {
  let component: DribbbleCallbackComponent;
  let fixture: ComponentFixture<DribbbleCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DribbbleCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DribbbleCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
