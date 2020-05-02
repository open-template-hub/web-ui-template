import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Button4Component } from './button4.component';

describe('Button4Component', () => {
  let component: Button4Component;
  let fixture: ComponentFixture<Button4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Button4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Button4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
