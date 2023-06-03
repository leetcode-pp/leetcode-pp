const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  mode: "production",
  entry: {
    'document-outliner': './src/index',
    'jquery-document-outliner': './src/adaptor/jquery'
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    publicPath: "bundle",
    filename: '[name].js',
    library: ['DocumentOutliner'],
    libraryExport: "default",
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new CheckerPlugin
  ]
};
