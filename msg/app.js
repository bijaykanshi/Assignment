
function Ref() {
    this.express =  require('express');
	this.app = this.express();
	
	this.port = process.env.PORT || 8084;
	
	this.bodyParser = require('body-parser');
	this.fs = require('fs');
	//this.dbconnection =  require('./route/dbConnection.js');
	this.router = this.app;
	this.routeJson = require('./serverData/routing.json');
	
	this.commonAPIFn = require('./route/commonAPI.js');
	this.commonAPI = new this.commonAPIFn(this);
	this.userData = require('./serverData/userData.json');
	this.socketEventJSON = require('./serverData/socketEvent.json');
	this.io = require('socket.io').listen(this.app.listen(this.port));
	var chatRouterFn = require('./route/chat/chatRouter.js');
	this.chatRouter = new chatRouterFn(this);
	var socketEventHandlerFn = require('./route/chat/socketEventHandler.js');
	this.socketEventHandler = new socketEventHandlerFn(this);
	
}
var ref = new Ref();
require('./config')(ref);
ref.route = require('./route/routing')(ref);
//ref.dbconnection = require('./route/dbconnection')(ref);
//ref.app.use('/', ref.route);
console.log("application running on port " + ref.port);
