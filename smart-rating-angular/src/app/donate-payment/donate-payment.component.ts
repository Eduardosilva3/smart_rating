import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-donate-payment',
  templateUrl: './donate-payment.component.html',
  styleUrls: ['./donate-payment.component.css']
})
export class DonatePaymentComponent implements OnInit {

  @Input() totalDonated: number = 0;  // Valor total já doado
  @Input() idPresentation!: string; 
  @Output() paymentCompleted = new EventEmitter<number>();  // Evento emitido após o pagamento

  // ID da apresentação
  donationAmount: number = 0;          // Valor inserido pelo usuário
  private mp: any;
  paymentInitialized: boolean = false;
  private readonly backendUrl = 'https://api-smart-pub-e962378c3109.herokuapp.com/api/v1/pagamento/doacao';

  constructor() {}

  ngOnInit(): void {
    this.initializeMercadoPago();
  }

  private async initializeMercadoPago() {
    this.mp = new window.MercadoPago('TEST-b08af403-2cfe-4e83-901b-abab56ef061c', { locale: 'pt' });
  }

  // Método para iniciar o pagamento
  initializePayment(): void {
    if (this.donationAmount > 0) {
      this.paymentInitialized = true;
      this.createPaymentBrick();
    }
  }

  private async createPaymentBrick() {
    const bricksBuilder = this.mp.bricks();

    const settings = {
      initialization: {
        amount: this.donationAmount,
        payer: {
          firstName: '',
          lastName: '',
          email: '',
        },
      },
      customization: {
        visual: {
          hideFormTitle: true,
          style: {
            theme: 'flat',
            customVariables: {
              textPrimaryColor: "#2c2c2c",
              textSecondaryColor: "#8a8a8a",
              inputBackgroundColor: "#ffffff",
              formBackgroundColor: "#f8faff",
              baseColor: "#007bff",
              baseColorFirstVariant: "#0056b3",
              baseColorSecondVariant: "#004080",
              errorColor: "#ff4d4f",
              successColor: "#28a745",
              outlinePrimaryColor: "#007bff",
              outlineSecondaryColor: "#d9d9d9",
              buttonTextColor: "#ffffff",
              fontSizeMedium: "16px",
              fontWeightSemiBold: "600",
              inputVerticalPadding: "12px",
              inputHorizontalPadding: "16px",
              inputFocusedBoxShadow: "0 0 0 2px rgba(0, 123, 255, 0.4)",
              inputErrorFocusedBoxShadow: "0 0 0 2px rgba(255, 77, 79, 0.4)",
              inputBorderWidth: "1px",
              inputFocusedBorderWidth: "2px",
              borderRadiusMedium: "12px",
              formPadding: "24px",
          }
          ,
          },
        },
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          atm: 'all',
          maxInstallments: 1,
        },
      },
      callbacks: {
        onReady: () => {
          console.log('Payment Brick is ready');
        },
        onSubmit: ({ formData }: any) => {
          return this.submitPayment(formData);
        },
        onError: (error: any) => {
          console.error('Brick Error:', error);
        },
      },
    };

    try {
      await bricksBuilder.create('payment', 'paymentBrick_container', settings);
    } catch (error) {
      console.error('Error initializing payment brick:', error);
    }
  }

  private submitPayment(formData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.backendUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          console.log('Donation processed:', response);
          this.paymentCompleted.emit(this.donationAmount);

          resolve(response);
        })
        .catch((error) => {
          console.error('Payment error:', error);
          reject(error);
        });
    });
  }
}
