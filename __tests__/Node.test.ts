import Node from "../src/Node.js";
import { OPERATOR } from "../src/index.js";

it("should create a new instance", () => {
  const node = (new Node);

  expect(node).toBeInstanceOf(Node);
  expect(node.entries()).toEqual((new Map).entries());
  expect(node.toJSON()).toEqual({
    last     : "",
    map      : {},
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });
});

it("should add new mapped names", () => {
  const node = (new Node);

  expect(node.rename("firstName")).toBe("_");
  expect(node.rename("secondName")).toBe("a");

  expect(node.toJSON()).toEqual({
    last: "a",
    map : {
      firstName : "_",
      secondName: "a",
    },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });
});

it("should clone the instance", () => {
  const node = (new Node);

  expect(node.rename("firstName")).toBe("_");

  expect(node.toJSON()).toEqual({
    last     : "_",
    map      : { firstName: "_" },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });

  const clone = node.clone();

  expect(clone).toBeInstanceOf(Node);
  expect(clone.toJSON()).toEqual({
    last     : "_",
    map      : { firstName: "_" },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });

  expect(clone.rename("secondName")).toBe("a");

  expect(clone.toJSON()).toEqual({
    last: "a",
    map : {
      firstName : "_",
      secondName: "a",
    },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });

  expect(node.toJSON()).toEqual({
    last     : "_",
    map      : { firstName: "_" },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });
});

it("should create a new instance from JSON output", () => {
  const node = Node.fromJSON({
    last: "_",
    map : {
      firstName: "_",
    },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });

  expect(node.toJSON()).toEqual({
    last     : "_",
    map      : { firstName: "_" },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });

  expect(node.rename("secondName")).toBe("a");

  expect(node.toJSON()).toEqual({
    last: "a",
    map : {
      firstName : "_",
      secondName: "a",
    },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });
});

it("should add new attribute selectors", () => {
  const node = (new Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.EXACT,
    value   : "foo",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.EXACT_SPACE_SEPARATED_WORD,
    value   : "bar",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN,
    value   : "col",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.STARTS_WITH,
    value   : "baz",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.CONTAINS,
    value   : "something",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.CONTAINS,
    value   : "baz",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.ENDS_WITH,
    value   : "end",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.ENDS_WITH,
    value   : "baz",
  })).toBeInstanceOf(Node);

  expect(() => node.addAttributeSelector({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operator: "wrong" as any,
    value   : "baz",
  })).toThrowError("Attribute selector operator \"wrong\" is not supported.");

  expect(node.toJSON()).toEqual({
    last     : "e",
    map      : {},
    selectors: {
      start: [
        {
          value      : "col-",
          generated  : "_",
          replacement: "_-",
        },
        {
          value      : "baz",
          generated  : "a",
          replacement: "a-",
        },
      ],
      contain: [
        {
          value      : "something",
          generated  : "b",
          replacement: "-b-",
        },
        {
          value      : "baz",
          generated  : "c",
          replacement: "-c-",
        },
      ],
      end: [
        {
          value      : "end",
          generated  : "d",
          replacement: "-d",
        },
        {
          value      : "baz",
          generated  : "e",
          replacement: "-e",
        },
      ],
    },
  });
});

