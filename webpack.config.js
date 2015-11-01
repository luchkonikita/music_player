const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    application: './javascripts/application.js'
  },
  output: {
    path: __dirname,
    filename: 'application.js',
    publicPath: 'http://localhost:8080/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('application.css')
  ]
}
