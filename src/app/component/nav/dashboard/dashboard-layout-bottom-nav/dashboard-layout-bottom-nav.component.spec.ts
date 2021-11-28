import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutBottomNavComponent } from './dashboard-layout-bottom-nav.component';

describe('DashboardLayoutBottomNavComponent', () => {
  let component: DashboardLayoutBottomNavComponent;
  let fixture: ComponentFixture<DashboardLayoutBottomNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLayoutBottomNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutBottomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
