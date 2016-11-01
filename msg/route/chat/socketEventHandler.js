function socketEventHandler (ref) {
	var chatRouter = ref.chatRouter;
	var conn = ref.io.sockets.connected;
	this.disconnect = function () {
		console.log("disconnect");
		if (chatRouter) {
			delete chatRouter.clientIdToSocketId[chatRouter.socketIdToClientId[this.id]];
			delete chatRouter.socketIdToClientId[this.id];
		}
	}
	this.msg = function (data) {
		
	}
	this.userAuth = function (data) {
		var dataToSend = {};
		var email = data.authData.email;
		var i = 0;
		for (; i < ref.userData.length; i += 1) {
			if (ref.userData[i].email == email) {
				dataToSend.myInfo = ref.userData[i];
				dataToSend.userData = ref.userData;
				break;
			}
		}
		var eventToCall = 'authFail';
		if (i < ref.userData.length) {
			chatRouter.clientIdToSocketId[ref.userData[i].userId] = this.id;
			chatRouter.socketIdToClientId[this.id] = ref.userData[i].userId;
			eventToCall = 'authSuccess';
		}
		this.emit(eventToCall, dataToSend);
	}	
}
module.exports = socketEventHandler;