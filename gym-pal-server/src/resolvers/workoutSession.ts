import { WorkoutSession } from "../entities/WorkoutSession";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class WorkoutSessionResolver {
  @Query(() => [WorkoutSession])
  WorkoutSessions(@Ctx() { em }: MyContext): Promise<WorkoutSession[]> {
    return em.find(WorkoutSession, {});
  }

  @Query(() => WorkoutSession, { nullable: true })
  WorkoutSession(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<WorkoutSession | null> {
    return em.findOne(WorkoutSession, { id });
  }

  @Mutation(() => WorkoutSession)
  async createWorkoutSession(
    @Arg("sessionType") sessionType: string,
    @Ctx() { em }: MyContext
  ): Promise<WorkoutSession | null> {
    const workoutSession = em.create(WorkoutSession, {
      sessionType,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await em.persistAndFlush(workoutSession);
    return workoutSession;
  }

  @Mutation(() => WorkoutSession, { nullable: true })
  async updateWorkoutSession(
    @Arg("id") id: number,
    @Arg("sessionType") sessionType: string,
    @Ctx() { em }: MyContext
  ): Promise<WorkoutSession | null> {
    const workoutSession = await em.findOne(WorkoutSession, { id });
    if (!workoutSession) {
      return null;
    }
    if (typeof sessionType !== "undefined") {
      workoutSession.sessionType = sessionType;
      await em.persistAndFlush(workoutSession);
    }
    return workoutSession;
  }

  @Mutation(() => Boolean)
  async deleteWorkoutSession(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(WorkoutSession, { id });
      return true;
    } catch {
      return false;
    }
  }
}
