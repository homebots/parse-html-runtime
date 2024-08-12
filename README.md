# @homebots/parse-html-runtime

Runtime extensions for @homebots/parse-html.

Useful in runtime to work with a parsed tree created from the parser.

## API


**normalize(nodes)**

Remove empty text nodes from parsed tree:

```ts
import { normalize } from 'https://unpkg.com/@homebots/parse-html-runtime@latest/index.js'

const cleanNodes = normalize(nodes);
```

**serialize(nodes)**

Convert a parsed tree back to HTML text

```ts
import { serialize } from 'https://unpkg.com/@homebots/parse-html-runtime@latest/index.js'

const html = serialize(nodes);
```

**materialize(nodes)**

Convert a parsed tree into elements

```ts
import { materialize } from 'https://unpkg.com/@homebots/parse-html-runtime@latest/index.js'

const visitor = (el, node) => {
  // Example: save node structure in the element
  el['@node'] = node
};

const html = materialize(nodes, visitor);
```
