
var ref = new function() {
    this.express =  require('express');
	this.app = this.express();
	this.port = process.env.PORT || 8084;
	this.dbconnection =  require('./route/dbConnection.js');
	this.request = require('request');
	this.backEndRequest =  require('./route/backEndRequest.js');
	this.router = this.express.Router();
	this.path = require('path');
	this.bodyParser = require('body-parser');
 	this.methodOverride = require('method-override');
	this.responseToClient = {error: {status: 'error'}, success: {status: 'success'}};
	this.mongodb = require('mongodb');
}

require('./config')(ref);
//debugger;
ref.route = require('./route/routing')(ref);
ref.dbconnection = require('./route/dbConnection.js')(ref);
ref.app.use('/', ref.route);
ref.app.listen(ref.port);
console.log('Your application is running on http://localhost:' + ref.port);