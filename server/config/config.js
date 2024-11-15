dotenv.config();

// Load the correct configuration file according to the 'NODE_ENV' variable
import dotenv from "dotenv";
import development from "./env/development.js";
import production from "./env/production.js";

const config =
  process.env.NODE_ENV === "development" ? development : production;

export default config;
