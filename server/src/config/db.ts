import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const {
      MONGO_USER_TWEETHOUSE: user,
      MONGO_PASSWORD_TWEETHOUSE: password,
      MONGO_DBNAME_TWEETHOUSE: db,
      MONGO_CLUSTER_URL_TWEETHOUSE: clusterUrl,
    } = process.env;

    const uri = `mongodb+srv://${user}:${password}@${clusterUrl}/${db}?retryWrites=true&w=majority`;

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
