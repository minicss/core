export const DICTIONARY = "0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" as const;

export const DICTIONARY_LENGTH = DICTIONARY.length;

export const FIRST_SINGLE_CHAR = "_" as const;

export const FIRST_CHAR = DICTIONARY[0];

export const LAST_CHAR = DICTIONARY[DICTIONARY_LENGTH - 1];

export const LAST_CHAR_REGEX = new RegExp(`${ LAST_CHAR }+$`);

export interface MiniCSSJSONOutputI {
  classes: Record<string, string>;
  ids: Record<string, string>;
  keyframes: Record<string, string>;
  variables: Record<string, string>;
}
