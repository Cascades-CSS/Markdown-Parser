# Markdown Parser

[![Tests](https://github.com/Cascades-CSS/Markdown-Parser/actions/workflows/deno-test.yml/badge.svg)](https://github.com/Cascades-CSS/Markdown-Parser/actions/workflows/deno-test.yml)

A rudimentary markdown parser.

### Usage

```ts
import { parse } from 'jsr:@cascades/markdown-parser';

const markdown = `
# Lorem

Lorem ipsum [dolor](https://example.com) sit amet
`;

const html = parse(markdown);
```

Produces the following HTML string:

```html
<h1>Lorem</h1>

Lorem ipsum <a href="https://example.com">dolor</a> sit amet
```
