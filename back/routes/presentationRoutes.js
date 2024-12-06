const express = require("express");
const controller = require("../controllers/presentationController");

const router = express.Router();

router.get("/", controller.getAllPresentations);
router.post("/", controller.createPresentation);
router.put("/:id", controller.updatePresentation);
router.delete("/:id", controller.deletePresentation);

module.exports = router;
