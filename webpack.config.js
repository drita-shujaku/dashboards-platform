const path = require('path')
const DIST_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src')
const BUILD_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: BUILD_ENV,
  context: APP_DIR,
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/'
  },
  devServer: {
    contentBase: DIST_DIR,
    //inline: true,
    compress: true,
    //port: 8000,
    hot: true,
    stats: { colors: true },
    historyApiFallback: true
  },
  // devtool: 'inline-source-map',
  resolve: {
/*    modules: [
        APP_DIR
    ],*/
    modules: [APP_DIR, 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: APP_DIR,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader'}
        ]
      }
    ]
  }
}