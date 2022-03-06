import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCounterComponent } from './second-counter.component';

describe('SecondCounterComponent', () => {
  let component: SecondCounterComponent;
  let fixture: ComponentFixture<SecondCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
