import type {
  Entity as BaseEntity,
  DomainMapper,
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from "@techmely/domain-driven";
import type { StringEnum } from "@techmely/types";
import type { Kysely } from "kysely";

export abstract class PgRepositoryBase<Entity extends BaseEntity<any>, DbModel, DbTables = any>
  implements RepositoryPort<Entity>
{
  protected abstract tableName: StringEnum<keyof DbTables>;

  protected constructor(
    protected readonly mapper: DomainMapper<any, DbModel, Entity>,
    protected readonly db: Kysely<DbTables>,
  ) {}

  async findById(id: string): Promise<Entity> {
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
  // @ts-expect-error I knew
  findByKey(key: StringEnum<keyof DbModel>): Promise<Entity> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Entity[]> {
    throw new Error("Method not implemented.");
  }
  async findAllByIds(ids: string[]): Promise<Entity[]> {
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
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>> {
    throw new Error("Method not implemented.");
  }
  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  count(): Promise<number | bigint> {
    throw new Error("Method not implemented.");
  }
  async insert(entity: Entity) {
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
  insertMany(entities: Entity[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insertBulk(entity: Entity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insertBulkMany(entities: Entity[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(entity: Entity): Promise<Entity> {
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
  updateBulk(entity: Entity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateMany(entities: Entity[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateBulkMany(entities: Entity[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(entity: Entity): Promise<boolean> {
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
  async deleteBulk(ids: string[]): Promise<boolean> {
    // @ts-expect-error I knew
    await this.db.deleteFrom(this.tableName).where("id", "in", ids).executeTakeFirstOrThrow();
    return true;
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
