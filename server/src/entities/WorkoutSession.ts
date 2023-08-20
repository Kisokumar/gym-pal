import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User";

@ObjectType()
@Entity()
export class WorkoutSession extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  sessionType!: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.workoutSessions)
  creator!: User;

  @Field(() => String)
  @Column()
  sessionStartTime: string;

  @Field(() => String)
  @Column()
  sessionEndTime: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
