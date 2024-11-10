//
// A GraphQL schema that defines types, queries and mutations
//
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
} from "graphql";

const userResolverModule = await import("../resolvers/userResolver.js");
const userResolver = new userResolverModule.UserResolver();

const courseResolverModule = await import("../resolvers/courseResolver.js");
const { CourseResolver } = courseResolverModule.default;
const courseResolver = new CourseResolver();

export const userType = new GraphQLObjectType({
  name: "user",
  fields: function () {
    return {
      _id: { type: GraphQLID },
      studentNumber: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      address: {
        type: GraphQLString,
      },
      city: {
        type: GraphQLString,
      },
      phoneNumber: {
        type: GraphQLString,
      },
      program: {
        type: GraphQLString,
      },
      token: { type: GraphQLString },
    };
  },
});

export const userInputType = new GraphQLInputObjectType({
  name: "userInput",
  fields: function () {
    return {
      _id: { type: GraphQLID },
      studentNumber: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      address: {
        type: GraphQLString,
      },
      city: {
        type: GraphQLString,
      },
      phoneNumber: {
        type: GraphQLString,
      },
      program: {
        type: GraphQLString,
      },
    };
  },
});

const courseType = new GraphQLObjectType({
  name: "course",
  fields: function () {
    return {
      id: { type: GraphQLID },
      courseCode: {
        type: GraphQLString,
      },
      courseName: {
        type: GraphQLString,
      },
      section: {
        type: GraphQLString,
      },
      semester: {
        type: GraphQLString,
      },
      students: {
        type: new GraphQLList(userType), // Might need to user userType
        resolve: async (course) => {
          // Assuming you have a function to fetch users by their IDs
          return await userResolver.getUsersByIds(course.students);
        },
      },
    };
  },
});

// Define LogoutResponseType
const LogoutResponseType = new GraphQLObjectType({
  name: "LogoutResponse",
  fields: {
    message: { type: GraphQLString },
  },
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: userResolver.users,
      },
      user: {
        type: userType,
        args: {
          _id: {
            name: "_id",
            type: GraphQLID,
          },
        },
        resolve: userResolver.userById,
      },
      isLoggedIn: {
        type: GraphQLString,
        args: {
          email: {
            name: "email",
            type: GraphQLString,
          },
        },
        resolve: userResolver.isLoggedIn,
      },

      courses: {
        type: new GraphQLList(courseType),
        resolve: courseResolver.courses,
      },
      course: {
        type: courseType,
        args: {
          id: {
            name: "id",
            type: GraphQLString,
          },
        },
        resolve: courseResolver.courseById,
      },
    };
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        studentNumber: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        address: {
          type: new GraphQLNonNull(GraphQLString),
        },
        city: {
          type: new GraphQLNonNull(GraphQLString),
        },
        phoneNumber: {
          type: new GraphQLNonNull(GraphQLString),
        },
        program: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: userResolver.createUser,
    },

    loginUser: {
      type: userType,
      args: {
        email: {
          name: "email",
          type: GraphQLString,
        },
        password: {
          name: "password",
          type: GraphQLString,
        },
        token: {
          name: "token",
          type: GraphQLString,
        },
      },

      resolve: userResolver.loginUser,
    },

    logoutUser: {
      type: LogoutResponseType,
      resolve: userResolver.logOut,
    },

    updateUser: {
      type: userType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        studentNumber: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        address: {
          type: new GraphQLNonNull(GraphQLString),
        },
        city: {
          type: new GraphQLNonNull(GraphQLString),
        },
        phoneNumber: {
          type: new GraphQLNonNull(GraphQLString),
        },
        program: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: userResolver.updateUser,
    },

    deleteUser: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: userResolver.deleteUser,
    },

    // COURSES
    createCourse: {
      type: courseType,
      args: {
        courseCode: {
          type: new GraphQLNonNull(GraphQLString),
        },
        courseName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        section: {
          type: new GraphQLNonNull(GraphQLString),
        },
        semester: {
          type: new GraphQLNonNull(GraphQLString),
        },
        students: {
          type: new GraphQLList(userInputType),
        },
      },
      resolve: courseResolver.createCourse,
    },

    updateCourse: {
      type: courseType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        courseCode: {
          type: new GraphQLNonNull(GraphQLString),
        },
        courseName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        section: {
          type: new GraphQLNonNull(GraphQLString),
        },
        semester: {
          type: new GraphQLNonNull(GraphQLString),
        },
        students: {
          type: new GraphQLList(userInputType),
        },
      },
      resolve: courseResolver.updateCourse,
    },

    deleteCourse: {
      type: courseType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: courseResolver.deleteCourse,
    },
  },
});

export default new GraphQLSchema({ query: queryType, mutation: mutation });
