import MiniCSS from "../src/MiniCSS.js";
import { ATTRIBUTE, CASE_SENSITIVITY, OPERATOR } from "../src/index.js";

it("should create a new instance", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS).toBeInstanceOf(MiniCSS);
  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should add new mapped classes", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.class("firstClass")).toBe("_");
  expect(miniCSS.class("secondClass")).toBe("a");

  expect(miniCSS.class("firstClass")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last: "a",
      map : {
        firstClass : "_",
        secondClass: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should add new mapped ids", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.id("firstId")).toBe("_");
  expect(miniCSS.id("secondId")).toBe("a");

  expect(miniCSS.id("firstId")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last: "a",
      map : {
        firstId : "_",
        secondId: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should add new mapped keyframes", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.keyframe("firstKeyframe")).toBe("_");
  expect(miniCSS.keyframe("secondKeyframe")).toBe("a");

  expect(miniCSS.keyframe("firstKeyframe")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last: "a",
      map : {
        firstKeyframe : "_",
        secondKeyframe: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should add new mapped variables", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.variable("firstVariable")).toBe("_");
  expect(miniCSS.variable("secondVariable")).toBe("a");

  expect(miniCSS.variable("firstVariable")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last: "a",
      map : {
        firstVariable : "_",
        secondVariable: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
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
      last: "a",
      map : {
        firstClass : "_",
        secondClass: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last: "a",
      map : {
        firstId : "_",
        secondId: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last: "a",
      map : {
        firstKeyframe : "_",
        secondKeyframe: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last: "a",
      map : {
        firstVariable : "_",
        secondVariable: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should clone the instance", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.class("firstClass")).toBe("_");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last     : "_",
      map      : { firstClass: "_" },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });

  const clone = miniCSS.clone();

  expect(clone).toBeInstanceOf(MiniCSS);
  expect(clone.toJSON()).toEqual({
    classes: {
      last     : "_",
      map      : { firstClass: "_" },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });

  expect(clone.class("secondClass")).toBe("a");

  expect(clone.toJSON()).toEqual({
    classes: {
      last: "a",
      map : {
        firstClass : "_",
        secondClass: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last     : "_",
      map      : { firstClass: "_" },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should create a new instance from JSON output", () => {
  const miniCSS = MiniCSS.fromJSON({
    classes: {
      last: "a",
      map : {
        firstClass : "_",
        secondClass: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last: "a",
      map : {
        firstId : "_",
        secondId: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last: "a",
      map : {
        firstKeyframe : "_",
        secondKeyframe: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last: "a",
      map : {
        firstVariable : "_",
        secondVariable: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last: "a",
      map : {
        firstClass : "_",
        secondClass: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last: "a",
      map : {
        firstId : "_",
        secondId: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last: "a",
      map : {
        firstKeyframe : "_",
        secondKeyframe: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last: "a",
      map : {
        firstVariable : "_",
        secondVariable: "a",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });

  expect(miniCSS.class("thirdClass")).toBe("b");

  expect(miniCSS.id("thirdId")).toBe("b");

  expect(miniCSS.keyframe("thirdKeyframe")).toBe("b");

  expect(miniCSS.variable("thirdVariable")).toBe("b");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last: "b",
      map : {
        firstClass : "_",
        secondClass: "a",
        thirdClass : "b",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last: "b",
      map : {
        firstId : "_",
        secondId: "a",
        thirdId : "b",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last: "b",
      map : {
        firstKeyframe : "_",
        secondKeyframe: "a",
        thirdKeyframe : "b",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last: "b",
      map : {
        firstVariable : "_",
        secondVariable: "a",
        thirdVariable : "b",
      },
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should add new attribute selectors", () => {
  const miniCSS = (new MiniCSS);

  expect(miniCSS.addAttributeSelector({
    attribute: ATTRIBUTE.CLASS,
    operator : OPERATOR.EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN,
    value    : "col",
  })).toBeInstanceOf(MiniCSS);

  expect(miniCSS.addAttributeSelector({
    attribute: ATTRIBUTE.ID,
    operator : OPERATOR.STARTS_WITH,
    value    : "col",
  })).toBeInstanceOf(MiniCSS);

  expect(() => miniCSS.addAttributeSelector({
    caseSensitivity: CASE_SENSITIVITY.INSENSITIVE,
    attribute      : ATTRIBUTE.CLASS,
    operator       : OPERATOR.STARTS_WITH,
    value          : "col",
  })).toThrowError("Case-insensitive attribute selectors are not supported.");

  expect(() => miniCSS.addAttributeSelector({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attribute: "variable" as any,
    operator : OPERATOR.STARTS_WITH,
    value    : "col",
  })).toThrowError("Attribute selector \"variable\" is not supported.");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last     : "_",
      map      : {},
      selectors: {
        start: [
          {
            value      : "col-",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "_",
      map      : {},
      selectors: {
        start: [
          {
            value      : "col",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should optimize attribute selectors", () => {
  const miniCSS = MiniCSS.fromJSON({
    classes: {
      last     : "_",
      map      : {},
      selectors: {
        start: [
          {
            value      : "col-",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "_",
      map      : {},
      selectors: {
        start: [
          {
            value      : "col",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });

  expect(miniCSS.optimize()).toBeInstanceOf(MiniCSS);

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last     : "_",
      map      : { "col-": "_-" },
      selectors: {
        start: [
          {
            value      : "col-",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "_",
      map      : { col: "_-" },
      selectors: {
        start: [
          {
            value      : "col",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});

it("should rename attribute selectors", () => {
  const miniCSS = MiniCSS.fromJSON({
    classes: {
      last     : "_",
      map      : { "col-": "_-" },
      selectors: {
        start: [
          {
            value      : "col-",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "_",
      map      : { col: "_-" },
      selectors: {
        start: [
          {
            value      : "col",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });

  expect(miniCSS.attributeSelector({
    attribute: ATTRIBUTE.CLASS,
    operator : OPERATOR.EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN,
    value    : "col",
  })).toEqual({
    operator: OPERATOR.STARTS_WITH,
    value   : "_-",
  });

  expect(miniCSS.attributeSelector({
    attribute: ATTRIBUTE.ID,
    operator : OPERATOR.STARTS_WITH,
    value    : "col",
  })).toEqual({
    operator: OPERATOR.STARTS_WITH,
    value   : "_-",
  });

  expect(() => miniCSS.attributeSelector({
    caseSensitivity: CASE_SENSITIVITY.INSENSITIVE,
    attribute      : ATTRIBUTE.CLASS,
    operator       : OPERATOR.STARTS_WITH,
    value          : "col",
  })).toThrowError("Case-insensitive attribute selectors are not supported.");

  expect(() => miniCSS.attributeSelector({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attribute: "variable" as any,
    operator : OPERATOR.STARTS_WITH,
    value    : "col",
  })).toThrowError("Attribute selector \"variable\" is not supported.");

  expect(miniCSS.toJSON()).toEqual({
    classes: {
      last: "a",
      map : {
        col   : "_-a",
        "col-": "_-",
      },
      selectors: {
        start: [
          {
            value      : "col-",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    ids: {
      last     : "_",
      map      : { col: "_-" },
      selectors: {
        start: [
          {
            value      : "col",
            generated  : "_",
            replacement: "_-",
          },
        ],
        contain: [],
        end    : [],
      },
    },
    keyframes: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
    variables: {
      last     : "",
      map      : {},
      selectors: {
        start  : [],
        contain: [],
        end    : [],
      },
    },
  });
});
