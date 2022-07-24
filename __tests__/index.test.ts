import MiniCSS from "../src/MiniCSS.js";
import Node from "../src/Node.js";
import * as exported from "../src/index.js";

it("should export necessary code", () => {
  expect(Object.keys(exported))
    .toEqual(["default", "MiniCSS", "Node", "ATTRIBUTE", "OPERATOR", "CASE_SENSITIVITY"]);

  expect(exported.default).toEqual(exported.MiniCSS);
  expect(exported.MiniCSS).toEqual(MiniCSS);
  expect(exported.Node).toEqual(Node);

  expect(typeof exported.ATTRIBUTE).toBe("object");
  expect(typeof exported.OPERATOR).toBe("object");
  expect(typeof exported.CASE_SENSITIVITY).toBe("object");
});
