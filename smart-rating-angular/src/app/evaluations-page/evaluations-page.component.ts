import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

interface Criterion {
  id: string;
  name: string;
  weight: number;
}

interface Presentation {
  id: string;
  title: string;
  presenter: string;
  criteria: Criterion[];
}

interface Evaluation {
  presentationId: string;
  criterionId: string;
  score: number;
  evaluatorName: string; 
  criterionName?: string;
}

@Component({
  selector: 'app-evaluations-page',
  templateUrl: './evaluations-page.component.html',
  styleUrls: ['./evaluations-page.component.scss'],
})
export class EvaluationsPageComponent implements OnInit {
  presentations: Presentation[] = [];
  selectedEvaluations: Record<string, Evaluation[]> = {};
  scores: Record<string, number> = {};
  evaluatorName: string = ''; 

  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  async ngOnInit(): Promise<void> {
    await this.extractEvaluatorName();
    this.loadPresentations();
  }

  private async extractEvaluatorName(): Promise<void> {
    const token = await this.keycloakService.getToken();
    const decodedToken = this.decodeToken(token);
    this.evaluatorName = decodedToken?.name || 'Desconhecido';
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  loadPresentations(): void {
    this.http.get<Presentation[]>(`${this.baseUrl}/presentations`).subscribe({
      next: (data) => (this.presentations = data),
      error: (err) => console.error('Erro ao buscar apresentações:', err),
    });
  }

  fetchEvaluations(presentationId: string): void {
    this.http.get<Evaluation[]>(`${this.baseUrl}/evaluations/${presentationId}`).subscribe({
      next: (data) => {
        const validEvaluations = data.filter((evaluation) => evaluation.criterionId);
        this.selectedEvaluations = {
          ...this.selectedEvaluations,
          [presentationId]: validEvaluations,
        };
      },
      error: (err) => console.error('Erro ao buscar avaliações:', err),
    });
  }

  handleSubmit(presentation: Presentation): void {
    Object.entries(this.scores).forEach(([criterionId, score]) => {
      const evaluation: Evaluation = {
        presentationId: presentation.id,
        criterionId,
        score,
        evaluatorName: this.evaluatorName, 
      };

      this.http.post<void>(`${this.baseUrl}/evaluations`, evaluation).subscribe({
        next: () => {
          this.fetchEvaluations(presentation.id); 
        },
        error: (err) => console.error('Erro ao registrar avaliação:', err),
      });
    });

    this.scores = {}; 
  }

  updateScore(criterionId: string, score: number): void {
    this.scores = {
      ...this.scores,
      [criterionId]: score,
    };
  }
}
