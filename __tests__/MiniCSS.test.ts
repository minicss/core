import MiniCSS from "../src/MiniCSS.js";

it("should create a new instance", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS).toBeInstanceOf(MiniCSS);
  expect(miniCSS.toJSON()).toEqual({
    classes  : {},
    ids      : {},
    variables: {},
  });
});

it("should add new mapped classes", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.class("firstClass")).toBe("_");
  expect(miniCSS.class("secondClass")).toBe("a");

  expect(miniCSS.class("firstClass")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      firstClass : "_",
      secondClass: "a",
    },
    ids      : {},
    variables: {},
  });
});

it("should add new mapped ids", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.id("firstId")).toBe("_");
  expect(miniCSS.id("secondId")).toBe("a");

  expect(miniCSS.id("firstId")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes: {},
    ids    : {
      firstId : "_",
      secondId: "a",
    },
    variables: {},
  });
});

it("should add new mapped variables", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.variable("firstVariable")).toBe("_");
  expect(miniCSS.variable("secondVariable")).toBe("a");

  expect(miniCSS.variable("firstVariable")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes  : {},
    ids      : {},
    variables: {
      firstVariable : "_",
      secondVariable: "a",
    },
  });
});

it("should add new mapped names", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.class("firstClass")).toBe("_");
  expect(miniCSS.class("secondClass")).toBe("a");

  expect(miniCSS.id("firstId")).toBe("_");
  expect(miniCSS.id("secondId")).toBe("a");

  expect(miniCSS.variable("firstVariable")).toBe("_");
  expect(miniCSS.variable("secondVariable")).toBe("a");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      firstClass : "_",
      secondClass: "a",
    },
    ids: {
      firstId : "_",
      secondId: "a",
    },
    variables: {
      firstVariable : "_",
      secondVariable: "a",
    },
  });
});

it("should clone the instance", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.class("firstClass")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes  : { firstClass: "_" },
    ids      : {},
    variables: {},
  });

  const clone = miniCSS.clone();

  expect(clone).toBeInstanceOf(MiniCSS);
  expect(clone.toJSON()).toEqual({
    classes  : { firstClass: "_" },
    ids      : {},
    variables: {},
  });

  expect(clone.class("secondClass")).toBe("a");

  expect(clone.toJSON()).toEqual({
    classes: {
      firstClass : "_",
      secondClass: "a",
    },
    ids      : {},
    variables: {},
  });

  expect(miniCSS.toJSON()).toEqual({
    classes  : { firstClass: "_" },
    ids      : {},
    variables: {},
  });
});
