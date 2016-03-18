
var path = require('path');
var http = require('http');

var express = require('express');
var socket = require('socket.io');

var port = process.env.PORT || '3000';
var app = express();

var server = http.createServer(app);

app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', {});
});

app.get('/input', function(req, res, next) {
  res.render('input', {});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

var io = socket(server);

io.on('connection', function (socket) {

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

  socket.on('input', function (data) {
    data.timeStamp = Date.now();
    data.id = socket.id;
    io.emit('direction', data);
  });

});

server.listen(port);
