# core

MiniCSS core package

[![Test](https://github.com/minicss/core/actions/workflows/test.yml/badge.svg)](https://github.com/minicss/core/actions/workflows/test.yml)
[![Coverage](https://codecov.io/gh/minicss/core/branch/main/graph/badge.svg?token=66XL2V4MY9)](https://codecov.io/gh/minicss/core)
[![License](https://img.shields.io/github/license/minicss/core.svg)](https://github.com/minicss/core/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@minicss/core.svg)](https://www.npmjs.com/package/@minicss/core)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/@minicss/core.svg)](https://www.npmjs.com/package/@minicss/core)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@minicss/core.svg)](https://www.npmjs.com/package/@minicss/core)
[![NPM Bundle Size (Minified + GZip)](https://img.shields.io/bundlephobia/minzip/@minicss/core.svg)](https://bundlephobia.com/package/@minicss/core)
[![NPM Bundle Size (Minified)](https://img.shields.io/bundlephobia/min/@minicss/core.svg)](https://bundlephobia.com/package/@minicss/core)
[![Built with TypeScript](https://img.shields.io/npm/types/prototyped.js.svg)](https://www.typescriptlang.org)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://jestjs.io)
[![Open GitHub Issues](https://img.shields.io/github/issues-raw/minicss/core.svg)](https://github.com/minicss/core/issues)
[![Open GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/minicss/core)](https://github.com/minicss/core/pulls)
[![Github Stars](https://img.shields.io/github/stars/minicss/core.svg?style=social&label=Stars)](https://github.com/minicss/core)
[![Github Forks](https://img.shields.io/github/forks/minicss/core.svg?style=social&label=Fork)](https://github.com/minicss/core)

## Table of Content

- [Installation](#installation)
- [Usage](#usage)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)

## Installation

```shell
npm i @minicss/core
```

## Usage

```typescript
import MiniCSS from "@minicss/core";

const miniCSS = new MiniCSS();

// First, you need to add attribute selectors.
miniCSS.addAttributeSelector(selector);

// Then, you can optimize nodes based on attribute selectors. (optional)
miniCSS.optimize();

// Then, you can replace the attribute selector operators & values.
const { operator, value } = miniCSS.attributeSelector(selector);

// Finally, you can rename classes/ids/variables/keyframes
const className = miniCSS.class("class");
const id = miniCSS.id("id");
const variable = miniCSS.variable("variable");
const keyframe = miniCSS.keyframe("keyframe");
```

> API usage documents are available [here](https://minicss.github.io/core).

## Versioning

We use [SemVer](http://semver.org) for versioning.
For the versions available, see the [releases on this repository](https://github.com/minicss/core/releases).

## Authors

- **Ardalan Amini** - _Core Maintainer_ - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/minicss/core/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/minicss/core/blob/main/LICENSE) file for details.
