"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white flex flex-col items-center px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full text-center transform transition-transform hover:scale-105 hover:shadow-xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Sobre a Equipe</h1>
        <p className="text-lg text-gray-700 mb-8">
          Nossa equipe é composta por profissionais dedicados e apaixonados por tecnologia e educação. 
          Trabalhamos incansavelmente para desenvolver ferramentas que facilitem o processo de avaliação 
          e melhorem a experiência de apresentações em eventos acadêmicos, corporativos e educacionais.
        </p>
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Membros da Equipe:</h2>
        <ul className="list-none">
          {['Eduardo Silva', 'João Matheus', 'Marcus de Faria'].map((member, index) => (
            <li
              key={index}
              className="text-lg font-medium text-gray-800 py-2 px-4 bg-gray-100 rounded-full mb-4 transition-transform transform hover:scale-105"
            >
              {member}
            </li>
          ))}
        </ul>
      </div>
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
