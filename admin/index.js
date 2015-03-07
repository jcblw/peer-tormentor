'use strict'

var Connection = require('../src/connection'),
  config = require('../config.json'),
  connection = new Connection(config.room)

window.client = connection

connection.on('ready', function(){
  if (chrome.tabs) {
    chrome.tabs.query({}, function(Tabs){
      var tabs = []
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
})

connection.on('tabs', function(){
  console.log(arguments)
})

connection.on('newTab', function(){
  // add new tab
})

connection.on('removeTab', function(){

})

connection.on('closeTab', function(){

})

// chrome.tabs.query({}, function(Tabs){
//     console.log(Tabs)
//     for(var i = 0; i < Tabs.length; i += 1){
//       var Tab = Tabs[i];
//       tabs[Tab.id] = Tab;
//     }
// });

// chrome.tabs.onCreated.addListener(function(tab) {
//   tabs[tab.id] = tab;
//   // emit the new tab with the client id
//   socket.emit("new_tab", {tab : tab});
//   //removing timeout time its better tracked
//   //setTimeout(function(){chrome.tabs.remove(tab.id)}, (Math.random() * 240000) + 60000);
// });

// // remove tabs from tracking when a tab is removed
// chrome.tabs.onRemoved.addListener(function(tabid) {
//   delete tabs[tabid];
//   socket.emit("close_tab", {tabid : tabid})
// });

// chrome.tabs.onUpdated.addListener(function(tabid , change) {
//   if(change.url){
//     tabs[tabid].url = change.url;
//     socket.emit("url_change", {tabid : tabid, url : change.url})
//   }
// });
