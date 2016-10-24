
function Ref() {
    this.express =  require('express');
	this.app = this.express();
	this.port = process.env.PORT || 8084;
	this.bodyParser = require('body-parser');
	this.fs = require('fs');
	//this.dbconnection =  require('./route/dbConnection.js');
	this.router = this.express.Router();
	this.routeJson = require('./serverData/routing.json');
	this.commonAPIFn = require('./route/commonAPI.js');
	var envOpt = require('./serverData/env.json');
	this.envVar = envOpt[process.env.NODE_ENV || 'local'];
	this.commonAPI = new this.commonAPIFn(this);
	this.mongo = require('mongodb');
	this.MongoConfFn = require('./route/db/mongo.js');
	this.mongoObj = new this.MongoConfFn(this);
	this.webTemp = require('./serverData/webTemp.json');
	this.form = require('./serverData/formJSON.json');
	this.msg = require('./serverData/msg.json');
}
var ref = new Ref();
require('./config')(ref);
ref.route = require('./route/routing')(ref);
//ref.dbconnection = require('./route/dbconnection')(ref);
ref.app.use('/', ref.route);
ref.app.listen(ref.port);
console.log('Your application is running on http://localhost:' + ref.port);