function commonAPI (ref) {
	this.renderIndex = function(req, res) {
		res.render('index');
	}
	this.getJson = function(req, res) {
		console.log(" hi i am here");
		res.json(ref.sidebar);
	}
	this.submitQA = function(req, res) {
		ref.fs.writeFile('./serverData/sidebar.json', JSON.stringify(req.body), function(err, data) {
			if (err) {
				res.status(400).send(err);
				return;
			}
			ref.sidebar = req.body;
			res.send("your response has been added successfully");
		});
	}
}
module.exports = commonAPI;