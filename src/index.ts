import dotenv from "dotenv";
import { initWatcher } from "./wathcer";

dotenv.config({
  path: process.env.ENV_PATH || "/.env",
});

console.log(process.env);

initWatcher();
