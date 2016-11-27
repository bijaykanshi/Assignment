
module.exports = function(ref) {
	var app = ref.app;
	var bodyParser = ref.bodyParser;
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);
	app.set('views', __dirname + '/client');
	app.use(ref.express.static(__dirname + '/client'));
	app.use(bodyParser.json({limit: '50mb'}));
	var commanFun = function (req, res, next) {
		var isRequire = req.body.clientDbConReq || req.query.clientDbConReq;
		if (isRequire) {
			var dbName = req.body.dbName || 'mydb';
			ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + dbName, 100, res, function(err, clientDb) {
				req.clientDb = clientDb;
				next();
			})
		} else 
			next();
	}
	app.use(commanFun)
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

};
