// Set the 'NODE_ENV' variable to 'development' if not set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load the module dependencies
import configureMongoose from "./config/mongoose.js";
import configureExpress from "./config/express.js";
import { graphqlHTTP } from "express-graphql";
import userSchema from "./app/graphql/schemas/schema.js";
import cors from "cors";

// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();

const corsOptions = {
  origin: ["http://localhost:3000"], // Allow requests from http://localhost:3002
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.use(
  "/graphql",
  graphqlHTTP((request, response) => {
    console.log("Received GraphQL request:", request.body);
    return {
      schema: userSchema,
      rootValue: global,
      graphiql: true,
      context: {
        req: request,
        res: response,
      },
      customFormatErrorFn: (err) => {
        console.error("GraphQL Error:", err);
        return {
          message: err.message,
          locations: err.locations,
          path: err.path,
        };
      },
    };
  })
);

// // Course Schema GraphQL endpoint with debugging
// app.use(
//   "/graphql-course",
//   graphqlHTTP((request, response) => {
//     console.log("Received GraphQL request for courseSchema:", request.body);
//     return {
//       schema: courseSchema,
//       rootValue: global,
//       graphiql: true,
//       context: {
//         req: request,
//         res: response,
//       },
//       customFormatErrorFn: (err) => {
//         console.error("GraphQL Error in courseSchema:", err);
//         return {
//           message: err.message,
//           locations: err.locations,
//           path: err.path,
//         };
//       },
//     };
//   })
// );

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.path}`);
  next();
});

// Listen to port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});

// Export the Express application instance for external usage
export default app;
