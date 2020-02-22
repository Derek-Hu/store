const MarkdownIt = require('markdown-it');
const jsonML = require('jsonml.js/lib/html');
const frontPlugin = require('markdown-it-front-matter');
// const MT = require('mark-twain');
// var mkd = require( "markdown" ).markdown;

const md = new MarkdownIt({
    html: true,
    breaks: false,
}).use(frontPlugin, function(fm) {
    // console.log(fm)
  });
const fs = require('fs');

const file = fs.readFileSync('/Users/hubenlv/workspaces/ant-design/components/button/demo/basic.md', 'UTF8');
const tokens = md.parse(file);

console.log(tokens);

// console.log(MT(file))

// console.log(mkd.parse(file))

// console.log(tokens);