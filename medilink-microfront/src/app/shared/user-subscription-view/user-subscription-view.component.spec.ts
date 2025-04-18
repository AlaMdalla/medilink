import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubscriptionViewComponent } from './user-subscription-view.component';

describe('UserSubscriptionViewComponent', () => {
  let component: UserSubscriptionViewComponent;
  let fixture: ComponentFixture<UserSubscriptionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSubscriptionViewComponent]
    });
    fixture = TestBed.createComponent(UserSubscriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
