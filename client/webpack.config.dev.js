var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3030',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    // Allowed implicit extensions for require/import
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false, // Done by html-webpack-template
      template: 'node_modules/html-webpack-template/index.ejs',
      title: 'BoilerPlate',
      appMountId: 'content',
      favicon: 'images/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?' + JSON.stringify({
          presets: ['react', 'es2015', 'stage-3'],
          plugins: ['transform-object-rest-spread', 'transform-runtime']
        })]
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?' + JSON.stringify({
          presets: ['es2015', 'stage-3'],
          plugins: ['transform-object-rest-spread', 'transform-runtime']
        })]
      },

      // General purpose CSS loader, needed by e.g. react-bootstrap-table
      { test: /\.css$/, loader: 'style!css' },
      // General purpose LESS loader, needed by e.g. bootstrap and our own less stylesheets
      { test: /\.less$/, loader: 'style!css!less' },

      // The following 5 loaders are needed by bootstrap
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },

      // The following loaders are needed by auth0-lock
      { test: /node_modules\/auth0-lock\/.*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      },
      { test: /node_modules\/auth0-lock\/.*\.ejs$/, loader: 'transform-loader/cacheable?ejsify' },
      { test: /\.json$/, loader: 'json-loader' },

      // Needed by our label module
      { test: /\.label$/, loader: 'raw' }
    ]
  }
};
