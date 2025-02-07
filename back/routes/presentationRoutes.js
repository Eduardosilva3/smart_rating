// Atualize 'presentationRoutes.js'

const express = require("express");
const controller = require("../controllers/presentationController");

const router = express.Router();

router.get("/", controller.getAllPresentations);
router.post("/", controller.createPresentation);
router.put("/:id", controller.updatePresentation);
router.delete("/:id", controller.deletePresentation);

// Nova rota para doações
router.post("/:id/donation", controller.addDonation);

module.exports = router;
