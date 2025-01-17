import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Criterion {
  id: string;
  name: string;
  weight: number;
}

export interface Presentation {
  id: string;
  title: string;
  presenter: string;
  criteria: Criterion[];
}

@Injectable({
  providedIn: 'root',
})
export class PresentationsService {
  private baseUrl = 'http://localhost:5000/api/presentations';

  constructor(private http: HttpClient) {}

  getPresentations(): Observable<Presentation[]> {
    return this.http.get<Presentation[]>(this.baseUrl);
  }

  addPresentation(presentation: Omit<Presentation, 'id'>): Observable<Presentation> {
    return this.http.post<Presentation>(this.baseUrl, presentation);
  }

  updatePresentation(id: string, presentation: Presentation): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, presentation);
  }

  deletePresentation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
