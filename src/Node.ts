import { NodeAttributeSelectorI, NodeJSONOutputI, OPERATOR, ProcessedAttributeSelectorI } from "./constants.js";
import { generate } from "./utils.js";

/**
 *
 */
export default class Node extends Map<string, string> {

  /**
   * Attribute selectors for names containing the value.
   * @private
   */
  #containSelectors: ProcessedAttributeSelectorI[] = [];

  /**
   * Attribute selectors for names ending with the value.
   * @private
   */
  #endSelectors: ProcessedAttributeSelectorI[] = [];

  /**
   * Last generated name.
   * @private
   */
  #last = "";

  /**
   * Attribute selectors for names starting with the value.
   * @private
   */
  #startSelectors: ProcessedAttributeSelectorI[] = [];

  /**
   * New Node instance.
   * @param node
   * @example
   * const node = new Node;
   */
  public constructor(node?: IterableIterator<[string, string]>
  | Node
  | ReadonlyArray<readonly [string, string]>
  | null) {
    if (node instanceof Node) {
      super(node.entries());

      this.#last = node.#last;

      return;
    }

    super(node);
  }

  /**
   * Creates a new node instance from the JSON output.
   * @example
   * const node = Node.fromJSON(obj);
   */
  public static fromJSON(json: NodeJSONOutputI): Node {
    const node = new Node(Object.entries(json.map));

    node.#last = json.last;

    node.#startSelectors = json.selectors.start;
    node.#containSelectors = json.selectors.contain;
    node.#endSelectors = json.selectors.end;

    return node;
  }

  /**
   * Add an attribute selector to be applied to the renaming process after this call.
   * @param selector
   * @example
   * node = node.addAttributeSelector({
   *   operator: OPERATOR.EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN,
   *   value   : "col",
   * });
   */
  public addAttributeSelector(selector: NodeAttributeSelectorI): this {
    const { operator, value } = selector;

    if (operator === OPERATOR.EXACT || operator === OPERATOR.EXACT_SPACE_SEPARATED_WORD) return this;

    const last = this.#last;

    const generated = this.#generate();

    let replacement = generated;

    let selectors: ProcessedAttributeSelectorI[];

    switch (operator) {
      case OPERATOR.EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN:
        this.#last = last;

        return this.addAttributeSelector({
          operator: OPERATOR.STARTS_WITH,
          value   : `${ value }-`,
        });
      case OPERATOR.STARTS_WITH:
        selectors = this.#startSelectors;

        if (selectors.some(existing => existing.value === value)) {
          this.#last = last;

          return this;
        }

        replacement += "-";

        [...selectors].reverse().forEach((existing) => {
          if (value.startsWith(existing.value)) replacement = `${ existing.replacement }${ replacement }`;
        });

        selectors.forEach((existing) => {
          if (existing.value.startsWith(value)) existing.replacement = `${ replacement }${ existing.replacement }`;
        });

        break;
      case OPERATOR.CONTAINS:
        selectors = this.#containSelectors;

        if (selectors.some(existing => existing.value === value)) {
          this.#last = last;

          return this;
        }

        [...selectors].reverse().forEach((existing) => {
          if (value.includes(existing.value)) replacement += `${ existing.replacement }-`;
        });

        selectors.forEach((existing) => {
          if (existing.value.includes(value)) existing.replacement += `${ replacement }-`;
        });

        replacement = `-${ replacement }-`.replaceAll(/-{2,}/g, "-");

        break;
      case OPERATOR.ENDS_WITH:
        selectors = this.#endSelectors;

        if (selectors.some(existing => existing.value === value)) {
          this.#last = last;

          return this;
        }

        replacement = `-${ replacement }`;

        [...selectors].reverse().forEach((existing) => {
          if (value.endsWith(existing.value)) replacement = `${ replacement }${ existing.replacement }`;
        });

        selectors.forEach((existing) => {
          if (existing.value.endsWith(value)) existing.replacement = `${ existing.replacement }${ replacement }`;
        });

        break;
      default:
        this.#last = last;

        throw new Error(`Attribute selector operator "${ operator }" is not supported.`);
    }

    selectors.push({
      value,
      generated,
      replacement,
    });

    selectors.sort((a, b) => b.value.length - a.value.length);

    return this;
  }

