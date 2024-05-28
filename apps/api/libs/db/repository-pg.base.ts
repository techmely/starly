import type {
  Aggregate as AggregateRoot,
  DomainMapper,
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from "@techmely/domain-driven";
import type { StringEnum } from "@techmely/types";
import type { Kysely } from "kysely";

export abstract class PgRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends Record<string, unknown>,
  DbTables = any,
> implements RepositoryPort<Aggregate>
{
  protected abstract tableName: StringEnum<keyof DbTables>;

  protected constructor(
    protected readonly mapper: DomainMapper<any, DbModel, Aggregate>,
    protected readonly db: Kysely<DbTables>,
  ) {}

  async findById(id: string): Promise<Aggregate> {
    const record = await this.db
      // @ts-expect-error I knew
      .selectFrom(table)
      .selectAll()
      // @ts-expect-error I knew
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
    // @ts-expect-error I knew
    return this.mapper.toDomain(record);
  }
  findByKey(key: StringEnum<keyof Aggregate>): Promise<Aggregate> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Aggregate[]> {
    throw new Error("Method not implemented.");
  }
  async findAllByIds(ids: string[]): Promise<Aggregate[]> {
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
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Aggregate>> {
    throw new Error("Method not implemented.");
  }
  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  count(): Promise<number | bigint> {
    throw new Error("Method not implemented.");
  }
  async insert(entity: Aggregate) {
    const record = this.mapper.toPersistence(entity);
    // @ts-expect-error I knew
    const { id } = await this.db
      // @ts-expect-error I knew
      .insertInto(this.tableName)
      .values(record as any)
      // @ts-expect-error I knew
      .returning("id")
      .executeTakeFirstOrThrow();
    return this.findById(id);
  }
  insertMany(entities: Aggregate[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insertBulk(entity: Aggregate): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insertBulkMany(entities: Aggregate[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(entity: Aggregate): Promise<Aggregate> {
    const id = entity.id.toString();
    await this.db
      // @ts-expect-error I knew
      .updateTable(this.tableName)
      .set(entity.getProps())
      // @ts-expect-error I knew
      .where("id", "=", entity.id.toString())
      .executeTakeFirstOrThrow();
    return this.findById(id);
  }
  updateBulk(entity: Aggregate): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateMany(entities: Aggregate[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateBulkMany(entities: Aggregate[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(entity: Aggregate): Promise<boolean> {
    const id = entity.id.toString();
    const { numDeletedRows } = await this.db
      // @ts-expect-error I knew
      .deleteFrom(this.tableName)
      // @ts-expect-error I knew
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
    return numDeletedRows > 0;
  }
  deleteById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteAllByIds(ids: string[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async deleteBulk(ids: string[]): Promise<void> {
    // @ts-expect-error I knew
    await this.db.deleteFrom(this.tableName).where("id", "in", ids).execute();
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
