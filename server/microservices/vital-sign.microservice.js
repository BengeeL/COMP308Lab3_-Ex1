dotenv.config();

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";

import config from "../config/config.js";
import configureExpress from "../config/express.js";
import configureMongoose from "../config/mongoose.js";

// Import the GraphQL schema
import typeDefs from "../schemas/vital-sign.schema.js";
import resolvers from "../resolvers/vital-sign.resolver.js";

const jwtSecretKey = config.secretKey;

// Create a new Mongoose connection instance
const db = configureMongoose(config.vitalSignDb);

// Create a new Express application instance
const app = configureExpress();

// Define the port
const port = process.env.VITAL_SIGN_MICROSERVICE_PORT || 4002;

// Add cors middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:4000",
      "https://studio.apollographql.com",
    ], // Adjust the origin according to your micro frontends' host
    credentials: true, // Allow cookies to be sent
  })
);

// Create a new ApolloServer instance
const server = new ApolloServer({
  // Use buildFederatedSchema to combine your schema and resolvers
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req, res }) => {
    const token = req.cookies["token"];

    console.log("in vital sign microservice context - token: ", token);

    if (!token) {
      req.isAuthenticated = false;
      return { req, res };
    }

    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      console.log("in vital sign microservice context - decoded: ", decoded);
      const { username } = decoded;
      req.isAuthenticated = username ? true : false;
      return { req, res };
    } catch (error) {
      console.error("Error in vital sign microservice context: ", error);
      throw new Error("Your session expired. Sign in again.");
    }
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  // Start the server
  app.listen({ port }, () =>
    console.log(
      `🚀 Vital Sign microservice ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
});