  /**
   * Maps the given attribute to an already generated one or generate a new one.
   * @param selector
   * @example
   * const { operator, value } = node.attributeSelector({
   *   operator: OPERATOR.EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN,
   *   value   : "col",
   * });
   */
  public attributeSelector(selector: NodeAttributeSelectorI): NodeAttributeSelectorI {
    this.addAttributeSelector(selector);

    const { operator, value } = selector;

    const result = {
      operator,
      value,
    };

    let selectors: ProcessedAttributeSelectorI[];

    // eslint-disable-next-line default-case
    switch (operator) {
      case OPERATOR.EXACT:
        result.value = this.rename(value);

        return result;
      case OPERATOR.EXACT_SPACE_SEPARATED_WORD:
        result.value = value.replaceAll(/[^ ]+/g, match => this.rename(match));

        return result;
      case OPERATOR.EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN:
        result.operator = OPERATOR.STARTS_WITH;

        result.value += "-";

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result.value = this.#startSelectors.find(existingStart => existingStart.value === result.value)!.replacement;

        if (!this.has(value)) this.set(value, `${ result.value }${ this.#generate() }`);

        return result;
      case OPERATOR.STARTS_WITH:
        selectors = this.#startSelectors;

        break;
      case OPERATOR.CONTAINS:
        selectors = this.#containSelectors;

        break;
      case OPERATOR.ENDS_WITH:
        selectors = this.#endSelectors;

        break;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    result.value = selectors.find(existingStart => existingStart.value === result.value)!.replacement;

    return result;
  }

  /**
   * Creates a clone of the current node instance.
   * @example
   * const clone = node.clone();
   */
  public clone(): Node {
    return new Node(this);
  }

  /**
   * Generates a new string based on the last one in the current node instance.
   * @private
   */
  #generate(): string {
    return (this.#last = generate(this.#last));
  }

  /**
   * Optimize attribute selectors and name maps.
   * @example
   * node = node.optimize();
   */
  public optimize(): this {
    const startSelectors = this.#startSelectors;
    const containSelectors = this.#containSelectors;
    const endSelectors = this.#endSelectors;

    const startNames = startSelectors.map(selector => selector.value);
    const containNames = containSelectors.map(selector => selector.value);
    const endNames = endSelectors.map(selector => selector.value);

    // TODO: Combination names.
    const names = new Set([
      ...startNames,
      ...containNames,
      ...endNames,
    ]);

    for (const name of names) {
      if (this.has(name)) continue;

      const replacement = `${
        startSelectors.find(selector => name.startsWith(selector.value))?.replacement ?? ""
      }${
        containSelectors.find(selector => name.includes(selector.value))?.replacement ?? ""
      }${
        endSelectors.find(selector => name.endsWith(selector.value))?.replacement ?? ""
      }`.replaceAll(/-{2,}/g, "-");

      /* istanbul ignore next */
      if (replacement === "") throw new Error("Something unexpected happened, please report this bug.");

      this.set(name, replacement);
    }

    return this;
  }

  /**
   * Maps the given name to an already generated one or generate a new one.
   * @param name
   * @example
   * const name = node.name("name");
   */
  public rename(name: string): string {
    if (!this.has(name)) {
      /*
       * Let replacement = this.#generate();
       *
       * this.#containSelectors.forEach((selector) => {
       *   if (name.includes(selector.value)) replacement += selector.generated;
       * });
       *
       * this.#startSelectors.forEach((selector) => {
       *   if (name.startsWith(selector.value)) replacement = `${ selector.generated }${ replacement }`;
       * });
       *
       * this.#endSelectors.forEach((selector) => {
       *   if (name.endsWith(selector.value)) replacement += selector.generated;
       * });
       *
       * this.set(name, replacement.replaceAll(/-{2,}/g, "-"));
       */

      this.set(
        name,
        `${
          this.#startSelectors.find(selector => name.startsWith(selector.value))?.replacement ?? ""
        }${
          this.#containSelectors.find(selector => name.includes(selector.value))?.replacement ?? ""
        }${
          this.#generate()
        }${
          this.#endSelectors.find(selector => name.endsWith(selector.value))?.replacement ?? ""
        }`.replaceAll(/-{2,}/g, "-"),
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.get(name)!;
  }

  /**
   * Converts the current node instance to a JSON compatible object.
   * @example
   * const obj = node.toJSON();
   * @example
   * const obj = JSON.stringify(node);
   */
  public toJSON(): NodeJSONOutputI {
    return {
      last     : this.#last,
      map      : Object.fromEntries(this.entries()),
      selectors: {
        start  : this.#startSelectors,
        contain: this.#containSelectors,
        end    : this.#endSelectors,
      },
    };
  }

}
