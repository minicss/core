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
  readonly #classes = new Node;

  /**
   * CSS id map.
   * @private
   */
  readonly #ids = new Node;

  /**
   * CSS keyframes map.
   * @private
   */
  readonly #keyframes = new Node;

  /**
   * CSS variable map.
   * @private
   */
  readonly #variables = new Node;

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
   * Returns the classes node.
   * @example
   * const classes = miniCSS.classes();
   */
  public classes(): Node {
    return this.#classes;
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
   * Returns the ids node.
   * @example
   * const ids = miniCSS.ids();
   */
  public ids(): Node {
    return this.#ids;
  }

  /**
   * Returns the keyframes node.
   * @example
   * const keyframes = miniCSS.keyframes();
   */
  public keyframes(): Node {
    return this.#keyframes;
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
   * Returns the variables node.
   * @example
   * const variables = miniCSS.variables();
   */
  public variables(): Node {
    return this.#variables;
  }

}
