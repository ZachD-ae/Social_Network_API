"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = require("../controllers/thoughtController");
const router = (0, express_1.Router)();
// POST /api/thoughts
router.post('/', thoughtController_1.createThought);
router.get('/', thoughtController_1.getAllThoughts);
router.get('/:id', thoughtController_1.getThoughtById);
router.put('/:id', thoughtController_1.updateThought);
router.delete('/:id', thoughtController_1.deleteThought);
router.post('/:thoughtId/reactions', thoughtController_1.addReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughtController_1.removeReaction);
exports.default = router;
