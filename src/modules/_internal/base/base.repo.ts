import type { Kysely } from "kysely";
import type { AppDatabase } from "#server/utils/planet-scale";
import type {
  BaseQueryOptions,
  BaseRepo,
  DbFilter,
  IDeleteQueryBuilder,
  IUpdateQueryBuilder,
  PrimaryKey,
  QueryBuilder,
  UpdateDbFilter,
} from "./base.types";
import { bindQueryDelete, bindQuerySelect, bindQueryUpdate, splitOrder } from "./base.utils";

export class ItemRepo<T> implements BaseRepo<T> {
  table: keyof AppDatabase;
  db: Kysely<AppDatabase>;

  constructor(table: keyof AppDatabase, db: Kysely<AppDatabase>) {
    this.table = table;
    this.db = db;
  }

  async createOne<Body>(data: Body): Promise<T> {
    // @ts-expect-error Ignore type check bcs we don't know the type of data
    const result = await this.db.insertInto(this.table).values(data).executeTakeFirstOrThrow();
    const item = await this.readOne({
      key: "id",
      value: String(result.insertId),
    });
    return item;
  }
  createMany(data: Partial<T>[]): Promise<PrimaryKey[]> {
    throw new Error("Method not implemented.");
  }
  async readOne(filter?: DbFilter, options?: BaseQueryOptions<T>): Promise<T> {
    const qb = this.db.selectFrom(this.table) as unknown as QueryBuilder<T>;

    const query = bindQuerySelect(qb, filter);
    const { limit = 20, offset = 0, order = "id:asc" } = options || {};
    const { sortField, direction } = splitOrder<T>(order);
    query.orderBy(sortField, direction).offset(offset).limit(limit);
    const item = await query.selectAll().executeTakeFirstOrThrow();
    return item as T;
  }
  async readMany(filters?: DbFilter[], options?: BaseQueryOptions<T>): Promise<T[]> {
    const qb = this.db.selectFrom(this.table) as unknown as QueryBuilder<T>;
    const query = bindQuerySelect(qb, filters);
    const { limit = 20, offset = 0, order = "id:asc" } = options || {};
    const { sortField, direction } = splitOrder<T>(order);
    query.orderBy(sortField, direction).offset(offset).limit(limit);
    const items = await query.selectAll().execute();
    return items;
  }
  readByQuery(query: BaseQueryOptions<T>): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  async updateOne(data: Partial<T>, filters: UpdateDbFilter | UpdateDbFilter[]) {
    const qb = this.db.updateTable(this.table) as IUpdateQueryBuilder;
    const query = bindQueryUpdate(qb, filters);
    const item = await query.set(data).executeTakeFirstOrThrow();
    return item;
  }
  updateMany(keys: PrimaryKey[], data: Partial<T>): Promise<PrimaryKey[]> {
    throw new Error("Method not implemented.");
  }
  async deleteOne(filters?: UpdateDbFilter | UpdateDbFilter[]) {
    const qb = this.db.deleteFrom(this.table) as IDeleteQueryBuilder;
    const query = bindQueryDelete(qb, filters);
    const result = await query.executeTakeFirstOrThrow();
    return result;
  }
  deleteMany(keys: PrimaryKey[]): Promise<PrimaryKey[]> {
    throw new Error("Method not implemented.");
  }

  upsertOne(data: Partial<T>, filters: UpdateDbFilter | UpdateDbFilter[]): Promise<PrimaryKey> {
    throw new Error("Method not implemented.");
  }
  upsertMany(keys: PrimaryKey[], data: Partial<T>): Promise<PrimaryKey[]> {
    throw new Error("Method not implemented.");
  }
}
