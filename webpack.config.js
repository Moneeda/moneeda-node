var path = require('path')
var webpack = require('webpack')
var libraryName = 'library';

module.exports = {
  entry: {
    'moneeda': path.resolve(__dirname, './src/index.js'),
    'moneeda.min': path.resolve(__dirname, './src/index.js')
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js",
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false
      }
    }),
  ],
  resolve: {
    extensions: ['*', '.js']
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        include: [
          path.join(__dirname, './src')
          // path.join(__dirname, './tests')
        ],
        exclude: /node_modules/
      }
    ]
  }
}
