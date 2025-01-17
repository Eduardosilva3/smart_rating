import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';

// Interface dos resultados
interface Result {
  id: string;
  title: string;
  presenter: string;
  averageScore: number;
}

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent implements OnInit, OnDestroy {
  results: Result[] = [];
  private socket!: Socket;

  ngOnInit(): void {
    // Conecta ao WebSocket do servidor
    this.socket = io('http://localhost:5000');

    // Escuta os eventos "results" do servidor
    this.socket.on('results', (data: Result[]) => {
      this.results = data;
    });
  }

  ngOnDestroy(): void {
    // Desconecta ao destruir o componente
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
