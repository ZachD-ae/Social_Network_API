import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, addFriend, removeFriend} from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById); 
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:userId/friends/:friendId', addFriend); 
router.delete('/:userId/friends/:friendId', removeFriend); 

export default router;
