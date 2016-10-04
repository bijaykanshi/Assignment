
function Ref() {
    this.express =  require('express');
	this.app = this.express();
	this.port = process.env.PORT || 8084;
	//this.dbconnection =  require('./route/dbConnection.js');
	this.router = this.express.Router();
	this.routeJson = require('./serverData/routing.json');
	this.commonAPIFn = require('./route/commonAPI.js');
	this.commonAPI = new this.commonAPIFn(this);
	this.sidebar = require('./serverData/sidebar.json');
}
var ref = new Ref();
require('./config')(ref);
ref.route = require('./route/routing')(ref);
//ref.dbconnection = require('./route/dbconnection')(ref);
ref.app.use('/', ref.route);
ref.app.listen(ref.port);
console.log('Your application is running on http://localhost:' + ref.port);