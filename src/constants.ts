export const DICTIONARY = "0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" as const;

export const DICTIONARY_LENGTH = DICTIONARY.length;

export const FIRST_SINGLE_CHAR = "_" as const;

export const FIRST_CHAR = DICTIONARY[0];

export const LAST_CHAR = DICTIONARY[DICTIONARY_LENGTH - 1];

export const LAST_CHAR_REGEX = new RegExp(`${ LAST_CHAR }+$`);

export const ESCAPE_CHARACTERS = "#^$.:*+?()[\\]{}|";

export const ESCAPE_CHARACTERS_REGEX = new RegExp(
  `(?<!\\\\)([${ ESCAPE_CHARACTERS }])`,
  "g",
);

export const ESCAPE_BACK_SLASH_REGEX = new RegExp(
  `(?<!\\\\)\\\\(?![\\\\${ ESCAPE_CHARACTERS }])`,
  "g",
);

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
  classes: NodeJSONOutputI;
  ids: NodeJSONOutputI;
  keyframes: NodeJSONOutputI;
  variables: NodeJSONOutputI;
}

export interface NodeJSONOutputI {
  last: string;
  map: Record<string, string>;
  selectors: {
    contain: ProcessedAttributeSelectorI[];
    end: ProcessedAttributeSelectorI[];
    start: ProcessedAttributeSelectorI[];
  };
}

export interface NodeAttributeSelectorI {
  operator: OPERATOR;
  value: string;
}

export interface AttributeSelectorI extends NodeAttributeSelectorI {
  attribute: ATTRIBUTE;
  caseSensitivity?: CASE_SENSITIVITY;
}

export interface ProcessedAttributeSelectorI {
  generated: string;
  replacement: string;
  value: string;
}
