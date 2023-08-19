import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/hello";
import { MikroORM } from "@mikro-orm/core";
import RedisStore from "connect-redis";
import { UserResolver } from "./resolvers/user";
import { WorkoutSessionResolver } from "./resolvers/workoutSession";
import { __prod__ } from "./constants";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { createClient } from "redis";
import express from "express";
import mikroOrmConfig from "./mikro-orm.config";
import session from "express-session";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  // quickly delete all users and sessions
  // const userRepository = orm.em.getRepository(User);
  // await userRepository.nativeDelete({});
  // const sessionRepo = orm.em.getRepository(WorkoutSession);
  // await sessionRepo.nativeDelete({});

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
      resolvers: [HelloResolver, WorkoutSessionResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
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
