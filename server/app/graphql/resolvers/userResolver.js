import UserModel from "../../models/userModel.js";

import { compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { verify, JsonWebTokenError, sign } = pkg;

import { genSalt, hash } from "bcrypt";
const saltRounds = 10;

const JWT_SECRET = "real_secret"; // generate this elsewhere
const jwtExpirySeconds = 300;

// User resolvers
class UserResolver {
  /// *************************************************
  /// ****************     Query     ******************
  /// *************************************************

  async users() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  async userById(root, params) {
    const userInfo = UserModel.findById(params._id).exec();
    if (!userInfo) {
      throw new Error("Error");
    }
    return userInfo;
  }

  async getUsersByIds(userIds) {
    // Assuming you have a User model to interact with the database
    return await UserModel.find({ _id: { $in: userIds } });
  }

  async isLoggedIn(root, params, context) {
    console.log(params);
    console.log("in isLoggedIn.....");
    console.log(context.req.cookies["token"]);
    console.log("token: ");

    // Obtain the session token from the requests cookies,
    // which come with every request
    const token = context.req.cookies.token;
    console.log("token from request: ", token);
    // if the cookie is not set, return 'auth'
    if (!token) {
      console.log("no token, so return auth");
      return "auth";
    }
    var payload;
    try {
      payload = verify(token, JWT_SECRET);
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        // the JWT is unauthorized, return a 401 error
        console.log("jwt error");
        return context.res.status(401).end();
      }
      // otherwise, return a bad request error
      console.log("bad request error");
      return context.res.status(400).end();
    }
    console.log("email from payload: ", payload.email);
    // Finally, token is ok, return the email given in the token
    // res.status(200).send({ screen: payload.email });
    return payload.email;
  }

  /// **************************************************
  /// ****************    Mutation    ******************
  /// **************************************************

  async createUser(root, params) {
    console.log("params in create user:", params);
    const userModel = new UserModel(params);

    try {
      // Hash the password before saving
      const salt = await genSalt(saltRounds);
      const hashedPassword = await hash(userModel.password, salt);
      userModel.password = hashedPassword;

      const newUser = await userModel.save();
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.name === "ValidationError") {
        // Handle Mongoose validation errors
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        throw new Error(validationErrors.join(", "));
      } else {
        throw new Error("Error creating user");
      }
    }
  }

  async loginUser(root, params, context) {
    const userInfo = await UserModel.findOne({
      email: params.email,
    }).exec();

    console.log(userInfo);

    if (!userInfo) {
      throw new Error("Error - user not found");
    }

    // check if the password is correct
    const isValidPassword = await compare(params.password, userInfo.password);
    if (!isValidPassword) {
      // return "auth";
      throw new Error("Invalid login credentials");
    }

    const token = sign(
      { _id: userInfo._id, email: userInfo.email },
      JWT_SECRET,
      { algorithm: "HS256", expiresIn: jwtExpirySeconds }
    );

    // Create a new object that includes the user information and the token
    const userWithToken = {
      ...userInfo._doc, // Spread the properties of userInfo
      token: token,
    };

    console.log("userWithToken: ", userWithToken);

    context.res.cookie("token", token, {
      maxAge: jwtExpirySeconds * 1000,
      httpOnly: true,
    });

    return userWithToken;
  }

  async logOut(parent, args, { res }) {
    console.log("in logout.....");
    res.clearCookie("token");
    return "Logged out successfully!";
  }

  async updateUser(parent, args) {
    console.log("args in update user:", args);
    try {
      const { _id, password, ...update } = args;
      const options = { new: true };

      let user = await UserModel.findByIdAndUpdate(_id, update, options);

      if (!user) {
        throw new Error(`User with ID ${_id} not found`);
      }

      // Explicitly call save to trigger the pre-save hook
      user = await user.save();

      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }

  async deleteUser(parent, args) {
    try {
      const user = await UserModel.findByIdAndDelete(args.id);
      if (!user) {
        throw new Error(`User with ID ${args.id} not found`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
}

export { UserResolver };
