"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Tipagem dos resultados
interface Result {
  id: string;
  title: string;
  presenter: string;
  averageScore: number;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    // Conecta ao WebSocket do servidor
    const socket = io("http://localhost:5000");

    // Recebe os resultados iniciais e atualizações em tempo real
    socket.on("results", (data: Result[]) => {
      setResults(data);
    });

    // Limpa a conexão ao desmontar o componente
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Resultados em Tempo Real</h1>
      {results.length === 0 ? (
        <p className="text-lg text-gray-100 bg-gray-800 p-4 rounded-lg shadow-md">
          Nenhum resultado disponível no momento.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {results.map((result) => (
            <li
              key={result.id}
              className="p-6 bg-white text-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-2">{result.title}</h3>
              <p className="text-lg text-gray-600 mb-4">
                <span className="font-semibold">Apresentador:</span> {result.presenter}
              </p>
              <p className="text-xl font-bold text-blue-500">
                Nota Média: {result.averageScore.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-12">
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Voltar para Home
        </a>
      </div>
    </div>
  );
}
