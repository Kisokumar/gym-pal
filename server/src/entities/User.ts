import { v4 as uuidv4 } from "uuid";

import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { WorkoutSession } from "./WorkoutSession";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Field(() => Boolean)
  @Column()
  privateAccount!: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  hideConnections: boolean;

  @OneToMany(() => WorkoutSession, (workoutSession) => workoutSession.creator)
  workoutSessions: WorkoutSession[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
