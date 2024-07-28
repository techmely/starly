import type { H3Event } from "h3";
import { getDBClient } from "#server/utils/planet-scale";

const mapDependencies = (e: H3Event) => {
  return {
    "di.db": getDbModule(e),
  };
};

export function useDependenciesInjection(event: H3Event) {
  const dependencies = mapDependencies(event);
  const entriesDeps = Object.entries(dependencies);
  for (const [key, value] of entriesDeps) {
    event.context[key] = value;
  }
}

function getDbModule(e: H3Event) {
  const db = getDBClient();
  return db;
}
