import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTrancheComponent } from './payment-tranche.component';

describe('PaymentTrancheComponent', () => {
  let component: PaymentTrancheComponent;
  let fixture: ComponentFixture<PaymentTrancheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTrancheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTrancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
