import type { StringEnum } from "@techmely/types";

export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy = { field: string | true; param: "asc" | "desc" };

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
};

export interface RepositoryPort<Entity> {
  findById(id: string): Promise<Entity>;
  findByKey(key: StringEnum<keyof Entity>): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findAllByIds(ids: string[]): Promise<Entity[]>;
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>;
  existsById(id: string): Promise<boolean>;
  count(): Promise<bigint | number>;

  insert(entity: Entity): Promise<void>;
  insertBulk(entity: Entity): Promise<void>;
  insertMany(entities: Entity[]): Promise<void>;
  insertBulkMany(entities: Entity[]): Promise<void>;

  update(entity: Entity): Promise<void>;
  updateBulk(entity: Entity): Promise<void>;
  updateMany(entities: Entity[]): Promise<void>;
  updateBulkMany(entities: Entity[]): Promise<void>;

  delete(entity: Entity): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  deleteAllByIds(ids: string[]): Promise<boolean>;
  deleteBulk(entity: Entity): Promise<boolean>;

  transaction<T>(handler: () => Promise<T>): Promise<T>;
}
