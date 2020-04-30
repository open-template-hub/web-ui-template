import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Button3Component } from './button3.component';

describe('Button3Component', () => {
  let component: Button3Component;
  let fixture: ComponentFixture<Button3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Button3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Button3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
