const MarkdownIt = require('markdown-it');

const renderer = new MarkdownIt()
	.use(require('../index'));

console.log(renderer.render(`
\`\`\`
test
\`\`\`
`));
