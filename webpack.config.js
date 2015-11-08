const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    application: './javascripts/renderer/application.js'
  },
  output: {
    path: __dirname,
    filename: 'application.js',
    publicPath: 'http://localhost:8080/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      images: (path.resolve(__dirname) + '/images')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader?indentedSyntax=true')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(png|ttf)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.svg$/,
        loader: 'raw'
      }
    ],
    noParse: [
      /node_modules\/sinon/,
    ]
  },
  plugins: [
    new ExtractTextPlugin('application.css')
  ]
}
