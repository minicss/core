import { generate } from "./utils.js";

/**
 *
 */
export default class Node extends Map<string, string> {

  /**
   * Last generated name.
   * @private
   */
  #last: string | null = null;

  /**
   * New Node instance.
   * @param node
   * @example
   * const node = new Node;
   */
  // eslint-disable-next-line max-len
  public constructor(node?: IterableIterator<[string, string]> | Node | ReadonlyArray<readonly [string, string]> | null) {
    if (node instanceof Node) {
      super(node.entries());

      this.#last = node.#last;
    } else {
      super(node);
    }
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
   * Maps the given name to an already generated one or generate a new one.
   * @param name
   * @example
   * const name = node.name("name");
   */
  public name(name: string): string {
    if (!this.has(name)) this.set(name, this.#last = generate(this.#last));

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
  public toJSON(): Record<string, string> {
    return Object.fromEntries(this.entries());
  }

}
