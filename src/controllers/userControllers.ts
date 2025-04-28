import { Request, Response } from 'express';
import { User } from '../models/User';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate('friends').populate('thoughts');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('friends')
      .populate('thoughts');

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }

    // BONUS: delete user's associated thoughts if you want later

    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
