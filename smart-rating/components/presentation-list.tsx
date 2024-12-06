import { Presentation } from "../app/type";

interface PresentationListProps {
  presentations: Presentation[];
  onEdit: (presentation: Presentation) => void;
  onDelete: (id: string) => void;
}

export function PresentationList({
  presentations,
  onEdit,
  onDelete,
}: PresentationListProps) {
  return (
    <ul className="space-y-6">
      {presentations.map((presentation) => (
        <li
          key={presentation.id}
          className="border p-6 rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {presentation.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Apresentador: {presentation.presenter}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                onClick={() => onEdit(presentation)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                onClick={() => onDelete(presentation.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
