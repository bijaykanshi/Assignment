function commonAPI (ref) {
	this.renderIndex = function(req, res) {
		res.render('index');
	}
	this.getJson = function(req, res) {
		console.log(" hi i am here");
		res.json(ref.sidebar);
	}
	this.submitWebTemp = function(req, res) {
		ref.fs.writeFile('./serverData/submitWebTemp.json', JSON.stringify(req.body), function(err, data) {
			if (err) {
				res.status(400).send(err);
				return;
			}
			res.send(ref.msg.webTemp);
		});
	}
}
module.exports = commonAPI;