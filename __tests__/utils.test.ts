import { escape, generate } from "../src/utils.js";

it("should generate the first name", () => {
  expect(generate()).toBe("_");

  // eslint-disable-next-line no-undefined
  expect(generate(undefined)).toBe("_");

  expect(generate("")).toBe("_");
});

it("should generate the first 2 character name", () => {
  expect(generate("Z")).toBe("_0");
});

it("should use the next character", () => {
  expect(generate("ab")).toBe("ac");

  expect(generate("DbX")).toBe("DbY");

  expect(generate("xZt")).toBe("xZu");

  expect(generate("lZZ2")).toBe("lZZ3");
});

it("should use the next character when ending with Z", () => {
  expect(generate("aZ")).toBe("b0");

  expect(generate("DbZ")).toBe("Dc0");

  expect(generate("xZZ")).toBe("y00");

  expect(generate("lZZZ")).toBe("m000");
});

it("should escape identifier", () => {
  expect(escape("dark:border-[#252525]")).toBe("dark\\:border-\\[\\#252525\\]");

  expect(escape("dark:\\border-[#252525]")).toBe("dark\\:\\\\border-\\[\\#252525\\]");

  expect(escape("border-red-5")).toBe("border-red-5");
});
