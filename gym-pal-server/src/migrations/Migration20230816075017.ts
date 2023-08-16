import { Migration } from '@mikro-orm/migrations';

export class Migration20230816075017 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "workout_session" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "session_name" text not null);');

    this.addSql('drop table if exists "exercise" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "exercise" ("id" serial primary key, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, "exercise_name" text not null default null, "reps" int4 not null default null, "sets" int4 not null default null, "weight" int4 not null default null);');

    this.addSql('drop table if exists "workout_session" cascade;');
  }

}
