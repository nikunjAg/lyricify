import mongoose from 'mongoose';

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;
const DBNAME = process.env.MONGO_DBNAME;
const MONGODB = `mongodb+srv://${USERNAME}:${PASSWORD}@lyricify-cluster-0.pyvz65r.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    await mongoose.connect(MONGODB);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log(`Error connecting to MongoDB`, error);
    process.exit(-1);
  }
}

export { connect };