const Redis = require("ioredis");
const redis = new Redis();

const presentationModel = require("./presentationModel");

const EVALUATIONS_KEY = "evaluations";

const loadEvaluations = async () => {
  try {
    const data = await redis.get(EVALUATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Erro ao carregar as avaliações do Redis:", err);
    return [];
  }
};

const saveEvaluations = async (evaluations) => {
  try {
    await redis.set(EVALUATIONS_KEY, JSON.stringify(evaluations));
  } catch (err) {
    console.error("Erro ao salvar as avaliações no Redis:", err);
  }
};

let evaluations = [];

loadEvaluations().then((data) => {
  evaluations = data;
});

module.exports = {
  getAllEvaluations: () => evaluations,

  getEvaluationsByPresentation: (presentationId) => {
    const presentation = presentationModel
      .getPresentations()
      .find((p) => p.id === presentationId);

    if (!presentation) return []; 

    return evaluations
      .filter((e) => e.presentationId === presentationId)
      .map((evaluation) => {
        const criterion = presentation.criteria.find(
          (c) => c.id === evaluation.criterionId
        );
        return {
          ...evaluation,
          criterionName: criterion ? criterion.name : "Critério Desconhecido",
          evaluatorName: evaluation.evaluatorName || "Avaliador Desconhecido",
        };
      });
  },

  addEvaluation: async (evaluation) => {
    evaluations.push(evaluation);
    await saveEvaluations(evaluations);
  },
};
