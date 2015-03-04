'use strict'

var EventEmitter = require('eventemitter2').EventEmitter2

function Connection(channel) {

  var SimpleWebRTC = require('simplewebrtc')
  this.webrtc = new SimpleWebRTC({
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
    }
  })

  this.clients = []
  this.admins = []
  this.admin = true

  this.webrtc.joinRoom(channel)
  this.webrtc.on('mute', this.onMessage.bind(this))
  this.webrtc.on('connectionReady', this.onReady.bind(this))
}

Connection.prototype = Object.create(EventEmitter.prototype)

Connection.prototype.onReady = function() {
  var broadcast = this.broadcast.bind(this),
    admin = this.admin
  setTimeout(function(){
    broadcast({
      _connection: true,
      isAdmin: admin
    })
  },1000)
}

Connection.prototype.broadcast = function(payload) {
  if (this.admin) {
    this.webrtc.sendToAll('mute', {
      name: JSON.stringify(payload)
    })
  }
}

Connection.prototype.onMessage = function(e) {
  var payload;
  try {
    payload = JSON.parse(e.name)
  } catch (err) {
    payload = null
  }

  if (payload.name && payload.value) {
    this.emit(name, value)
  }
}

module.exports = Connection;
