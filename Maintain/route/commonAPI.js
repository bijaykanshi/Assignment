function commonAPI (ref) {
	this.renderIndex = function(req, res) {
		res.render('index');
	}
	this.getJson = function(req, res) {
		console.log(" hi i am here");
		res.json({webTemp: ref.webTemp, form: ref.form});
	}
	this.saveJSON = function(req, res) {
		var name = req.body.name || 'webTemp';
		var path = './serverData/' + name + '.json';
		ref.fs.writeFile(path, JSON.stringify(req.body.data), function(err, data) {
			if (err) {
				res.status(400).send(err);
				return;
			}
			res.send(ref.msg.webTemp);
			//@improve need to save on mongo
			ref[name] = req.body.data;
		});
	}
}
module.exports = commonAPI;