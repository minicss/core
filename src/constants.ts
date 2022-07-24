export const DICTIONARY = "0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" as const;

export const DICTIONARY_LENGTH = DICTIONARY.length;

export const FIRST_SINGLE_CHAR = "_" as const;

export const FIRST_CHAR = DICTIONARY[0];

export const LAST_CHAR = DICTIONARY[DICTIONARY_LENGTH - 1];

export const LAST_CHAR_REGEX = new RegExp(`${ LAST_CHAR }+$`);

export enum ATTRIBUTE {
  CLASS = "class",
  ID = "id",
}

export enum OPERATOR {
  EXACT = "=",
  EXACT_SPACE_SEPARATED_WORD = "~=",
  EXACT_OR_BEGINS_FOLLOWED_BY_HYPHEN = "|=",
  STARTS_WITH = "^=",
  ENDS_WITH = "$=",
  CONTAINS = "*=",
}

export enum CASE_SENSITIVITY {
  INSENSITIVE = "i",
  SENSITIVE = "s",
}

export interface MiniCSSJSONOutputI {
  classes: Record<string, string>;
  ids: Record<string, string>;
  keyframes: Record<string, string>;
  variables: Record<string, string>;
}
