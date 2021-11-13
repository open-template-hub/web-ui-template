import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSvgComponent } from './bottom-svg.component';

describe('BottomSvgComponent', () => {
  let component: BottomSvgComponent;
  let fixture: ComponentFixture<BottomSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
