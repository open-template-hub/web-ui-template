import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Button2Component } from './button2.component';

describe('Button2Component', () => {
  let component: Button2Component;
  let fixture: ComponentFixture<Button2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Button2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Button2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
