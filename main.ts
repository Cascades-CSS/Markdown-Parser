class Features {
	public bold = true;
	public headings = true;
	public horizontalRule = true;
	public italics = true;
	public images = true;
	public links = true;
	public strikethrough = true;
}

interface Reference {
	markdown: string;
}

function transformHeadings(reference: Reference): void {
	reference.markdown = reference.markdown.replace(/^# ([^\n]+)/gm, '<h1>$1</h1>');
	reference.markdown = reference.markdown.replace(/^## ([^\n]+)/gm, '<h2>$1</h2>');
	reference.markdown = reference.markdown.replace(/^### ([^\n]+)/gm, '<h3>$1</h3>');
}

function transformHorizontalRule(reference: Reference): void {
	reference.markdown = reference.markdown.replace(/^---$/gm, '<hr>');
}

function transformBold(reference: Reference): void {
	reference.markdown = reference.markdown.replace(/\*([^\*]+)\*/gm, '<strong>$1</strong>');
}

function transformItalics(reference: Reference): void {
	reference.markdown = reference.markdown.replace(/_([^_]+)_/gm, '<em>$1</em>');
}

function transformStrikethrough(reference: Reference): void {
	reference.markdown = reference.markdown.replace(/~([^~]+)~/gm, '<s>$1</s>');
}

function transformImages(reference: Reference): void {
	reference.markdown = reference.markdown.replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');
}

function transformLinks(reference: Reference): void {
	reference.markdown = reference.markdown.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
}

/**
 * Parse markdown into HTML.
 * @param markdown The markdown string.
 * @param features _(Optional)_ A record of features to enable/disable.
 * @returns The parsed HTML string.
 */
export function parse(
	markdown: string,
	features: Partial<Features> = new Features(),
): string {
	const reference: Reference = { markdown };

	if (features.headings) transformHeadings(reference);
	if (features.horizontalRule) transformHorizontalRule(reference);
	if (features.bold) transformBold(reference);
	if (features.italics) transformItalics(reference);
	if (features.strikethrough) transformStrikethrough(reference);
	if (features.images) transformImages(reference);
	if (features.links) transformLinks(reference);

	return reference.markdown;
}
