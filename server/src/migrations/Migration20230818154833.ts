import { Migration } from '@mikro-orm/migrations';

export class Migration20230818154833 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "private_account" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "private_account";');
  }

}
