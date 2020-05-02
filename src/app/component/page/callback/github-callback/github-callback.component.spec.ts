import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubCallbackComponent } from './github-callback.component';

describe('GithubCallbackComponent', () => {
  let component: GithubCallbackComponent;
  let fixture: ComponentFixture<GithubCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
