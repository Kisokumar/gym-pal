import { Migration } from '@mikro-orm/migrations';

export class Migration20230818160407 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "private_account" type boolean using ("private_account"::boolean);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "private_account" type text using ("private_account"::text);');
  }

}
