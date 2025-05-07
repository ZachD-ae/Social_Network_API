import { Router } from 'express';
import { createThought, getAllThoughts, getThoughtById, updateThought, deleteThought } from '../controllers/thoughtController';

const router = Router();

// POST /api/thoughts
router.post('/', createThought);
router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);


export default router;
