import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchCallbackComponent } from './twitch-callback.component';

describe('TwitchCallbackComponent', () => {
  let component: TwitchCallbackComponent;
  let fixture: ComponentFixture<TwitchCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
