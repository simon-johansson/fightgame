
const path = require('path');
const http = require('http');

const express = require('express');
const socket = require('socket.io');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || '3000';
const app = express();

const server = http.createServer(app);
const io = socket(server);

app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.get('/', function(req, res, next) {
  res.render('index', {});
});

app.get('/input', function(req, res, next) {
  res.render('input', {});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

io.on('connection', function(socket) {

  socket.on('new user', function() {
    io.emit('player joined', {
      id: socket.id
    });
  });

  socket.on('disconnect', function() {
    io.emit('player disconnected', {
      id: socket.id
    });
  });

  socket.on('input', function(data) {
    data.timeStamp = Date.now();
    data.id = socket.id;
    io.emit('direction', data);
  });
});

server.listen(port, function(err) {
  if (err) console.log(err);
  if (isDeveloping) console.info('==> 🌎 Open up http://localhost:%s/ in your browser.', port);
});

module.exports = app;
