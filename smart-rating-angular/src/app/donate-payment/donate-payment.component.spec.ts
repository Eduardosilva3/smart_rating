import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatePaymentComponent } from './donate-payment.component';

describe('DonatePaymentComponent', () => {
  let component: DonatePaymentComponent;
  let fixture: ComponentFixture<DonatePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonatePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
