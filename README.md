# Markdown Parser

[![JSR Version](https://img.shields.io/jsr/v/%40cascades/markdown-parser)](https://jsr.io/@cascades/markdown-parser) [![Tests](https://github.com/Cascades-CSS/Markdown-Parser/actions/workflows/test.yml/badge.svg)](https://github.com/Cascades-CSS/Markdown-Parser/actions/workflows/test.yml)

A rudimentary markdown parser.


### Usage

```ts
import { parse } from 'jsr:@cascades/markdown-parser';

const markdown = `Lorem ipsum [dolor](https://example.com) sit amet.`;

const html = parse(markdown);
```

Produces the following HTML string:

```html
Lorem ipsum <a href="https://example.com">dolor</a> sit amet.
```


### Features

The following Markdown features are supported:
- Headings
- Bold
- Italics
- Strikethrough
- Inline code
- Code blocks
- Line breaks
- Horizontal rules
- Images
- Links
