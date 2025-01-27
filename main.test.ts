import { expect } from '@std/expect';
import { parse } from './main.ts';

const allFeaturesDisabled = {
	bold: false,
	headings: false,
	horizontalRule: false,
	italics: false,
	images: false,
	links: false,
	strikethrough: false,
};

Deno.test('Heading 1', async (test) => {
	const config = { ...allFeaturesDisabled, headings: true };

	await test.step('Isolated', () => {
		const markdown = '# Hello World';
		const html = '<h1>Hello World</h1>';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = 'Lorem ipsum\n# Hello World\n1234\n';
		const html = 'Lorem ipsum\n<h1>Hello World</h1>\n1234\n';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Heading 2', async (test) => {
	const config = { ...allFeaturesDisabled, headings: true };

	await test.step('Isolated', () => {
		const markdown = '## Hello World';
		const html = '<h2>Hello World</h2>';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = 'Lorem ipsum\n## Hello World\n1234\n';
		const html = 'Lorem ipsum\n<h2>Hello World</h2>\n1234\n';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Heading 3', async (test) => {
	const config = { ...allFeaturesDisabled, headings: true };

	await test.step('Isolated', () => {
		const markdown = '### Hello World';
		const html = '<h3>Hello World</h3>';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = 'Lorem ipsum\n### Hello World\n1234\n';
		const html = 'Lorem ipsum\n<h3>Hello World</h3>\n1234\n';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Horizontal Rule', async (test) => {
	const config = { ...allFeaturesDisabled, horizontalRule: true };

	await test.step('Isolated', () => {
		const markdown = '---';
		const html = '<hr>';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = '# Foo\n---\nbar baz';
		const html = '# Foo\n<hr>\nbar baz';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Image', async (test) => {
	const config = { ...allFeaturesDisabled, images: true };

	await test.step('Isolated', () => {
		const markdown = '![foo](https://example.com/image.png)';
		const html = '<img src="https://example.com/image.png" alt="foo">';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = 'Lorem ipsum ![dolor](https://example.com/image.png) sit amet.';
		const html = 'Lorem ipsum <img src="https://example.com/image.png" alt="dolor"> sit amet.';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Link', async (test) => {
	const config = { ...allFeaturesDisabled, links: true };

	await test.step('Isolated', () => {
		const markdown = '[link](https://example.com)';
		const html = '<a href="https://example.com">link</a>';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = 'Lorem ipsum [dolor](https://example.com) sit amet.';
		const html = 'Lorem ipsum <a href="https://example.com">dolor</a> sit amet.';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Bold', async (test) => {
	const config = { ...allFeaturesDisabled, bold: true };

	await test.step('Isolated', () => {
		const markdown = '*lorem ipsum dolor*';
		const html = '<strong>lorem ipsum dolor</strong>';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = 'lorem ipsum *dolor sit amet*\nconsectetur adipisicing elit.';
		const html = 'lorem ipsum <strong>dolor sit amet</strong>\nconsectetur adipisicing elit.';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Italics', async (test) => {
	const config = { ...allFeaturesDisabled, italics: true };

	await test.step('Isolated', () => {
		const markdown = '_lorem ipsum dolor_';
		const html = '<em>lorem ipsum dolor</em>';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = 'lorem ipsum _dolor sit amet_\nconsectetur adipisicing elit.';
		const html = 'lorem ipsum <em>dolor sit amet</em>\nconsectetur adipisicing elit.';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Strikethrough', async (test) => {
	const config = { ...allFeaturesDisabled, strikethrough: true };

	await test.step('Isolated', () => {
		const markdown = '~lorem ipsum dolor~';
		const html = '<s>lorem ipsum dolor</s>';
		expect(parse(markdown, config)).toBe(html);
	});

	await test.step('Integrated', () => {
		const markdown = 'lorem ipsum ~dolor sit amet~\nconsectetur adipisicing elit.';
		const html = 'lorem ipsum <s>dolor sit amet</s>\nconsectetur adipisicing elit.';
		expect(parse(markdown, config)).toBe(html);
	});
});

Deno.test('Breaks', async (test) => {
	const config = { ...allFeaturesDisabled, breaks: true };

	await test.step('Isolated', () => {
		const markdown1 = '  \n';
		const html1 = '<br>';
		expect(parse(markdown1, config)).toBe(html1);

		const markdown2 = '\n\n';
		const html2 = '<br>';
		expect(parse(markdown2, config)).toBe(html2);
	});

	await test.step('Integrated', () => {
		const markdown1 = 'lorem ipsum dolor  \n';
		const html1 = 'lorem ipsum dolor<br>';
		expect(parse(markdown1, config)).toBe(html1);

		const markdown2 = 'lorem ipsum dolor\n\n';
		const html2 = 'lorem ipsum dolor<br>';
		expect(parse(markdown2, config)).toBe(html2);
	});
});
