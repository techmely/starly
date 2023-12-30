import { Output, object, optional, special, string, transform } from "valibot";

export const baseQuerySchema = <T extends Record<string, unknown>>() =>
  object({
    order: special<`${string & keyof T}:${"asc" | "desc"}`>((val) =>
      /\w+:(asc|desc)/.test(val as string),
    ),
    pageSize: optional(transform(optional(string(), "20"), (v) => parseInt(v, 10))),
    pageIndex: optional(transform(optional(string(), "0"), (v) => parseInt(v, 10))),
  });

export type BaseQueryModel = Output<ReturnType<typeof baseQuerySchema>>;

export const baseSchema = object({
  createdDate: optional(string()),
  updatedDate: optional(string()),
});

export type BaseModel = Output<typeof baseSchema>;
