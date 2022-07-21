import Node from "./Node.js";

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
   */
  public constructor(base?: MiniCSS) {
    if (base == null) return;

    this.#classes = base.#classes.clone();
    this.#ids = base.#ids.clone();
    this.#keyframes = base.#keyframes.clone();
    this.#variables = base.#variables.clone();
  }

  /**
   * Maps the given CSS class to an already generated one or generate a new one.
   * @param name
   * @example
   * const name = miniCSS.class("class");
   */
  public class(name: string): string {
    return this.#classes.name(name);
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
    return this.#ids.name(name);
  }

  /**
   * Maps the given CSS variable to an already generated one or generate a new one.
   * @param name
   * @example
   * const name = miniCSS.keyframe("keyframe");
   */
  public keyframe(name: string): string {
    return this.#keyframes.name(name);
  }

  /**
   * Converts the current miniCSS instance to a JSON compatible object.
   * @example
   * const obj = miniCSS.toJSON();
   * @example
   * const obj = JSON.stringify(miniCSS);
   */
  public toJSON(): Record<"classes" | "ids" | "keyframes" | "variables", Record<string, string>> {
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
    return this.#variables.name(name);
  }

}
