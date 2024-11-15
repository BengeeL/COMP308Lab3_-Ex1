import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compress from "compression";
import methodOverride from "method-override";
import morgan from "morgan";
import session from "express-session";

import config from "./config.js";

// Define the Express configuration method
function configureExpress() {
  // Create a new Express application instance
  const app = express();

  // Use the 'NODE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(methodOverride());
  // handle the use of PUT or DELETE methods
  // override with POST having ?_method=DELETE or
  // ?_method=PUT
  app.use(methodOverride("_method"));
  // Configure the 'session' middleware
  // saveUninitialized - orces a session that is "uninitialized" to be saved to the store
  // resave - forces the session to be saved back to the session store
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
    })
  );

  // Configure static file serving
  app.use(express.static("./public"));

  // Return the Express application instance
  return app;
}

export default configureExpress;
