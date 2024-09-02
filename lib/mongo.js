import mongoose from 'mongoose';

async function connectToDatabase() {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = await mongoose.connect(uri, options);
  return client;
}

export default connectToDatabase;
