var expect = require('chai').expect;
var io = require('socket.io-client');
var server = require('../app');

var socketURL = 'http://localhost:3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe("Game events", function() {
  var client;
  var disconnectUser = function (done) {
    client.disconnect();
    client = null;
    done();
  };

  beforeEach(function () {
    client = io.connect(socketURL, options);
    client.on('connect', function () {});
  });

  it('Should broadcast new user once they connect', function(done) {
    client.emit('new user');

    client.on('new user', function(msg) {
      expect(msg).to.equal('new user has joined.');

      disconnectUser(done);
    });
  });

  it('Should broadcast keybaord inputs', function(done){
    client.emit('input', {data: 'UP'});

    client.on('direction', function(payload) {
      expect(payload.data).to.equal('UP');
      expect(payload.timeStamp).to.be.a("number");

      disconnectUser(done);
    });
  });
});
