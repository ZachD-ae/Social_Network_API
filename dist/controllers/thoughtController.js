"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThought = exports.updateThought = exports.getThoughtById = exports.getAllThoughts = exports.createThought = void 0;
const mongoose_1 = require("mongoose");
const Thought_1 = __importDefault(require("../models/Thought"));
const User_1 = __importDefault(require("../models/User"));
const createThought = async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const newThought = await Thought_1.default.create({ thoughtText, username });
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found to attach this thought.' });
            return;
        }
        res.status(201).json(newThought);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
};
exports.createThought = createThought;
const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought_1.default.find();
        res.json(thoughts);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
exports.getAllThoughts = getAllThoughts;
const getThoughtById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid Thought ID format' });
            return;
        }
        const thought = await Thought_1.default.findById(id);
        if (!thought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
exports.getThoughtById = getThoughtById;
const updateThought = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedThought = await Thought_1.default.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        res.json(updatedThought);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
};
exports.updateThought = updateThought;
const deleteThought = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedThought = await Thought_1.default.findByIdAndDelete(id);
        if (!deletedThought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        await User_1.default.findOneAndUpdate({ username: deletedThought.username }, { $pull: { thoughts: deletedThought._id } });
        res.json({ message: `Thought '${deletedThought.thoughtText}' deleted and removed from user.` });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
exports.deleteThought = deleteThought;
