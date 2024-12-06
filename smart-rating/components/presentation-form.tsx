import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Criterion } from "../app/type";
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar IDs únicos

interface PresentationFormProps {
  onSubmit: (data: { title: string; presenter: string; criteria: Criterion[] }) => void;
  initialValues?: { title: string; presenter: string; criteria: Criterion[] } | null;
}

export function PresentationForm({ onSubmit, initialValues }: PresentationFormProps) {
  const [title, setTitle] = useState<string>("");
  const [presenter, setPresenter] = useState<string>("");
  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: uuidv4(), name: "", weight: 1 },
  ]);

  // Preenche os valores iniciais ao editar
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setPresenter(initialValues.presenter);
      setCriteria(initialValues.criteria);
    }
  }, [initialValues]);

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, presenter, criteria });
    setTitle("");
    setPresenter("");
    setCriteria([{ id: uuidv4(), name: "", weight: 1 }]);
  };

  // Adiciona um novo critério
  const addCriteria = () => {
    setCriteria((prevCriteria) => [
      ...prevCriteria,
      { id: uuidv4(), name: "", weight: 1 },
    ]);
  };

  // Atualiza um critério específico
  const updateCriteria = (index: number, field: keyof Criterion, value: string | number) => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion, i) =>
        i === index ? { ...criterion, [field]: value } : criterion
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {initialValues ? "Editar Apresentação" : "Nova Apresentação"}
      </h2>
      <div>
        <Label htmlFor="title" className="text-gray-700 font-medium">Título da Apresentação</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da apresentação"
          required
          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-2 text-black"
        />
      </div>
      <div>
        <Label htmlFor="presenter" className="text-gray-700 font-medium">Apresentador</Label>
        <Input
          id="presenter"
          value={presenter}
          onChange={(e) => setPresenter(e.target.value)}
          placeholder="Nome do apresentador"
          required
          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-2 text-black"
        />
      </div>
      {criteria.map((criterion) => (
        <div key={criterion.id} className="flex space-x-4 items-end mt-4">
          <div className="flex-grow">
            <Label htmlFor={`criterion-${criterion.id}`} className="text-gray-700 font-medium">Critério</Label>
            <Input
              id={`criterion-${criterion.id}`}
              value={criterion.name}
              onChange={(e) =>
                updateCriteria(
                  criteria.findIndex((c) => c.id === criterion.id),
                  "name",
                  e.target.value
                )
              }
              placeholder="Descrição do critério"
              required
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-2 text-black"
            />
          </div>
          <div>
            <Label htmlFor={`weight-${criterion.id}`} className="text-gray-700 font-medium">Peso</Label>
            <Input
              id={`weight-${criterion.id}`}
              type="number"
              min="1"
              max="10"
              value={criterion.weight}
              onChange={(e) =>
                updateCriteria(
                  criteria.findIndex((c) => c.id === criterion.id),
                  "weight",
                  Number(e.target.value)
                )
              }
              placeholder="Peso"
              required
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-2 w-20 text-black"
            />
          </div>
        </div>
      ))}
      <div className="flex space-x-4 mt-6">
        <Button type="button" onClick={addCriteria} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Adicionar Critério
        </Button>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          {initialValues ? "Salvar Alterações" : "Cadastrar Apresentação"}
        </Button>
      </div>
    </form>
  );
}
