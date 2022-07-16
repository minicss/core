const DICTIONARY = "0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" as const;

const DICTIONARY_LENGTH = DICTIONARY.length;

const FIRST_SINGLE_CHAR = DICTIONARY[10];

const FIRST_CHAR = DICTIONARY[0];

const LAST_CHAR = DICTIONARY[DICTIONARY_LENGTH - 1];

const LAST_REGEX = new RegExp(`^${ LAST_CHAR }*$`);

const LAST_CHAR_REGEX = new RegExp(`${ LAST_CHAR }+$`);

/**
 * Generates a new string based on the last provided one.
 * @param last
 */
export function generate(last: string | null): string {
  if (last == null) return FIRST_SINGLE_CHAR;

  const length = last.length;

  if (LAST_REGEX.test(last)) return `${ FIRST_SINGLE_CHAR }${ FIRST_CHAR.repeat(length) }`;

  const match = last.match(LAST_CHAR_REGEX);

  if (match == null) return `${ last.substring(0, length - 1) }${ DICTIONARY[DICTIONARY.indexOf(last[length - 1]) + 1] }`;

  const { index } = match as { index: number };

  return `${
    last.substring(0, index - 1)
  }${
    DICTIONARY[DICTIONARY.indexOf(last[index - 1]) + 1]
  }${
    FIRST_CHAR.repeat(match[0].length)
  }`;
}
