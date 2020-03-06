module.exports = [
  {
    // 入口JS 文件
    entry: 'src/preview.js',
    // 生成的访问路径
    outPath: '/preview.html',
    //
    template: 'public/preview.html',
  }, {
    // 入口JS 文件
    entry: 'src/store.js',
    // 生成的访问路径
    outPath: '/store.html',
  },
];
