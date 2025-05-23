"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDb = async () => {
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/socialNetworkDB');
        console.log('✅ MongoDB connected');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); // Exit if DB fails
    }
};
exports.default = connectToDb;
