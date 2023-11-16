import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueBuildManagerComponent } from './league-build-manager.component';

describe('LeagueBuildManagerComponent', () => {
  let component: LeagueBuildManagerComponent;
  let fixture: ComponentFixture<LeagueBuildManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueBuildManagerComponent]
    });
    fixture = TestBed.createComponent(LeagueBuildManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
