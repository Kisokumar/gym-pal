import { Migration } from '@mikro-orm/migrations';

export class Migration20230816032851 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "exercise" drop column "weight";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "exercise" add column "weight" int4 not null default null;');
  }

}