it("should optimize attribute selectors", () => {
  const json = {
    last     : "e",
    map      : {},
    selectors: {
      start: [
        {
          value      : "col-",
          generated  : "_",
          replacement: "_-",
        },
        {
          value      : "baz",
          generated  : "a",
          replacement: "a-",
        },
      ],
      contain: [
        {
          value      : "something",
          generated  : "b",
          replacement: "-b-",
        },
        {
          value      : "baz",
          generated  : "c",
          replacement: "-c-",
        },
      ],
      end: [
        {
          value      : "end",
          generated  : "d",
          replacement: "-d",
        },
        {
          value      : "baz",
          generated  : "e",
          replacement: "-e",
        },
      ],
    },
  };

  const node = Node.fromJSON(json);

  expect(node.toJSON()).toEqual(json);

  expect(node.rename("something")).toBe("-b-f");

  expect(node.optimize()).toBeInstanceOf(Node);

  expect(node.toJSON()).toEqual({
    last: "f",
    map : {
      "col-"   : "_-",
      baz      : "a-c-e",
      something: "-b-f",
      end      : "-d",
    },
    selectors: {
      start: [
        {
          value      : "col-",
          generated  : "_",
          replacement: "_-",
        },
        {
          value      : "baz",
          generated  : "a",
          replacement: "a-",
        },
      ],
      contain: [
        {
          value      : "something",
          generated  : "b",
          replacement: "-b-",
        },
        {
          value      : "baz",
          generated  : "c",
          replacement: "-c-",
        },
      ],
      end: [
        {
          value      : "end",
          generated  : "d",
          replacement: "-d",
        },
        {
          value      : "baz",
          generated  : "e",
          replacement: "-e",
        },
      ],
    },
  });
});

it("should rename attribute selectors", () => {
  const node = Node.fromJSON({
    last: "e",
    map : {
      "col-"   : "_-",
      baz      : "a-c-e",
      something: "-b-",
      end      : "-d",
    },
    selectors: {
      start: [
        {
          value      : "col-",
          generated  : "_",
          replacement: "_-",
        },
        {
          value      : "baz",
          generated  : "a",
          replacement: "a-",
        },
      ],
      contain: [
        {
          value      : "something",
          generated  : "b",
          replacement: "-b-",
        },
        {
          value      : "baz",
          generated  : "c",
          replacement: "-c-",
        },
      ],
      end: [
        {
          value      : "end",
          generated  : "d",
          replacement: "-d",
        },
        {
          value      : "baz",
          generated  : "e",
          replacement: "-e",
        },
      ],
    },
  });

  expect(node.attributeSelector({
    operator: OPERATOR.EXACT,
    value   : "foo",
  })).toEqual({
    operator: OPERATOR.EXACT,
    value   : "f",
  });

  expect(node.attributeSelector({
    operator: OPERATOR.EXACT_SPACE_SEPARATED_WORD,
    value   : "bar lorem",
  })).toEqual({
    operator: OPERATOR.EXACT_SPACE_SEPARATED_WORD,
    value   : "g h",
  });

  expect(node.attributeSelector({
    operator: OPERATOR.EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN,
    value   : "col",
  })).toEqual({
    operator: OPERATOR.STARTS_WITH,
    value   : "_-",
  });

  expect(node.attributeSelector({
    operator: OPERATOR.STARTS_WITH,
    value   : "baz",
  })).toEqual({
    operator: OPERATOR.STARTS_WITH,
    value   : "a-",
  });

  expect(node.attributeSelector({
    operator: OPERATOR.CONTAINS,
    value   : "something",
  })).toEqual({
    operator: OPERATOR.CONTAINS,
    value   : "-b-",
  });

  expect(node.attributeSelector({
    operator: OPERATOR.CONTAINS,
    value   : "baz",
  })).toEqual({
    operator: OPERATOR.CONTAINS,
    value   : "-c-",
  });

  expect(node.attributeSelector({
    operator: OPERATOR.ENDS_WITH,
    value   : "end",
  })).toEqual({
    operator: OPERATOR.ENDS_WITH,
    value   : "-d",
  });

  expect(node.attributeSelector({
    operator: OPERATOR.ENDS_WITH,
    value   : "baz",
  })).toEqual({
    operator: OPERATOR.ENDS_WITH,
    value   : "-e",
  });

  expect(() => node.attributeSelector({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operator: "wrong" as any,
    value   : "baz",
  })).toThrowError("Attribute selector operator \"wrong\" is not supported.");

  expect(node.toJSON()).toEqual({
    last: "i",
    map : {
      col      : "_-i",
      "col-"   : "_-",
      baz      : "a-c-e",
      something: "-b-",
      end      : "-d",
      foo      : "f",
      bar      : "g",
      lorem    : "h",
    },
    selectors: {
      start: [
        {
          value      : "col-",
          generated  : "_",
          replacement: "_-",
        },
        {
          value      : "baz",
          generated  : "a",
          replacement: "a-",
        },
      ],
      contain: [
        {
          value      : "something",
          generated  : "b",
          replacement: "-b-",
        },
        {
          value      : "baz",
          generated  : "c",
          replacement: "-c-",
        },
      ],
      end: [
        {
          value      : "end",
          generated  : "d",
          replacement: "-d",
        },
        {
          value      : "baz",
          generated  : "e",
          replacement: "-e",
        },
      ],
    },
  });
});

