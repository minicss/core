import Node from "./Node.js";
import {
  ATTRIBUTE,
  AttributeSelectorI,
  CASE_SENSITIVITY,
  MiniCSSJSONOutputI,
  NodeAttributeSelectorI,
} from "./constants.js";

/**
 *
 */
export default class MiniCSS {

  /**
   * CSS class map.
   * @private
   */
  #classes = new Node;

  /**
   * CSS id map.
   * @private
   */
  #ids = new Node;

  /**
   * CSS keyframes map.
   * @private
   */
  #keyframes = new Node;

  /**
   * CSS variable map.
   * @private
   */
  #variables = new Node;

  /**
   * New MiniCSS instance.
   * @param base
   * @example
   * const miniCSS = new MiniCSS;
   * @example
   * const clonedMiniCSS = new MiniCSS(miniCSS);
   * @example
   * const miniCSS = new MiniCSS({
   *   classes: {
   *     firstClass : "_",
   *     secondClass: "a",
   *   },
   *   ids: {
   *     firstId : "_",
   *     secondId: "a",
   *   },
   *   keyframes: {
   *     firstKeyframe : "_",
   *     secondKeyframe: "a",
   *   },
   *   variables: {
   *     firstVariable : "_",
   *     secondVariable: "a",
   *   },
   * });
   */
  public constructor(base?: MiniCSS | MiniCSSJSONOutputI) {
    if (base == null) return;

    if (base instanceof MiniCSS) {
      this.#classes = base.#classes.clone();
      this.#ids = base.#ids.clone();
      this.#keyframes = base.#keyframes.clone();
      this.#variables = base.#variables.clone();

      return;
    }

    this.#classes = Node.fromJSON(base.classes);
    this.#ids = Node.fromJSON(base.ids);
    this.#keyframes = Node.fromJSON(base.keyframes);
    this.#variables = Node.fromJSON(base.variables);
  }

  /**
   * Creates a new MiniCSS instance from the JSON output.
   * @example
   * const miniCSS = MiniCSS.fromJSON(obj);
   */
  public static fromJSON(map: MiniCSSJSONOutputI): MiniCSS {
    return new MiniCSS(map);
  }

  /**
   * Add a new attribute selection condition to be applied to classes/ids being renamed from this point on.
   * @param selector
   * @example
   * miniCSS = miniCSS.addAttributeSelector({
   *   attribute      : ATTRIBUTE.CLASS,
   *   operator       : OPERATOR.EXACT_OR_BEGIN_WITH_HYPHEN,
   *   value          : "col",
   *   caseSensitivity: CASE_SENSITIVITY.SENSITIVE,
   * });
   */
  public addAttributeSelector(selector: AttributeSelectorI): this {
    const { attribute, operator, value, caseSensitivity = CASE_SENSITIVITY.SENSITIVE } = selector;

    if (
      caseSensitivity.toLowerCase() === CASE_SENSITIVITY.INSENSITIVE
    ) throw new Error("Case-insensitive attribute selectors are not supported.");

    let node: Node;

    switch (attribute) {
      case ATTRIBUTE.CLASS:
        node = this.#classes;

        break;
      case ATTRIBUTE.ID:
        node = this.#ids;

        break;
      default:
        throw new Error(`Attribute selector "${ attribute }" is not supported.`);
    }

    node.addAttributeSelector({
      operator,
      value,
    });

    return this;
  }

  /**
   * Maps the given attribute to an already generated one or generate a new one.
   * @param selector
   * @example
   * const { operator, value } = node.attributeSelector({
   *   attribute      : ATTRIBUTE.CLASS,
   *   operator       : OPERATOR.EXACT_OR_BEGIN_WITH_HYPHEN,
   *   value          : "col",
   *   caseSensitivity: CASE_SENSITIVITY.SENSITIVE,
   * });
   */
  public attributeSelector(selector: AttributeSelectorI): NodeAttributeSelectorI {
    const { attribute, operator, value, caseSensitivity = CASE_SENSITIVITY.SENSITIVE } = selector;

    if (
      caseSensitivity.toLowerCase() === CASE_SENSITIVITY.INSENSITIVE
    ) throw new Error("Case-insensitive attribute selectors are not supported.");

    let node: Node;

    switch (attribute) {
      case ATTRIBUTE.CLASS:
        node = this.#classes;

        break;
      case ATTRIBUTE.ID:
        node = this.#ids;

        break;
      default:
        throw new Error(`Attribute selector "${ attribute }" is not supported.`);
    }

    return node.attributeSelector({
      operator,
      value,
    });
  }

  /**
   * Maps the given CSS class to an already generated one or generate a new one.
   * @param name
   * @example
   * const name = miniCSS.class("class");
   */
  public class(name: string): string {
    return this.#classes.rename(name);
  }

  /**
   * Creates a clone of the current miniCSS instance.
   * @example
   * const clone = miniCSS.clone();
   */
  public clone(): MiniCSS {
    return new MiniCSS(this);
  }

  /**
   * Maps the given CSS id to an already generated one or generate a new one.
   * @param name
   * @example
   * const name = miniCSS.id("id");
   */
  public id(name: string): string {
    return this.#ids.rename(name);
  }

  /**
   * Maps the given CSS variable to an already generated one or generate a new one.
   * @param name
   * @example
   * const name = miniCSS.keyframe("keyframe");
   */
  public keyframe(name: string): string {
    return this.#keyframes.rename(name);
  }

  /**
   * Optimize attribute selectors and name maps.
   * @example
   * miniCSS = miniCSS.optimize();
   */
  public optimize(): this {
    this.#classes.optimize();
    this.#ids.optimize();

    return this;
  }

  /**
   * Converts the current miniCSS instance to a JSON compatible object.
   * @example
   * const obj = miniCSS.toJSON();
   * @example
   * const obj = JSON.stringify(miniCSS);
   */
  public toJSON(): MiniCSSJSONOutputI {
    return {
      classes  : this.#classes.toJSON(),
      ids      : this.#ids.toJSON(),
      keyframes: this.#keyframes.toJSON(),
      variables: this.#variables.toJSON(),
    };
  }

  /**
   * Maps the given CSS variable to an already generated one or generate a new one.
   * @param name
   * @example
   * const name = miniCSS.variable("variable");
   */
  public variable(name: string): string {
    return this.#variables.rename(name);
  }

}
