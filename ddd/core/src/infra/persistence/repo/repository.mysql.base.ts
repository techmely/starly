import type { StringEnum } from "@techmely/types";
import type Emittery from "emittery";
import type { Kysely } from "kysely";
import { AggregateRoot } from "../../../domain/entities/aggregate.base";
import type { EmitDomainEvents } from "../../../domain/events/domain-event.types";
import type {
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from "../../../domain/repo/repository.port";
import type { LoggerPort } from "../../logger/logger.port";
import type { Mapper } from "../../mapper.base";

export abstract class MySQLRepositoryBase<
  Aggregate extends AggregateRoot<unknown>,
  DbModel extends Record<string, unknown>,
  DbTables extends Record<string, unknown>,
> implements RepositoryPort<Aggregate>
{
  protected abstract tableName: StringEnum<keyof DbTables>;
  protected abstract db: Kysely<DbTables>;

  protected constructor(
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly emitter: Emittery<EmitDomainEvents>,
    protected readonly logger: LoggerPort,
  ) {}

  findById(id: string): Promise<Aggregate> {
    throw new Error("Method not implemented.");
  }
  findByKey(key: StringEnum<keyof Aggregate>): Promise<Aggregate> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Aggregate[]> {
    throw new Error("Method not implemented.");
  }
  findAllByIds(ids: string[]): Promise<Aggregate[]> {
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
    await this.db
      // @ts-expect-error Annoying ts
      .insertInto(this.tableName)
      // @ts-expect-error Ignore type check bcs we don't know the type of data
      .values(record)
      .executeTakeFirstOrThrow();
    await entity.publishEvents(this.logger, this.emitter);
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
  update(entity: Aggregate): Promise<void> {
    throw new Error("Method not implemented.");
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
  delete(entity: Aggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteAllByIds(ids: string[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteBulk(entity: Aggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
