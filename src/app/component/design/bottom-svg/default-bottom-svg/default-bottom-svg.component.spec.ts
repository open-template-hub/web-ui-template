import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBottomSvgComponent } from './default-bottom-svg.component';

describe('DefaultBottomSvgComponent', () => {
  let component: DefaultBottomSvgComponent;
  let fixture: ComponentFixture<DefaultBottomSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultBottomSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultBottomSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
