const webpack = require('webpack');
const path = require('path');
const git = require('git-rev-sync');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const entries = require('./config-entry');
const multipleEntry = require('react-app-rewire-multiple-entry')(entries);

const {
  override,
  removeModuleScopePlugin,
  useEslintRc,
  addBundleVisualizer,
  addWebpackAlias,
  addDecoratorsLegacy,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra');

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    fixBabelImports('antd', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    useEslintRc(),
    addWebpackAlias({
      '~': path.resolve(__dirname, 'src/'),
      src: path.resolve(__dirname, 'src/'),
      root: path.resolve(__dirname, 'src/'),
      'rc-form-dynamic': path.resolve(__dirname, 'src/rc-form-dynamic/'),
    }),
    // addBundleVisualizer(),
    multipleEntry.addMultiEntry,
    removeModuleScopePlugin(),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        // Primary
        '@primary-color': '#2acd8f',
        '@link-color': '#2acd8f',
        '@border-radius-base': '2px',

        // Input
        '@input-placeholder-color': '#a3afb7',
        '@input-hover-border-color': '#2acd8f',

        // Button
        '@button-primary-bg': '#2acd8f',
        // Button lg
        '@btn-height-lg': '48px',
        '@btn-padding-lg': '11px',
        'btn-font-size-lg': '20px',

        // Table
        '@table-header-bg': '#ffffff',

        // Font
        '@font-size-base': '14px',
      },
    }),
    config => {
      const isProduction = process.env.NODE_ENV === 'production';

      if (!isProduction) {
        const CircularDependencyPlugin = require('circular-dependency-plugin');
        config.plugins.push(
          new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
          })
        );
      }
      if(!config.optimization.splitChunks.cacheGroups){
        config.optimization.splitChunks.cacheGroups = {
        };
      }      

      // 增加cache-loader, thread-loader优化
      // 其中cache-loader与meta.macro冲突，导致代码不能正确生成。由于代码已经在开发环境中生成，因此生产环境开启cache-loader
      if(isProduction){
        for (let _rule of config.module.rules) {
          if (_rule.oneOf) {
            for(certainRule of _rule.oneOf){
              if((typeof certainRule.loader === 'string') && certainRule.loader.indexOf('babel-loader')!==-1){
                certainRule.loader = ['cache-loader', 'thread-loader', {
                  loader: certainRule.loader,
                  options: certainRule.options
                }];
                delete certainRule.options;
              }
            }
            break;
          }
        }

        config.plugins.push(
          new FilterWarningsPlugin({ 
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/ 
          })
        );
      }

      config.optimization.splitChunks.cacheGroups.vendors = {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }

      config.plugins.push(
        // Or: To strip all locales except “en”, “es-us” and “ru”
        // (“en” is built into Moment and can’t be removed)
        new MomentLocalesPlugin({
            localesToKeep: ['en', 'zh-cn'],
        }),
        new webpack.DefinePlugin({
          'process.env.GIT_COMMIT': JSON.stringify(git.long()),
        }),
      );
      return config;
    }
  )
};
