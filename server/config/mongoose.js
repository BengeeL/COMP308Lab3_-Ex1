import mongoose from "mongoose";

// Define the Mongoose configuration method
function configureMongoose(dbUri) {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(dbUri)
    .then(() => console.log(`Connected to MongoDB at ${dbUri}`))
    .catch((error) => {
      console.error("Error in db connection", error);
    });

  // Return the Mongoose connection instance
  return db;
}

export default configureMongoose;
