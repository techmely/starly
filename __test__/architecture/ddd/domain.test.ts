import { filesOfProject } from "tsarch";
import { describe, expect, it } from "vitest";

describe.concurrent("domain boundaries", () => {
  it("Business logic should not depend on the application", async () => {
    const rule = filesOfProject()
      .inFolder("ddd/*/domain/*")
      .shouldNot()
      .dependOnFiles()
      .inFolder("ddd/*/application/*");

    await expect(rule).toPassAsync();
  });

  it("Business logic should not depend on the controller", async () => {
    const rule = filesOfProject()
      .inFolder("ddd*/domain/*")
      .shouldNot()
      .dependOnFiles()
      .matchingPattern("controller.ts");

    await expect(rule).toPassAsync();
  });

  it("Business logic should not depend on the dto", async () => {
    const rule = filesOfProject()
      .inFolder("ddd*/domain/*")
      .shouldNot()
      .dependOnFiles()
      .inFolder("ddd*/dtos/*");

    await expect(rule).toPassAsync();
  });

  it("Business logic should be cycle free", async () => {
    const rule = filesOfProject().inFolder("*/domain/*").should().beFreeOfCycles();

    await expect(rule).toPassAsync();
  });

  it("Should allow multiple patterns for interactors", async () => {
    const violations = await filesOfProject()
      .inFolder("ddd/*/*/domain/use-cases/interactors")
      .should()
      .matchPattern("(.interactor.ts|__tests__)")
      .check();

    expect(violations).toEqual([]);
  });

  it("Should allow multiple patterns for entities", async () => {
    const violations = await filesOfProject()
      .inFolder("ddd/*/*/domain/entities")
      .should()
      .matchPattern("(.entity.ts|__tests__|.types.ts)")
      .check();

    expect(violations).toEqual([]);
  });

  it("Should allow multiple patterns for events", async () => {
    const violations = await filesOfProject()
      .inFolder("ddd/*/*/domain/events/*")
      .should()
      .matchPattern(".event.ts")
      .check();

    expect(violations).toEqual([]);
  });

  it("Should allow multiple patterns for value objects", async () => {
    const violations = await filesOfProject()
      .inFolder("ddd/*/*/domain/value-objects/*")
      .should()
      .matchPattern(".value-object.ts")
      .check();

    expect(violations).toEqual([]);
  });

  it("Should allow multiple patterns for input/output ports", async () => {
    const violations = await filesOfProject()
      .inFolder("ddd/*/*/domain/use-cases/ports/*")
      .should()
      .matchPattern("(.in-port.ts|.out-port.ts)")
      .check();

    expect(violations).toEqual([]);
  });

  it("Should allow multiple patterns for repository", async () => {
    const violations = await filesOfProject()
      .inFolder("ddd/*/*/domain/rep/*")
      .should()
      .matchPattern("(.repository.ts|.model.ts)")
      .check();

    expect(violations).toEqual([]);
  });
});
