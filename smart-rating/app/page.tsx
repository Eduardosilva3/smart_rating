import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-10 text-center">
        Smart Rating
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl px-4">
        <Link href="/presentations">
          <Button className="w-full bg-white text-blue-600 hover:bg-gray-200 hover:scale-105 transform transition">
            Gerenciar Apresentações
          </Button>
        </Link>
        <Link href="/evaluations">
          <Button className="w-full bg-white text-blue-600 hover:bg-gray-200 hover:scale-105 transform transition">
            Realizar Avaliações
          </Button>
        </Link>
        <Link href="/results">
          <Button className="w-full bg-white text-blue-600 hover:bg-gray-200 hover:scale-105 transform transition">
            Ver Resultados
          </Button>
        </Link>
        <Link href="/about">
          <Button className="w-full bg-white text-blue-600 hover:bg-gray-200 hover:scale-105 transform transition">
            Sobre a Equipe
          </Button>
        </Link>
      </div>
    </div>
  );
}
