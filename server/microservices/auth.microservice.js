dotenv.config();

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";

import config from "../config/config.js";
import configureExpress from "../config/express.js";
import configureMongoose from "../config/mongoose.js";

// Import the GraphQL schema
import typeDefs from "../schemas/user.schema.js";
import resolvers from "../resolvers/user.resolver.js";

// Create a new Mongoose connection instance
const db = configureMongoose(config.authDb);

// Create a new Express application instance
const app = configureExpress();

// Define the port
const port = process.env.AUTH_MICROSERVICE_PORT || 4001;

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
  context: ({ req, res }) => ({ req, res }),
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  // Start the server
  app.listen({ port }, () =>
    console.log(
      `🚀 Authentication microservice ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
});
