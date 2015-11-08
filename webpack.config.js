const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const plugins = [
  new ExtractTextPlugin('public/stylesheets/application.css')
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  entry: {
    application: './javascripts/renderer/application.js'
  },
  output: {
    path: __dirname,
    filename: 'public/javascripts/application.js',
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
        test: /\.(ttf)$/,
        loader: 'url-loader?limit=100000&name=./public/fonts/[hash].[ext]'
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
  plugins: plugins
}
