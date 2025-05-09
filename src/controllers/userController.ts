import { Types } from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid user ID format' });
        return; 
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return; 
      }
  
      res.json(user);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };

  export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,              
        runValidators: true     
      });
  
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: 'Unknown error occurred' });
      }
    }
  };

  export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json({ message: `User '${deletedUser.username}' deleted.` });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };
  
    export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, 
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};


export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};