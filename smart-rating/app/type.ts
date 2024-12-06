// src/types.ts

export interface Criterion {
  id: string; // Deve ser uma string
  name: string;
  weight: number;
}

export interface Presentation {
  id: string;
  title: string;
  presenter: string;
  criteria: Criterion[];
}

export interface Evaluation {
  presentationId: string; 
  criterionId: string;
  criterionName?: string; 
  score: number; 
}
