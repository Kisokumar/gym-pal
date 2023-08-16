import { Migration } from '@mikro-orm/migrations';

export class Migration20230816075257 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "workout_session" rename column "session_name" to "session_type";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "workout_session" rename column "session_type" to "session_name";');
  }

}
