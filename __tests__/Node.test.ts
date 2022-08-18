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

it("should return original name if not already set", () => {
  const node = (new Node);

  expect(node.size).toBe(0);

  expect(node.get("foo")).toBe("foo");

  expect(node.size).toBe(0);
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

it("should not reset the existing name", () => {
  const node = (new Node);

  expect(node.rename("foo")).toBe("_");

  expect(() => node.set("foo", "bar")).toThrowError('"foo" is already set.');

  expect(node.toJSON()).toEqual({
    last: "_",
    map : {
      foo: "_",
    },
    selectors: {
      start  : [],
      contain: [],
      end    : [],
    },
  });
});

it("should delete the existing name", () => {
  const node = (new Node);

  expect(node.delete("foo")).toBe(false);

  expect(node.rename("foo")).toBe("_");

  expect(node.delete("foo")).toBe(true);

  expect(node.toJSON()).toEqual({
    last     : "_",
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

it("should clear the node", () => {
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

  expect(node).toBeInstanceOf(Node);

  expect(node.clear()).toBeInstanceOf(Node);

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
      baz               : "a-c-e",
      bazbaz            : "a-c-e",
      bazbazbaz         : "a-c-e",
      bazbazend         : "a-c-d",
      bazend            : "a-c-d",
      bazsomething      : "a-b-",
      bazsomethingbaz   : "a-b-e",
      bazsomethingend   : "a-b-d",
      "col-"            : "_-",
      "col-baz"         : "_-c-e",
      "col-bazbaz"      : "_-c-e",
      "col-bazend"      : "_-c-d",
      "col-end"         : "_-d",
      "col-something"   : "_-b-",
      "col-somethingbaz": "_-b-e",
      "col-somethingend": "_-b-d",
      end               : "-d",
      something         : "-b-f",
      somethingbaz      : "-b-e",
      somethingend      : "-b-d",
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
      b          : "-e-",
      ba         : "-c-e-",
      baem       : "-c-e-h",
      balorem    : "-c-e-g-f-h",
      baorem     : "-c-e-f-h",
      bar        : "-d-c-e-",
      barem      : "-d-c-e-h",
      barlorem   : "-d-c-e-g-f-h",
      barorem    : "-d-c-e-f-h",
      bem        : "-e-h",
      blorem     : "-e-g-f-h",
      borem      : "-e-f-h",
      em         : "-h",
      f          : "b-",
      fb         : "b-e-",
      fba        : "b-c-e-",
      fbaem      : "b-c-e-h",
      fbalorem   : "b-c-e-g-f-h",
      fbaorem    : "b-c-e-f-h",
      fbar       : "b-d-c-e-",
      fbarem     : "b-d-c-e-h",
      fbarlorem  : "b-d-c-e-g-f-h",
      fbarorem   : "b-d-c-e-f-h",
      fbem       : "b-e-h",
      fblorem    : "b-e-g-f-h",
      fborem     : "b-e-f-h",
      fem        : "b-h",
      florem     : "b-g-f-h",
      fo         : "b-_-",
      fob        : "b-_-e-",
      foba       : "b-_-c-e-",
      fobaem     : "b-_-c-e-h",
      fobalorem  : "b-_-c-e-g-f-h",
      fobaorem   : "b-_-c-e-f-h",
      fobar      : "b-_-d-c-e-",
      fobarem    : "b-_-d-c-e-h",
      fobarlorem : "b-_-d-c-e-g-f-h",
      fobarorem  : "b-_-d-c-e-f-h",
      fobem      : "b-_-e-h",
      foblorem   : "b-_-e-g-f-h",
      foborem    : "b-_-e-f-h",
      foem       : "b-_-h",
      folorem    : "b-_-g-f-h",
      foo        : "b-_-a-",
      foob       : "b-_-a-e-",
      fooba      : "b-_-a-c-e-",
      foobaem    : "b-_-a-c-e-h",
      foobalorem : "b-_-a-c-e-g-f-h",
      foobaorem  : "b-_-a-c-e-f-h",
      foobar     : "b-_-a-d-c-e-",
      foobarem   : "b-_-a-d-c-e-h",
      foobarlorem: "b-_-a-d-c-e-g-f-h",
      foobarorem : "b-_-a-d-c-e-f-h",
      foobem     : "b-_-a-e-h",
      fooblorem  : "b-_-a-e-g-f-h",
      fooborem   : "b-_-a-e-f-h",
      fooem      : "b-_-a-h",
      foolorem   : "b-_-a-g-f-h",
      fooorem    : "b-_-a-f-h",
      foorem     : "b-_-a-f-h",
      forem      : "b-_-f-h",
      lorem      : "-g-f-h",
      orem       : "-f-h",
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
