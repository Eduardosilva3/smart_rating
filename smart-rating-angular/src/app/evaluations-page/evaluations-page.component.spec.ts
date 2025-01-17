import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationsPageComponent } from './evaluations-page.component';

describe('EvaluationsPageComponent', () => {
  let component: EvaluationsPageComponent;
  let fixture: ComponentFixture<EvaluationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
