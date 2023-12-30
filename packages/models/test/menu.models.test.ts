import { parseAsync } from "valibot";
import { describe, expect, test } from "vitest";
import { createMenuSchema } from "../src/menu.models";

describe("Validate Menu Schema", () => {
  const createData = [
    [
      {
        linkType: "INTERNAL",
        location: "HEADER",
        order: 0,
        type: "NORMAL",
        title: "Feed",
        link: "/",
      },
      {
        link: "/",
        linkType: "INTERNAL",
        location: "HEADER",
        order: 0,
        slug: "feed",
        title: "Feed",
        type: "NORMAL",
      },
    ],
    [
      {
        title: "Explore",
        description: "Explore new feed from the world",
        linkType: "INTERNAL",
        location: "FOOTER",
        order: 1,
        type: "NORMAL",
        link: "/",
      },
      {
        link: "/",
        linkType: "INTERNAL",
        location: "FOOTER",
        order: 1,
        slug: "explore",
        title: "Explore",
        description: "Explore new feed from the world",
        type: "NORMAL",
      },
    ],
  ];

  // @ts-expect-error Ignore type checking
  test.concurrent.each(createData)("Create Menu Schema successfully", async (input, expected) => {
    const output = await parseAsync(createMenuSchema, input);
    expect(output).toStrictEqual(expected);
  });

  const createFailData = [
    [
      {
        linkType: "INTERNAL",
        location: "HEADER",
        order: 0,
        type: "NORMAL",
        link: "/",
      },
    ],
    [
      {
        linkType: "INTERNAL",
        location: "HEADER",
        order: 0,
        type: "NORMAL",
        title: "Feed",
      },
    ],
    [
      {
        location: "HEADER",
        order: -1,
        type: "LOL",
        title: "Feed",
      },
    ],
    [{}],
  ];
  // @ts-expect-error Ignore type checking
  test.concurrent.each(createFailData)("Create Menu Schema fail", async (input) => {
    try {
      await parseAsync(createMenuSchema, input);
    } catch (error) {
      expect(error.message).toContain("Invalid type");
    }
  });
});
