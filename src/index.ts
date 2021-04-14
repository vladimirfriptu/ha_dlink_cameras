import dotenv from "dotenv";
import { initWatcher } from "./wathcer";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

initWatcher();
