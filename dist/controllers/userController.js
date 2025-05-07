"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    try {
        const newUser = await User_1.default.create(req.body);
        res.status(201).json(newUser);
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
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.status(200).json(users);
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
exports.getAllUsers = getAllUsers;
