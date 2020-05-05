import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinCallbackComponent } from './linkedin-callback.component';

describe('LinkedinCallbackComponent', () => {
  let component: LinkedinCallbackComponent;
  let fixture: ComponentFixture<LinkedinCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedinCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
