import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../../controllers/userControllers';

const router = Router();


router.route('/')
  .get(getAllUsers)
  .post(createUser);


router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

export default router;
