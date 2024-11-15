import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";

const saltRounds = 10;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: [
        (password) => password && password.length >= 6,
        "Password should be longer",
      ],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Use a pre-save hook to hash the user's password before saving the user
userSchema.pre("save", function (next) {
  // hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// Create an instance method to validate the user's password
userSchema.methods.authenticate = function (password) {
  // compare the hashed password of the database
  // with the hashed version of the input password
  return this.password === bcrypt.hashSync(password, saltRounds);
};

const User = model("User", userSchema);

export default User;
