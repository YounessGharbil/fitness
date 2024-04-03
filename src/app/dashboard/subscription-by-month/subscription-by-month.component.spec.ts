import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionByMonthComponent } from './subscription-by-month.component';

describe('SubscriptionByMonthComponent', () => {
  let component: SubscriptionByMonthComponent;
  let fixture: ComponentFixture<SubscriptionByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionByMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
