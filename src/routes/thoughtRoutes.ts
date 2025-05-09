import { Router } from 'express';
import { createThought, getAllThoughts, getThoughtById, updateThought, deleteThought, addReaction, removeReaction } from '../controllers/thoughtController';

const router = Router();

// POST /api/thoughts
router.post('/', createThought);
router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);
router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);


export default router;
