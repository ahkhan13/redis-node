import mongoose from 'mongoose';
const MONGOURI = 'mongodb+srv://aftab:aftab@cluster0.qwvns.mongodb.net/crud-api?retryWrites=true&w=majority';
export const initiateDBConnection = async () => {
  try {
    await mongoose.connect(MONGOURI);
    console.log('DB Connected Successfully');
  } catch (err) {
    console.log('DB Connection error', err);
  }
};