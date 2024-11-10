import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;

const Schema = _Schema;

const UserSchema = new Schema({
  studentNumber: { type: String },
  password: {
    type: String,
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
    unique: true,
    trim: true,
  },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  program: { type: String },
});

// // hash the passwords before saving
// UserSchema.pre("save", async function () {
//   const salt = await genSalt(saltRounds);
//   const hashedPassword = await hash(this.password, salt);
//   this.password = hashedPassword;
// });

export default model("User", UserSchema);
