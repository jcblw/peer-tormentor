'use strict'

const Connection = require('../src/connection')
const config = require('../config.json')
const connection = new Connection(config.room, {
  admin: true
})
const UI = require('./ui')
const ui = new UI({});

window.client = connection

connection.on('ready', function(){
  setTimeout(function(){
    connection.broadcast({ // get exsisting tabs
      name: 'getTabs',
      value: null
    })
  },5000);
})

connection.on('tabs',ui.update.bind(ui))
