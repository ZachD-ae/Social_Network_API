import { Router } from 'express';
import {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtControllers';

const router = Router();


router.route('/')
  .get(getAllThoughts)
  .post(createThought);


router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


router.route('/:thoughtId/reactions')
  .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

export default router;
