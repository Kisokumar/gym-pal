import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { DataSource } from "typeorm";
import RedisStore from "connect-redis";
import { ServerConnectionResolver } from "./resolvers/serverStatus";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import { WorkoutSession } from "./entities/WorkoutSession";
import { WorkoutSessionResolver } from "./resolvers/workoutSession";
import { __prod__ } from "./constants";
import { buildSchema } from "type-graphql";
import { config } from "dotenv";
import cors from "cors";
import { createClient } from "redis";
import express from "express";
import session from "express-session";

config();

const main = async () => {
  const AppDataSource = new DataSource({
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: !__prod__,
    entities: [WorkoutSession, User],
  });
  AppDataSource.initialize()
    .then(() => {
      // ee
    })
    .catch((error) => console.log(error));

  const app = express();

  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
  });

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    })
  );

  const oneWeek = 1000 * 60 * 60 * 24 * 7;

  app.use(
    session({
      name: "qid",
      store: redisStore,
      cookie: {
        maxAge: oneWeek,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      secret: process.env.COOKIE_SECRET || "dqoiwjdosaijd",
      resave: false,
      saveUninitialized: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        ServerConnectionResolver,
        WorkoutSessionResolver,
        UserResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: AppDataSource, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
