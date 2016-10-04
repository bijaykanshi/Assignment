function commonAPI (ref) {
	this.renderIndex = function(req, res) {
		res.render('index');
	}
	this.getJson = function(req, res) {
		console.log(" hi i am here");
		res.json(ref.sidebar);
	}
}
module.exports = commonAPI;