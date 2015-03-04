'use strict'

var Connection = require('../src/connection'),
  config = require('../config.json'),
  connection = new Connection(config.room, {
    admin: false
  }),
  tabs = {}

window.client = connection

function getTabs() {
  if (chrome.tabs) {
    tabs = {}
    chrome.tabs.query({}, function(Tabs){
      for(var i = 0; i < Tabs.length; i += 1){
        var Tab = Tabs[i]
        tabs[Tab.id] = Tab
      }
      connection.broadcast({
        name: 'tabs',
        client: true,
        value: tabs
      })
    })
  }
}

function closeTab(id){
  if(!id){
    var arr = []
     // loop through tab objects
    for(var key in tabs){
      var tabid = tabs[key].id
      arr.push(tabid)
    }
    chrome.tabs.remove(arr)
  }else{
    // close only specific tab
    chrome.tabs.remove(+id)
  }
  getTabs()
}


connection.on('ready', getTabs)
connection.on('getTabs', getTabs)
connection.on('closeTab', closeTab)
chrome.tabs.onRemoved.addListener(getTabs)
chrome.tabs.onUpdated.addListener(getTabs)
