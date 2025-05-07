import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit if DB fails
  }
};

export default connectToDb;
