
module.exports = function(ref) {
	var app = ref.app;
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);
	app.set('views', __dirname + '/client');
	app.use(ref.bodyParser.urlencoded({ extended: true}));
	app.use(ref.bodyParser.json({limit: '10mb'}));
	app.use(ref.methodOverride('X-HTTP-Method'));          // Microsoft
	app.use(ref.methodOverride('X-HTTP-Method-Override')); // Google/GData
	app.use(ref.methodOverride('X-Method-Override')); 
	app.use(ref.express.static(__dirname + '/client'));

};
