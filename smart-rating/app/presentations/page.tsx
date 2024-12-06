"use client";

import { useState, useEffect } from "react";
import { PresentationForm } from "@/components/presentation-form";
import { PresentationList } from "@/components/presentation-list";
import { Presentation } from "../type";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [editingPresentation, setEditingPresentation] = useState<Presentation | null>(null);

  // Busca as apresentações
  useEffect(() => {
    fetch("http://localhost:5000/api/presentations")
      .then((res) => res.json())
      .then((data) => setPresentations(data))
      .catch((err) => console.error("Erro ao buscar apresentações:", err));
  }, []);

  // Adiciona ou edita uma apresentação
  const handleSubmit = (newPresentation: Omit<Presentation, "id">) => {
    if (editingPresentation) {
      // Editar apresentação existente
      fetch(`http://localhost:5000/api/presentations/${editingPresentation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editingPresentation, ...newPresentation }),
      })
        .then(() => {
          setPresentations((prev) =>
            prev.map((p) =>
              p.id === editingPresentation.id
                ? { ...editingPresentation, ...newPresentation }
                : p
            )
          );
          setEditingPresentation(null); // Reseta o estado de edição
        })
        .catch((err) => console.error("Erro ao editar apresentação:", err));
    } else {
      // Adicionar nova apresentação
      fetch("http://localhost:5000/api/presentations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPresentation),
      })
        .then((res) => res.json())
        .then((data) => setPresentations((prev) => [...prev, data]))
        .catch((err) => console.error("Erro ao adicionar apresentação:", err));
    }
  };

  // Define uma apresentação para edição
  const handleEdit = (presentation: Presentation) => {
    setEditingPresentation(presentation);
  };

  // Remove uma apresentação
  const handleDelete = (id: string) => {
    fetch(`http://localhost:5000/api/presentations/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPresentations((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Erro ao deletar apresentação:", err));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-10">
      <h1 className="text-4xl font-bold mb-8">Gerenciar Apresentações</h1>
      <div className="w-full max-w-4xl px-4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editingPresentation ? "Editar Apresentação" : "Nova Apresentação"}
          </h2>
          <PresentationForm
            onSubmit={handleSubmit}
            initialValues={editingPresentation} // Passa valores iniciais para edição
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Lista de Apresentações</h2>
          <PresentationList
            presentations={presentations}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {typeof window !== "undefined" && (
        <div className="mt-8">
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
