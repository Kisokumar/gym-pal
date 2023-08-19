import { WorkoutSession } from "../entities/WorkoutSession";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class WorkoutSessionResolver {
  @Query(() => [WorkoutSession])
  WorkoutSessions(): Promise<WorkoutSession[]> {
    return WorkoutSession.find();
  }

  @Query(() => WorkoutSession, { nullable: true })
  WorkoutSession(
    @Arg("id", () => Int) id: number
  ): Promise<WorkoutSession | null> {
    return WorkoutSession.findOne({ where: { id } });
  }

  @Mutation(() => WorkoutSession)
  async createWorkoutSession(
    @Arg("sessionType") sessionType: string
  ): Promise<WorkoutSession | null> {
    return WorkoutSession.create({ sessionType }).save();
  }

  @Mutation(() => WorkoutSession, { nullable: true })
  async updateWorkoutSession(
    @Arg("id") id: number,
    @Arg("sessionType") sessionType: string
  ): Promise<WorkoutSession | null> {
    const workoutSession = await WorkoutSession.findOne({ where: { id } });
    if (!workoutSession) {
      return null;
    }
    if (typeof sessionType !== "undefined") {
      WorkoutSession.update({ id }, { sessionType });
    }
    return workoutSession;
  }

  @Mutation(() => Boolean)
  async deleteWorkoutSession(@Arg("id") id: number): Promise<boolean> {
    try {
      WorkoutSession.delete(id);
      return true;
    } catch {
      return false;
    }
  }
}
