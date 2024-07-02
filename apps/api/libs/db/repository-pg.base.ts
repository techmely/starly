import type { Paginated, PaginatedQueryParams, RepositoryPort } from "@techmely/domain-driven";
import type { StringEnum } from "@techmely/types";
import type { Kysely } from "kysely";
import type { AppDatabase } from "#root/libs/db/app-db.types";

export abstract class PgRepositoryBase<DbModel = any>
  implements RepositoryPort<DbModel>
{
  protected abstract tableName: StringEnum<keyof AppDatabase>;

  protected constructor(protected readonly db: Kysely<AppDatabase>) {}

  async findById(id: string): Promise<DbModel> {
    const record = await this.db
      // @ts-expect-error I kne
      .selectFrom(this.tableName)
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
    // @ts-expect-error I knew
    return record;
  }

  async findByKey(key: StringEnum<keyof DbModel>): Promise<DbModel> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<DbModel[]> {
    throw new Error("Method not implemented.");
  }

  async findAllByIds(ids: string[]): Promise<DbModel[]> {
    // const _x = await this.db
    //   // @ts-expect-error I knew
    //   .selectFrom(this.tableName)
    //   .selectAll()
    //   // @ts-expect-error I knew
    //   .where("id", "in", ids)
    //   .execute();
    // return [];
    throw new Error("Method not implemented.");
  }

  async findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<DbModel>> {
    throw new Error("Method not implemented.");
  }

  async existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async count(): Promise<number | bigint> {
    throw new Error("Method not implemented.");
  }

  async insert(record: DbModel) {
    const { id } = await this.db
      // @ts-expect-error I knew
      .insertInto(this.tableName)
      .values(record as any)
      .returning("id")
      .executeTakeFirstOrThrow();
    return this.findById(id);
  }

  async insertMany(model: DbModel[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async insertBulk(model: DbModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async insertBulkMany(models: DbModel[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(model: DbModel): Promise<DbModel> {
    // @ts-expect-error I knew
    const id = model.id;
    await this.db
      // @ts-expect-error I knew
      .updateTable(this.tableName)
      .set(model as any)
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
    return this.findById(id);
  }

  async updateBulk(model: DbModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async updateMany(models: DbModel[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async updateBulkMany(models: DbModel[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(model: DbModel): Promise<boolean> {
    // @ts-expect-error I knew
    const id = model.id;
    const { numDeletedRows } = await this.db
      // @ts-expect-error I knew
      .deleteFrom(this.tableName)
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
    return numDeletedRows > 0;
  }

  async deleteById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async deleteAllByIds(ids: string[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async deleteBulk(ids: string[]): Promise<boolean> {
    // @ts-expect-error I knew
    await this.db.deleteFrom(this.tableName).where("id", "in", ids).executeTakeFirstOrThrow();
    return true;
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
