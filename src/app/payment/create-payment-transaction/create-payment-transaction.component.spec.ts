import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentTransactionComponent } from './create-payment-transaction.component';

describe('CreatePaymentTransactionComponent', () => {
  let component: CreatePaymentTransactionComponent;
  let fixture: ComponentFixture<CreatePaymentTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaymentTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePaymentTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
