
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

app.factory('chatBox', ['$rootScope', 'socket', '$compile', '$templateRequest', '$timeout', function($rootScope, socket, $compile, $templateRequest, $timeout) {
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
           writtenById: 2,
           msg: ['If you refresh your browser, it\'ll disconnect the socket connection and recreate. You can see this on your console logs:', 'll log "A user connected", everytime a user goes to this page an']
        }
      ]
    };
    chatBox.scrollTop = function(whereToInsert) {
      var element = $('#' + whereToInsert + 'divToScroll');
      element[0].scrollTop += 500;
      //element.scrollTop(element[0].scrollHeight - 100);
    }
    var pushMsg = function (whereToInsert, msg, writtenById) {
        chatBox.scrollTop(whereToInsert);
        if (!chatBox.msgObj[whereToInsert])
          chatBox.msgObj[whereToInsert] = [];
        var msgArrRef = chatBox.msgObj[whereToInsert];
        var lastObj = msgArrRef[msgArrRef.length - 1];
        if (lastObj && lastObj.writtenById == writtenById) {
          lastObj.msg.push(msg);
        } else
          msgArrRef.push({writtenById: writtenById, msg: [msg]});
    }
    chatBox.addMsg = function(currentMsg, whereToInsert, emitEvent) {
      console.log("bijay kanshi");
      var msg = currentMsg[whereToInsert];
      $timeout(function () {
        pushMsg(whereToInsert, msg, chatBox.myInfo.userId);
      }, 0);
      
      var idArr = whereToInsert.split('_');
      var to = idArr[0] == chatBox.myInfo.userId ? idArr[1] : idArr[0]; 
      socket.emit('msg', {writtenById: chatBox.myInfo.userId, combId: whereToInsert, to: to, msg: msg});
      currentMsg[whereToInsert] = '';
    }
    socket.on('recieve', function(data) {
      $timeout(function () {
        pushMsg(data.combId, data.msg, data.writtenById);
      }, 0);
        
        if (chatBox.visibleEl.indexOf(data.combId) != -1)
          return;
        angular.element('#' + data.writtenById).triggerHandler('click');
        
    });
    return chatBox;
}]);
