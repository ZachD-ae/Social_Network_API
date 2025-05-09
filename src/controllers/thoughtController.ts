import { Types } from 'mongoose';
import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    const newThought = await Thought.create({ thoughtText, username });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found to attach this thought.' });
      return;
    }

    res.status(201).json(newThought);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getAllThoughts = async (_req: Request, res: Response): Promise<void> => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };

  export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid Thought ID format' });
        return;
      }
  
      const thought = await Thought.findById(id);
  
      if (!thought) {
        res.status(404).json({ error: 'Thought not found' });
        return;
      }
  
      res.json(thought);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };

  export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const updatedThought = await Thought.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedThought) {
        res.status(404).json({ error: 'Thought not found' });
        return;
      }
  
      res.json(updatedThought);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: 'Unknown error occurred' });
      }
    }
  };

  export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const deletedThought = await Thought.findByIdAndDelete(id);
  
      if (!deletedThought) {
        res.status(404).json({ error: 'Thought not found' });
        return;
      }
  
      await User.findOneAndUpdate(
        { username: deletedThought.username },
        { $pull: { thoughts: deletedThought._id } }
      );
  
      res.json({ message: `Thought '${deletedThought.thoughtText}' deleted and removed from user.` });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };

  export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
  
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $push: {
            reactions: {
              reactionBody,
              username
            }
          }
        },
        {
          new: true,
          runValidators: true
        }
      );
  
      if (!updatedThought) {
        res.status(404).json({ error: 'Thought not found' });
        return;
      }
  
      res.json(updatedThought);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: 'Unknown error occurred' });
      }
    }
  };

  export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { thoughtId, reactionId } = req.params;
  
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $pull: {
            reactions: { reactionId }
          }
        },
        { new: true }
      );
  
      if (!updatedThought) {
        res.status(404).json({ error: 'Thought not found' });
        return;
      }
  
      res.json(updatedThought);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };
  

  
  
  