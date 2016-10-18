
module.exports = function(ref) {
	var app = ref.app;
	var bodyParser = ref.bodyParser;
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);
	app.set('views', __dirname + '/client');
	app.use(ref.express.static(__dirname + '/client'));
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

};
