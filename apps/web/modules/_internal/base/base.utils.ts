import type { AppDatabase } from "../../../server/utils/planet-scale";

import type {
  DbFilter,
  DeleteDbFilter,
  IDeleteQueryBuilder,
  IUpdateQueryBuilder,
  QueryBuilder,
  UpdateDbFilter,
} from "./base.types";

export function splitOrder<T>(order: string) {
  const [sortField, direction] = order.split(":") as [
    keyof T & `${keyof AppDatabase}.${string & keyof T}`,
    "asc" | "desc",
  ];
  return {
    sortField,
    direction,
  };
}

export function bindQuerySelect<T>(qb: QueryBuilder<T>, filters: DbFilter | DbFilter[] = []) {
  if (Array.isArray(filters) && filters.length === 0) {
    return qb;
  }

  function bind(filter: DbFilter) {
    switch (filter.key) {
      case "user.id":
        qb.where("user.id", filter.operation || "=", filter.value);
        break;
      case "user.firebaseUserId":
        qb.where("user.firebaseUserId", filter.operation || "=", filter.value);
        break;

      default:
        break;
    }
  }

  if (Array.isArray(filters)) {
    for (const f of filters) {
      bind(f);
    }
  } else {
    bind(filters);
  }

  return qb;
}

export function bindQueryUpdate(
  qb: IUpdateQueryBuilder,
  filters: UpdateDbFilter | UpdateDbFilter[] = [],
) {
  if (Array.isArray(filters) && filters.length === 0) {
    return qb;
  }

  function bind(filter: UpdateDbFilter) {
    return qb.where(filter.key, filter.operation || "=", filter.value);
  }

  if (Array.isArray(filters)) {
    for (const f of filters) {
      bind(f);
    }
  } else {
    bind(filters);
  }

  return qb;
}

export function bindQueryDelete(
  qb: IDeleteQueryBuilder,
  filters: DeleteDbFilter | DeleteDbFilter[] = [],
) {
  if (Array.isArray(filters) && filters.length === 0) {
    return qb;
  }

  function bind(filter: DeleteDbFilter) {
    return qb.where(filter.key, filter.operation || "=", filter.value);
  }

  if (Array.isArray(filters)) {
    for (const f of filters) {
      bind(f);
    }
  } else {
    bind(filters);
  }

  return qb;
}
