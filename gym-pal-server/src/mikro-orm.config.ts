import { Exercise } from "./entities/Exercise";
import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./constants";
import { config } from "dotenv";

config();

export default {
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
  },
  entities: [Exercise],
  allowGlobalContext: true,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: process.env.DB_TYPE,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
