import { stringify, parse } from "qs";
import type { DatabaseViewOptions } from "../components/DatabaseView";

function isObject(val: unknown) {
  return typeof val === "object" && !Array.isArray(val) && val !== null;
}

function isNumber(val: unknown) {
  if (typeof val === "number") return true;
  if (typeof val === "string") return !isNaN(parseFloat(val));
  return false;
}

function isBoolean(val: unknown) {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") return val === "false" || val === "true";
  return false;
}

function isArray(val: unknown) {
  return Array.isArray(val);
}

export function parseValue(
  val: unknown,
):
  | string
  | object
  | number
  | boolean
  | (string | object | number | boolean)[]
  | null {
  if (typeof val == "undefined" || val == "") {
    return null;
  } else if (isBoolean(val)) {
    return parseBoolean(val);
  } else if (isArray(val)) {
    return parseArray(val);
  } else if (isObject(val)) {
    return parseObject(val as Record<string, unknown>);
  } else if (isNumber(val)) {
    return parseNumber(val);
  } else {
    return val;
  }
}

function parseObject(obj: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  let key, val;
  for (key in obj) {
    val = parseValue(obj[key]);
    if (val !== null) result[key] = val; // ignore null values
  }
  return result;
}

function parseArray(arr: unknown[]) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = parseValue(arr[i]);
  }
  return result;
}

function parseNumber(val: unknown) {
  return Number(val);
}

function parseBoolean(val: unknown) {
  return val === "true";
}

export function convertFiltersToQuery(
  partialFilters: Partial<DatabaseViewOptions>,
) {
  const queryString = stringify(partialFilters);
  return queryString;
}

export function convertQueryToFilters(
  queryString: string,
): Partial<DatabaseViewOptions> {
  const queryObject = parse(queryString);
  const filters: Record<string, unknown> = {};
  Object.entries(queryObject).map(([key, value]) => {
    if (value) filters[key] = parseValue(value);
  });
  return filters as Partial<DatabaseViewOptions>;
}
