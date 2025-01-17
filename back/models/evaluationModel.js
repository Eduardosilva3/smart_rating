const Redis = require("ioredis");
const redis = new Redis();

const presentationModel = require("./presentationModel");

const EVALUATIONS_KEY = "evaluations";

// Função para carregar avaliações do Redis
const loadEvaluations = async () => {
  try {
    const data = await redis.get(EVALUATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Erro ao carregar as avaliações do Redis:", err);
    return [];
  }
};

// Função para salvar avaliações no Redis
const saveEvaluations = async (evaluations) => {
  try {
    await redis.set(EVALUATIONS_KEY, JSON.stringify(evaluations));
  } catch (err) {
    console.error("Erro ao salvar as avaliações no Redis:", err);
  }
};

// Variável evaluations será carregada do Redis ao inicializar
let evaluations = [];

loadEvaluations().then((data) => {
  evaluations = data;
});

module.exports = {
  // Obtém todas as avaliações
  getAllEvaluations: () => evaluations,

  // Obtém avaliações de uma apresentação específica, incluindo nomes de critérios e avaliadores
  getEvaluationsByPresentation: (presentationId) => {
    // Busca a apresentação pelo ID
    const presentation = presentationModel
      .getPresentations()
      .find((p) => p.id === presentationId);

    if (!presentation) return []; // Retorna vazio se a apresentação não existir

    return evaluations
      .filter((e) => e.presentationId === presentationId)
      .map((evaluation) => {
        // Busca o nome do critério correspondente
        const criterion = presentation.criteria.find(
          (c) => c.id === evaluation.criterionId
        );
        return {
          ...evaluation,
          criterionName: criterion ? criterion.name : "Critério Desconhecido",
          evaluatorName: evaluation.evaluatorName || "Avaliador Desconhecido", // Adiciona o nome do avaliador
        };
      });
  },

  // Adiciona uma nova avaliação
  addEvaluation: async (evaluation) => {
    evaluations.push(evaluation);
    await saveEvaluations(evaluations);
  },
};
