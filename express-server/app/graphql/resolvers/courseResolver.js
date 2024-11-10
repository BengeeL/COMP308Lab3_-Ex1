import CourseModel from "../../models/courseModel.js";

export class CourseResolver {
  /// *************************************************
  /// ****************     Query     ******************
  /// *************************************************

  async courses() {
    try {
      const courses = await CourseModel.find().populate("User");
      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw new Error("Failed to fetch courses");
    }
  }

  async courseById(root, params) {
    const courseInfo = CourseModel.findById(params.id).exec();
    if (!courseInfo) {
      throw new Error("Error");
    }
    return courseInfo;
  }

  /// **************************************************
  /// ****************    Mutation    ******************
  /// **************************************************

  async createCourse(root, params) {
    console.log("params in create course:", params);
    const courseModel = new CourseModel(params);

    try {
      const newCourse = await courseModel.save();
      return newCourse;
    } catch (error) {
      console.error("Error creating course:", error);
      if (error.name === "ValidationError") {
        // Handle Mongoose validation errors
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        throw new Error(validationErrors.join(", "));
      } else {
        throw new Error("Error creating course");
      }
    }
  }

  async updateCourse(parent, args) {
    console.log("args in update course:", args);
    try {
      const { id, ...update } = args;
      const options = { new: true };
      let course = await CourseModel.findByIdAndUpdate(id, update, options);

      if (!course) {
        throw new Error(`Course with ID ${id} not found`);
      }

      // Explicitly call save to trigger the pre-save hook
      course = await course.save();

      return course;
    } catch (error) {
      console.error("Error updating course:", error);
      throw new Error("Failed to update course");
    }
  }

  async deleteCourse(parent, args) {
    try {
      const course = await CourseModel.findByIdAndDelete(args.id);
      if (!course) {
        throw new Error(`Course with ID ${args.id} not found`);
      }
      return args.id;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw new Error("Failed to delete course");
    }
  }
}

export default {
  CourseResolver,
};
