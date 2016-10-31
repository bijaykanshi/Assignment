
module.exports = function(ref) {
	var app = ref.app;
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);
	app.set('views', __dirname + '/client');
	app.use(ref.express.static(__dirname + '/client'));
	app.use(ref.bodyParser.json()); // support json encoded bodies
	app.use(ref.bodyParser.urlencoded({ extended: true }));

};
