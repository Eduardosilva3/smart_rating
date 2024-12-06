import React, { useState } from "react";
import { Presentation, Criterion, Evaluation } from "@/app/type";

interface EvaluationFormProps {
  presentation: Presentation;
  onSubmit: (evaluation: Evaluation) => void; // Alinhado ao tipo correto
}

export function EvaluationForm({ presentation, onSubmit }: EvaluationFormProps) {
  const [scores, setScores] = useState<Record<string, number>>({}); // Armazena as notas para cada critério

  // Lida com mudanças nos inputs
  const handleChange = (criterionId: string, score: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [criterionId]: score,
    }));
  };

  // Lida com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Envia uma avaliação para cada critério
    Object.entries(scores).forEach(([criterionId, score]) => {
      onSubmit({
        presentationId: presentation.id,
        criterionId,
        score,
      });
    });

    setScores({}); // Limpa as notas após o envio
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{presentation.title}</h3>
      <p className="text-lg text-gray-600 mb-6">
        <span className="font-semibold">Apresentador:</span> {presentation.presenter}
      </p>
      <div className="space-y-4">
        {presentation.criteria.map((criterion: Criterion) => (
          <div key={criterion.id || `${criterion.name}-${criterion.weight}`} className="flex items-center space-x-4">
            <label htmlFor={`score-${criterion.id}`} className="flex-grow text-lg text-gray-700">
              {criterion.name} (Peso: {criterion.weight})
            </label>
            <input
              id={`score-${criterion.id}`}
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={scores[criterion.id] ?? ""}
              onChange={(e) => handleChange(criterion.id, Number(e.target.value))}
              className="border rounded-lg p-2 w-24 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Enviar Avaliação
      </button>
    </form>
  );
}
