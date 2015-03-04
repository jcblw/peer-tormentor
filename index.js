'use strict'

var Connection = require('./src/connection'),
  connection = new Connection('AA:connection')

window.client = connection

connection.on('newTab', function(){
  // add new tab
})

connection.on('removeTab', function(){

})

connection.on('closeTab', function(){

})
