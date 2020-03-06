const fs = require('fs')
const path = require('path')

module.exports = (name) => JSON.stringify(fs.readFileSync(require.resolve(path.resolve(__dirname, '../..', name)), 'utf8'));