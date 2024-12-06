const express = require("express");
const router = express.Router();
const evaluationController = require("../controllers/evaluationController");

// Rota para criar uma avaliação
router.post("/", evaluationController.createEvaluation);

// Rota para obter avaliações por apresentação
router.get("/:presentationId", evaluationController.getEvaluationsByPresentation);

module.exports = router;
