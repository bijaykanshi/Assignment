
app.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);

app.factory('chatBox', ['$rootScope', function($rootScope, socket) {
    var chatBox = {};
    chatBox.elementsId = [];
    chatBox.visibleEl = [];
    chatBox.msgObj = {
      "1_2": [
        {
           writtenById: 1,
           msg: ['his set up our express application and is now serving a HTML file on the root route. Now we will require socket.IO and will log "A user connected", everytime a user goes to this page and', 'll log "A user connected", everytime a user goes to this page an']
        },
        {
           msg: ['If you refresh your browser, it\'ll disconnect the socket connection and recreate. You can see this on your console logs:', 'll log "A user connected", everytime a user goes to this page an']
        }
      ]
    };
    chatBox.addMsg = function(currentMsg, whereToInsert) {
      console.log("bijay kanshi");
      var msg = currentMsg[whereToInsert];
      if (!chatBox.msgObj[whereToInsert])
        chatBox.msgObj[whereToInsert] = [];
      var msgArrRef = chatBox.msgObj[whereToInsert];
      var lastObj = msgArrRef[msgArrRef.length - 1];
      if (lastObj && lastObj.writtenById == chatBox.myInfo.userId) {
        lastObj.msg.push(msg);
      } else
        msgArrRef.push({writtenById: chatBox.myInfo.userId, msg: [msg]});
      socket.emit('msg', {writtenById: chatBox.myInfo.userId, msg: msg});
      currentMsg[whereToInsert] = '';
    }
    return chatBox;
}]);