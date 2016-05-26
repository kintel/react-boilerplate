var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api/*': {
      target: 'http://localhost:7070',
      secure: false,
    },
  }}).listen(3030, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3030/');
});
