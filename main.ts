class Features {
	public headings = true;
	public horizontalRule = true;
	public links = true;
}

/**
 * Parse markdown into HTML.
 * @param markdown The markdown string.
 * @param features _(Optional)_ A record of features to enable/disable.
 * @returns The parsed HTML string.
 */
export function parse (markdown: string, features = new Features()) {
	let html = markdown;

	if (features.headings) {
		html = html.replace(/^# ([^\n]+)/gm, '<h1>$1</h1>');
		html = html.replace(/^## ([^\n]+)/gm, '<h2>$1</h2>');
		html = html.replace(/^### ([^\n]+)/gm, '<h3>$1</h3>');
	}

	if (features.horizontalRule) {
		html = html.replace(/^---$/gm, '<hr>');
	}

	if (features.links) {
		html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
	}

	return html;
};
