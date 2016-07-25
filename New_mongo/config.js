
module.exports = function(ref) {
	var app = ref.app;
	app.use(ref.bodyParser.urlencoded({ extended: true}));
	app.use(ref.bodyParser.json({limit: '10mb'}));
	app.use(ref.methodOverride('X-HTTP-Method'));          // Microsoft
	app.use(ref.methodOverride('X-HTTP-Method-Override')); // Google/GData
	app.use(ref.methodOverride('X-Method-Override')); 
	app.use(function(req,res,next){
	    var _send = res.send;
	    var sent = false;
	    res.send = function(data){
	        if(sent) return;
	        _send.bind(res)(data);
	        sent = true;
	    };
	    next();
	});
};
