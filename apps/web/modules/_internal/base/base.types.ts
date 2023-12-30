import type {
  ComparisonOperatorExpression,
  DeleteQueryBuilder,
  DeleteResult,
  OperandValueExpressionOrList,
  ReferenceExpression,
  SelectQueryBuilder,
  UpdateQueryBuilder,
  UpdateResult,
} from "kysely";
import type { AppDatabase } from "../../../server/utils/planet-scale";

export type PrimaryKey = string | number;

export type BaseQueryOptions<T> = {
  order?: `${string & keyof T}:${"desc" | "asc"}`;
  page?: number;
  limit?: number;
  offset?: number;
  search?: string;
  group?: string[];
};

type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` | NestedKeyOf<T[K]> : never)
  : never;

export type DbFilter = {
  key: NestedKeyOf<AppDatabase>;
  operation?: ComparisonOperatorExpression;
  value: OperandValueExpressionOrList<AppDatabase, keyof AppDatabase, any>;
};

export type UpdateDbFilter = {
  key: ReferenceExpression<AppDatabase, keyof AppDatabase>;
  operation?: ComparisonOperatorExpression;
  value: OperandValueExpressionOrList<AppDatabase, keyof AppDatabase, any>;
};

export type QueryBuilder<T> = SelectQueryBuilder<AppDatabase, keyof AppDatabase, T>;
export type IUpdateQueryBuilder = UpdateQueryBuilder<
  AppDatabase,
  keyof AppDatabase,
  keyof AppDatabase,
  UpdateResult
>;

export type DeleteDbFilter = UpdateDbFilter;

export type IDeleteQueryBuilder = DeleteQueryBuilder<AppDatabase, keyof AppDatabase, DeleteResult>;

export abstract class BaseRepo<T> {
  abstract createOne(data: Partial<T>): Promise<T>;
  abstract createMany(data: Partial<T>[]): Promise<PrimaryKey[]>;

  abstract readOne(filter: DbFilter, query?: BaseQueryOptions<T>): Promise<T>;
  abstract readMany(filters?: DbFilter[], query?: BaseQueryOptions<T>): Promise<T[]>;
  abstract readByQuery(query: BaseQueryOptions<T>): Promise<T[]>;

  abstract updateOne(
    data: Partial<T>,
    filters: UpdateDbFilter | UpdateDbFilter[],
  ): Promise<UpdateResult>;
  abstract updateMany(keys: PrimaryKey[], data: Partial<T>): Promise<PrimaryKey[]>;

  abstract deleteOne(filters?: UpdateDbFilter | UpdateDbFilter[]): Promise<DeleteResult>;
  abstract deleteMany(keys: PrimaryKey[]): Promise<PrimaryKey[]>;

  abstract upsertOne(
    data: Partial<T>,
    filters: UpdateDbFilter | UpdateDbFilter[],
  ): Promise<PrimaryKey>;
  abstract upsertMany(keys: PrimaryKey[], data: Partial<T>): Promise<PrimaryKey[]>;
}
