import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopNavComponent } from './dashboard-top-nav.component';

describe('DashboardTopNavComponent', () => {
  let component: DashboardTopNavComponent;
  let fixture: ComponentFixture<DashboardTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
