import { generate } from "../src/utils.js";

it("should generate the first name", () => {
  expect(generate(null)).toBe("_");
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
