import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";

import configureExpress from "./config/express.js";

// Create a new Express application instance
const app = configureExpress();

// Define the port
const port = process.env.API_GATEWAY_PORT || 4000;

// Configure the Apollo Gateway
const gateway = new ApolloGateway({
  serviceList: [
    { name: "auth", url: "http://localhost:4001/graphql" },
    { name: "vitalSign", url: "http://localhost:4002/graphql" },
  ],
});

// Initialize an Apollo Server with Apollo Gateway
const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

// Apply the Apollo Server to the Express application
server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port }, () => {
    console.log(
      `🚀 Gateway ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
});
