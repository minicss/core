import MiniCSS from "../src/MiniCSS.js";
import Node from "../src/Node.js";
import * as exported from "../src/index.js";

it("should export necessary code", () => {
  expect(Object.keys(exported)).toEqual(["default", "MiniCSS", "Node"]);

  expect(exported.default).toEqual(exported.MiniCSS);
  expect(exported.MiniCSS).toEqual(MiniCSS);
  expect(exported.Node).toEqual(Node);
});
