import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';

interface Result {
  id: string;
  title: string;
  presenter: string;
  averageScore: number;
  totalDonations: number;
}

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent implements OnInit, OnDestroy {
  results: Result[] = [];
  showDonationModal: boolean = false;
  selectedResultId: string = '';
  totalDonationsForSelected: number = 0;
  private socket!: Socket;
  private readonly backendUrl = 'http://localhost:5000/api/presentations';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.socket = io('http://localhost:5000');

    this.socket.on('results', (data: Result[]) => {
      this.results = data;
    });
  }

  openDonationModal(result: Result): void {
    this.selectedResultId = result.id;
    this.totalDonationsForSelected = result.totalDonations;
    this.showDonationModal = true;
  }

  closeDonationModal(): void {
    this.showDonationModal = false;
  }

  updateTotalDonations(donationAmount: number): void {
    this.http.post<Result>(`${this.backendUrl}/${this.selectedResultId}/donation`, { amount: donationAmount })
      .subscribe(
        (updatedResult) => {
          // Atualiza o resultado na lista
          const result = this.results.find(r => r.id === this.selectedResultId);
          if (result) {
            result.totalDonations = updatedResult.totalDonations;
          }
          this.closeDonationModal();
        },
        (error) => {
          console.error('Erro ao atualizar a doação:', error);
        }
      );
  }
  

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
