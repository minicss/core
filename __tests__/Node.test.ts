import Node from "../src/Node.js";

it("should create a new instance", () => {
  const node = (new Node);

  expect(node).toBeInstanceOf(Node);
  expect(node.entries()).toEqual((new Map).entries());
  expect(node.toJSON()).toEqual({});
});

it("should add new mapped names", () => {
  const node = (new Node);

  expect(node.rename("firstName")).toBe("_");
  expect(node.rename("secondName")).toBe("a");

  expect(node.toJSON()).toEqual({
    firstName : "_",
    secondName: "a",
  });
});

it("should clone the instance", () => {
  const node = (new Node);

  expect(node.rename("firstName")).toBe("_");

  expect(node.toJSON()).toEqual({ firstName: "_" });

  const clone = node.clone();

  expect(clone).toBeInstanceOf(Node);
  expect(clone.toJSON()).toEqual({ firstName: "_" });

  expect(clone.rename("secondName")).toBe("a");

  expect(clone.toJSON()).toEqual({
    firstName : "_",
    secondName: "a",
  });

  expect(node.toJSON()).toEqual({ firstName: "_" });
});

it("should create a new instance from JSON output", () => {
  const node = Node.fromJSON({ firstName: "_" });

  expect(node.toJSON()).toEqual({ firstName: "_" });

  expect(node.rename("secondName")).toBe("a");

  expect(node.toJSON()).toEqual({
    firstName : "_",
    secondName: "a",
  });
});
