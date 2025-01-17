import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Component({
  selector: 'app-presentations-page',
  templateUrl: './presentations-page.component.html',
  styleUrls: ['./presentations-page.component.scss'],
})
export class PresentationsPageComponent implements OnInit {
  presentations: Presentation[] = [];
  editingPresentation: Presentation | null = null;

  // Form Fields
  title: string = '';
  presenter: string = '';
  criteria: Criterion[] = [{ id: this.generateId(), name: '', weight: 1 }];

  private baseUrl = 'http://localhost:5000/api/presentations';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPresentations();
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load all presentations
  loadPresentations(): void {
    this.http.get<Presentation[]>(this.baseUrl).subscribe({
      next: (data) => (this.presentations = data),
      error: (err) => console.error('Erro ao buscar apresentações:', err),
    });
  }

  // Add or Edit Presentation
  handleSubmit(): void {
    if (this.editingPresentation) {
      // Edit existing presentation
      const updatedPresentation: Presentation = {
        ...this.editingPresentation,
        title: this.title,
        presenter: this.presenter,
        criteria: this.criteria,
      };

      this.http.put(`${this.baseUrl}/${this.editingPresentation.id}`, updatedPresentation).subscribe({
        next: () => {
          this.presentations = this.presentations.map((p) =>
            p.id === this.editingPresentation?.id ? updatedPresentation : p
          );
          this.resetForm();
        },
        error: (err) => console.error('Erro ao editar apresentação:', err),
      });
    } else {
      // Add new presentation
      const newPresentation: Omit<Presentation, 'id'> = {
        title: this.title,
        presenter: this.presenter,
        criteria: this.criteria,
      };

      this.http.post<Presentation>(this.baseUrl, newPresentation).subscribe({
        next: (data) => {
          this.presentations.push(data);
          this.resetForm();
        },
        error: (err) => console.error('Erro ao adicionar apresentação:', err),
      });
    }
  }

  // Reset form
  resetForm(): void {
    this.title = '';
    this.presenter = '';
    this.criteria = [{ id: this.generateId(), name: '', weight: 1 }];
    this.editingPresentation = null;
  }

  // Add a new criterion
  addCriteria(): void {
    this.criteria.push({ id: this.generateId(), name: '', weight: 1 });
  }

  // Update a specific criterion
  updateCriteria(index: number, field: keyof Criterion, value: string | number): void {
    this.criteria[index] = {
      ...this.criteria[index],
      [field]: value,
    };
  }

  // Edit a presentation
  handleEdit(presentation: Presentation): void {
    this.editingPresentation = presentation;
    this.title = presentation.title;
    this.presenter = presentation.presenter;
    this.criteria = [...presentation.criteria];
  }

  // Delete a presentation
  handleDelete(id: string): void {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        this.presentations = this.presentations.filter((p) => p.id !== id);
      },
      error: (err) => console.error('Erro ao deletar apresentação:', err),
    });
  }
}
