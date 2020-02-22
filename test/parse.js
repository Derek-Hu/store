const {TypescriptParser} = require('typescript-parser');

const parser = new TypescriptParser();
 
(async () => {
    const parsed = await parser.parseFile('/Users/hubenlv/workspaces/site-pages/node_modules/antd/es/button/style/index.d.ts', '.');
    console.log(parsed.imports);

})()
// either:
// or a filepath