function chatRouter (ref) {
	var me = this;
	this.socketIdToClientId = {};
	this.clientIdToSocketId = {};
	this.defaultFn = {};
	ref.io.sockets.on('connection', function (socket) {
		//me.connected = ref.io.sockets.connected;
	    console.log('client connect');
	    ref.socketEventJSON.forEach(function(obj) {
	        var splitStr = obj.callbackFun.split('_');
	        var methodCall = splitStr[1] ? ref[splitStr[0]][splitStr[1]] : defaultFn[splitStr[0]];
	        socket.on(obj.event, methodCall); 
	    });
	});
}
module.exports = chatRouter;