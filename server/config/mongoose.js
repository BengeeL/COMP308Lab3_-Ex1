// Load the module dependencies:
//  config.js module and mongoose module
import { db as _db } from "./config.js";
import pkg from "mongoose";
const { connect } = pkg;

// Define the Mongoose configuration method
export default async function () {
  // Use Mongoose to connect to MongoDB
  const db = connect(_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log("Error in db connection", err);
    });

  // Load the 'User' model
  await import("../app/models/userModel.js");
  // Load the 'Course' model
  await import("../app/models/courseModel.js");

  // Return the Mongoose connection instance
  return db;
}
