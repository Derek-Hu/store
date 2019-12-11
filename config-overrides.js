const multipleEntry = require("react-app-rewire-multiple-entry")([
  {
    entry: 'src/entry/bindex.tsx',
    template: 'public/cappindex.html',
    outPath: '/react/capp/index.html'
  }
]);

module.exports = {
  webpack: function(config) {
    multipleEntry.addMultiEntry(config);
    return config;
  }
};
