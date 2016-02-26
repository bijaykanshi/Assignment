
var ref = new function() {
    this.express =  require('express');
	this.app = this.express();
	this.port = process.env.PORT || 8084;
	this.dbconnection =  require('./route/dbConnection.js');
	this.router = this.express.Router();
	this.path = require('path');
	this.bodyParser = require('body-parser');
 	this.methodOverride = require('method-override');
 	this.mysql = require('mysql');k
	this.responseToClient = {error: {status: 'error'}, success: {status: 'success'}};
	this.startApp = function() {};
}

require('./config')(ref);
ref.route = require('./route/routing')(ref);
ref.dbconnection = require('./route/dbconnection')(ref);
ref.app.use('/', ref.route);
ref.app.listen(ref.port);
console.log('Your application is running on http://localhost:' + ref.port);