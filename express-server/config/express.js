// Load the module dependencies
import { sessionSecret } from "./config.js";
import express from "express";
import { static as serveStatic } from "express";
import morgan from "morgan";
import compress from "compression";
import pkg from "body-parser";
const { urlencoded, json } = pkg;
import methodOverride from "method-override";
import session from "express-session";
import cookieParser from "cookie-parser";

// Define the Express configuration method
export default function () {
  // Create a new Express application instance
  const app = express();

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(
    urlencoded({
      extended: true,
    })
  );

  app.use(json());
  app.use(cookieParser());

  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  //   res.header("Access-Control-Allow-Credentials", true);
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // });

  // app.use(cors({ origin: "http://localhost:3002", credentials: true }));
  app.use(methodOverride());
  app.use(methodOverride("_method"));

  // Configure the 'session' middleware
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: sessionSecret,
    })
  );

  // Set the application view engine and 'views' folder
  app.set("views", "./app/views");
  app.set("view engine", "ejs");

  app.use(serveStatic("./public"));

  // Return the Express application instance
  return app;
}
