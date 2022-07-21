import MiniCSS from "../src/MiniCSS.js";

it("should create a new instance", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS).toBeInstanceOf(MiniCSS);
  expect(miniCSS.toJSON()).toEqual({
    classes  : {},
    ids      : {},
    keyframes: {},
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
    keyframes: {},
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
    keyframes: {},
    variables: {},
  });
});

it("should add new mapped keyframes", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.keyframe("firstKeyframe")).toBe("_");
  expect(miniCSS.keyframe("secondKeyframe")).toBe("a");

  expect(miniCSS.keyframe("firstKeyframe")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes  : {},
    ids      : {},
    keyframes: {
      firstKeyframe : "_",
      secondKeyframe: "a",
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
    keyframes: {},
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

  expect(miniCSS.keyframe("firstKeyframe")).toBe("_");
  expect(miniCSS.keyframe("secondKeyframe")).toBe("a");

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
    keyframes: {
      firstKeyframe : "_",
      secondKeyframe: "a",
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
    keyframes: {},
    variables: {},
  });

  const clone = miniCSS.clone();

  expect(clone).toBeInstanceOf(MiniCSS);
  expect(clone.toJSON()).toEqual({
    classes  : { firstClass: "_" },
    ids      : {},
    keyframes: {},
    variables: {},
  });

  expect(clone.class("secondClass")).toBe("a");

  expect(clone.toJSON()).toEqual({
    classes: {
      firstClass : "_",
      secondClass: "a",
    },
    ids      : {},
    keyframes: {},
    variables: {},
  });

  expect(miniCSS.toJSON()).toEqual({
    classes  : { firstClass: "_" },
    ids      : {},
    keyframes: {},
    variables: {},
  });
});
