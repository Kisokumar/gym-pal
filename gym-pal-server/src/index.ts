import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { WorkoutSessionResolver } from "./resolvers/workoutSession";
// import { WorkoutSession } from "./entities/WorkoutSession";
// import { EntityManager } from "@mikro-orm/postgresql";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  // const entityManager = orm.em as EntityManager;
  // await entityManager.nativeDelete(WorkoutSession, {});
  // let temp = orm.em.create(WorkoutSession, {
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   sessionType: "Push",
  // });
  // await orm.em.persistAndFlush(temp);
  // temp = orm.em.create(WorkoutSession, {
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   sessionType: "Pull",
  // });
  // await orm.em.persistAndFlush(temp);
  // temp = orm.em.create(WorkoutSession, {
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   sessionType: "Legs",
  // });
  // await orm.em.persistAndFlush(temp);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, WorkoutSessionResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
