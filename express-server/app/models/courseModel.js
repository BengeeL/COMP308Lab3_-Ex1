import pkg from "mongoose";
const { model, Schema } = pkg;

const courseSchema = new Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  section: { type: String, required: true },
  semester: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

export default model("Course", courseSchema);
