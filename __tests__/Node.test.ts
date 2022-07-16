import Node from "../src/Node.js";

it("should create a new instance", () => {
  const node = (new Node);

  expect(node).toBeInstanceOf(Node);
  expect(node.entries()).toEqual((new Map).entries());
  expect(node.toJSON()).toEqual({});
});

it("should add new mapped names", () => {
  const node = (new Node);

  expect(node.name("firstName")).toBe("_");
  expect(node.name("secondName")).toBe("a");

  expect(node.toJSON()).toEqual({
    firstName : "_",
    secondName: "a",
  });
});

it("should clone the instance", () => {
  const node = (new Node);

  expect(node.name("firstName")).toBe("_");

  expect(node.toJSON()).toEqual({ firstName: "_" });

  const clone = node.clone();

  expect(clone).toBeInstanceOf(Node);
  expect(clone.toJSON()).toEqual({ firstName: "_" });

  expect(clone.name("secondName")).toBe("a");

  expect(clone.toJSON()).toEqual({
    firstName : "_",
    secondName: "a",
  });

  expect(node.toJSON()).toEqual({ firstName: "_" });
});
