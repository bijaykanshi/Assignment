
function Ref() {
    this.express =  require('express');
    this.async = require('async');
	this.app = this.express();
	var cache = require('lru-node-cache');
	this.lncObj = new cache.LRU(100); 
	this.port = process.env.PORT || 8084;
	this.bodyParser = require('body-parser');
	this.fs = require('fs');
	//this.dbconnection =  require('./route/dbConnection.js');
	this.router = this.express.Router();
	this.routeJson = require('./serverData/routing.json');
	this.commonAPIFn = require('./route/commonAPI.js');
	this.mongo = require('mongodb');
	this.MongoConfFn = require('./route/db/mongo.js');
	this.mongoObj = new this.MongoConfFn(this);
	var commonAPIHelper = require('./route/helper/commonAPIHelper.js');
	var envOpt = require('./serverData/env.json');
	this.envVar = envOpt[process.env.NODE_ENV || 'local'];
	this.commonAPIFn.prototype = new commonAPIHelper(this);
	this.commonAPI = new this.commonAPIFn(this);
	
	
	//this.webTemp = require('./serverData/webTemp.json');
	this.form = require('./serverData/formJSON.json');
	this.msg = require('./serverData/msg.json');
}
var ref = new Ref();
require('./config')(ref);
ref.route = require('./route/routing')(ref);
ref.app.use('/', ref.route);
ref.app.listen(ref.port);
console.log('Your application is running on http://localhost:' + ref.port);

//ref.mongoObj.insertInitialData();
//ref.dbconnection = require('./route/dbconnection')(ref);
/*var cache = require('lru-node-cache');
var lncObj = new cache.LRU(4);  
for (var i = 0; i < 100000; i += 1) {
	console.log( " i == > " + i);
	lncObj.set(i, i);
}
setTimeout(function() {
	for (var i = 0; i < 1000000; i += 1) {
	console.log( " i == > " + i);
	lncObj.set(i, i);
}
}, 20000);
setTimeout(function() {
	if (global.gc) {
		console.log("running garbage collector");
	    global.gc();
	} else {
	    console.log('Garbage collection unavailable.  Pass --expose-gc '
	      + 'when launching node to enabl10forced garbage collection.');
	}
}, 60000)
setInterval(function() {
	console.log (" memory ==> " + JSON.stringify(process.memoryUsage()));
}, 10000);*/