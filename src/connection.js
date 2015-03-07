'use strict'

var EventEmitter = require('eventemitter2').EventEmitter2,
    xhr = require('xhr'),
    qs = require('querystring'),
    config = require('../config.json'),
    uuid = require('uuid');


function Connection(channel) {
  var self = this;
// This object will take in an array of XirSys STUN / TURN servers
// and override the original peerConnectionConfig object

  this.getConfig(function(err, data, body){
    var response = JSON.parse(body);
     var SimpleWebRTC = require('simplewebrtc')
        self.webrtc = new SimpleWebRTC({
          // we don't do video
          localVideoEl: '',
          remoteVideosEl: '',
          // debug: true,
          // dont ask for camera access
          autoRequestMedia: false,
          // dont negotiate media
          receiveMedia: {
            mandatory: {
              OfferToReceiveAudio: false,
              OfferToReceiveVideo: false
            }
          },
          peerConnectionConfig: response.d
        });

        self.clients = []
        self.admins = []
        self.admin = true

        self.webrtc.joinRoom(channel)
        self.webrtc.on('mute', self.onMessage.bind(self))
        self.webrtc.on('connectionReady', self.onReady.bind(self))
  });


}



Connection.prototype = Object.create(EventEmitter.prototype)

Connection.prototype.getConfig = function (callback) {
  var peerConnectionConfig;

    xhr({
        method: "POST",
        uri: 'https://api.xirsys.com/getIceServers',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
            ident: config.ident,
            secret: config.secret,
            domain: config.domain,
            application: "default",
            room: 'default',
            secure: 0
        })
    }, callback);
}

Connection.prototype.onReady = function() {

  var id = localStorage.getItem('clientId')

  if (!id) {
    id = uuid.v4()
    localStorage.setItem('clientId', id)
  }

  this.id = id

  var broadcast = this.broadcast.bind(this),
    admin = this.admin,
    emit = this.emit.bind(this)
  setTimeout(function() {
    broadcast({
      _connection: true,
      isAdmin: admin
    })
    emit('ready')
  }, 1000)
}

Connection.prototype.broadcast = function(payload) {
  payload.clientId = this.id
  this.webrtc.sendToAll('mute', {
    name: JSON.stringify(payload),
  })
}

Connection.prototype.onMessage = function(e) {
  var payload;
  try {
    payload = JSON.parse(e.name)
  } catch (err) {
    payload = null
  }

  if (payload.name && payload.value) {
    this.emit(payload.name, payload.value, payload.clientId)
  }
}

module.exports = Connection;
