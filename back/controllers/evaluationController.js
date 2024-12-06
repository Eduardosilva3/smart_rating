const evaluationModel = require("../models/evaluationModel");

exports.createEvaluation = (req, res) => {
  const { presentationId, criterionId, score } = req.body;

  if (!presentationId || !criterionId || score === undefined) {
    return res
      .status(400)
      .json({ message: "Dados incompletos. Envie presentationId, criterionId e score." });
  }

  // Adiciona a avaliação individual ao modelo
  evaluationModel.addEvaluation({ presentationId, criterionId, score });

  res.status(201).json({ message: "Avaliação registrada com sucesso" });
};

exports.getEvaluationsByPresentation = (req, res) => {
  const { presentationId } = req.params;

  if (!presentationId) {
    return res.status(400).json({ message: "PresentationId é obrigatório" });
  }

  const evaluations = evaluationModel.getEvaluationsByPresentation(presentationId);
  res.json(evaluations);
};
