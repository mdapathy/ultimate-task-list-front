import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingUnauthComponent } from './landing-unauth.component';

describe('LandingUnauthComponent', () => {
  let component: LandingUnauthComponent;
  let fixture: ComponentFixture<LandingUnauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingUnauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingUnauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
