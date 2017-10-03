const path = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'cheap-module-eval-source-map',  
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{
      test: /\.js/,
      loaders: ['babel-loader'],
    }]
  },
}