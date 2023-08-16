import { Exercise } from "../entities/Exercise";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class ExerciseResolver {
  @Query(() => [Exercise])
  Exercises(@Ctx() { em }: MyContext): Promise<Exercise[]> {
    return em.find(Exercise, {});
  }
}