it("should modify existing selectors while add new attribute selectors", () => {
  const node = (new Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.STARTS_WITH,
    value   : "fo",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.STARTS_WITH,
    value   : "foo",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.STARTS_WITH,
    value   : "f",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.CONTAINS,
    value   : "ba",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.CONTAINS,
    value   : "bar",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.CONTAINS,
    value   : "b",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.ENDS_WITH,
    value   : "orem",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.ENDS_WITH,
    value   : "lorem",
  })).toBeInstanceOf(Node);

  expect(node.addAttributeSelector({
    operator: OPERATOR.ENDS_WITH,
    value   : "em",
  })).toBeInstanceOf(Node);

  expect(node.toJSON()).toEqual({
    last     : "h",
    map      : {},
    selectors: {
      start: [
        {
          value      : "foo",
          generated  : "a",
          replacement: "b-_-a-",
        },
        {
          value      : "fo",
          generated  : "_",
          replacement: "b-_-",
        },
        {
          value      : "f",
          generated  : "b",
          replacement: "b-",
        },
      ],
      contain: [
        {
          value      : "bar",
          generated  : "d",
          replacement: "-d-c-e-",
        },
        {
          value      : "ba",
          generated  : "c",
          replacement: "-c-e-",
        },
        {
          value      : "b",
          generated  : "e",
          replacement: "-e-",
        },
      ],
      end: [
        {
          value      : "lorem",
          generated  : "g",
          replacement: "-g-f-h",
        },
        {
          value      : "orem",
          generated  : "f",
          replacement: "-f-h",
        },
        {
          value      : "em",
          generated  : "h",
          replacement: "-h",
        },
      ],
    },
  });

  expect(node.optimize()).toBeInstanceOf(Node);

  expect(node.toJSON()).toEqual({
    last: "h",
    map : {
      f    : "b-",
      fo   : "b-_-",
      foo  : "b-_-a-",
      b    : "-e-",
      ba   : "-c-e-",
      bar  : "-d-c-e-",
      em   : "-h",
      orem : "-f-h",
      lorem: "-g-f-h",
    },
    selectors: {
      start: [
        {
          value      : "foo",
          generated  : "a",
          replacement: "b-_-a-",
        },
        {
          value      : "fo",
          generated  : "_",
          replacement: "b-_-",
        },
        {
          value      : "f",
          generated  : "b",
          replacement: "b-",
        },
      ],
      contain: [
        {
          value      : "bar",
          generated  : "d",
          replacement: "-d-c-e-",
        },
        {
          value      : "ba",
          generated  : "c",
          replacement: "-c-e-",
        },
        {
          value      : "b",
          generated  : "e",
          replacement: "-e-",
        },
      ],
      end: [
        {
          value      : "lorem",
          generated  : "g",
          replacement: "-g-f-h",
        },
        {
          value      : "orem",
          generated  : "f",
          replacement: "-f-h",
        },
        {
          value      : "em",
          generated  : "h",
          replacement: "-h",
        },
      ],
    },
  });
});
