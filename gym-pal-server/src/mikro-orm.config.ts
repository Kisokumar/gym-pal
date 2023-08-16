import { WorkoutSession } from "./entities/WorkoutSession";
import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./constants";
import { config } from "dotenv";
import { User } from "./entities/User";

config();

export default {
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
  },
  entities: [WorkoutSession, User],
  allowGlobalContext: true,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: process.env.DB_TYPE,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
