"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EvaluationForm } from "@/components/evaluation-form";
import { Presentation, Evaluation } from "@/app/type";
import { Button } from "@/components/ui/button";

export default function EvaluationsPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [selectedEvaluations, setSelectedEvaluations] = useState<Record<string, Evaluation[]>>({});

  // Busca apresentações
  useEffect(() => {
    const fetchPresentations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/presentations");
        const data = await response.json();
        setPresentations(data);
      } catch (error) {
        console.error("Erro ao buscar apresentações:", error);
      }
    };

    fetchPresentations();
  }, []);

  // Busca avaliações de uma apresentação
  const fetchEvaluations = async (presentationId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/evaluations/${presentationId}`);
      const data: Evaluation[] = await response.json();

      // Filtra avaliações com criterionId válido
      const validEvaluations = data.filter((evaluation) => evaluation.criterionId);

      setSelectedEvaluations((prev) => ({
        ...prev,
        [presentationId]: validEvaluations,
      }));
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  // Submete uma avaliação
  const handleSubmit = async (evaluation: Evaluation) => {
    try {
      const response = await fetch("http://localhost:5000/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evaluation),
      });
      if (response.ok) {
        await fetchEvaluations(evaluation.presentationId); // Atualiza avaliações
      }
    } catch (error) {
      console.error("Erro ao registrar avaliação:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Realizar Avaliações</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {presentations.map((presentation) => (
          <div key={presentation.id} className="p-6 bg-white text-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">{presentation.title}</h3>
            <p className="text-lg text-gray-700 mb-6">Apresentador: {presentation.presenter}</p>
            <EvaluationForm presentation={presentation} onSubmit={handleSubmit} />
            <Button
              onClick={() => fetchEvaluations(presentation.id)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-transform transform hover:scale-105"
            >
              Ver Avaliações
            </Button>
            {selectedEvaluations[presentation.id] && (
              <ul className="mt-4 space-y-4">
                {selectedEvaluations[presentation.id].map((evaluation, index) => (
                  <li
                    key={`${evaluation.criterionId}-${index}`}
                    className="p-4 bg-gray-100 rounded-md shadow-sm transition hover:shadow-md"
                  >
                    <p className="font-medium">
                      Critério:{" "}
                      <span className="font-normal text-gray-700">
                        {evaluation.criterionName}
                      </span>
                    </p>
                    <p className="font-medium">
                      Nota: <span className="font-normal text-blue-500">{evaluation.score}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {typeof window !== "undefined" && (
        <div className="mt-12 text-center">
          <Link href="/">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
              Voltar para Home
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
