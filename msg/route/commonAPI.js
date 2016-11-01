function commonAPI (ref) {
	this.renderIndex = function(req, res) {
		//ref.io.emmit('abc');
		res.render('index');
	}
	this.getJson = function(req, res) {
		console.log(" hi i am here");
		res.json({userData: ref.userData});
	}
	this.loginSignUp = function(req, res) {
		console.log(" hi i am here");
		var dataToSend = {};
		var email = req.body.email;
		for (var i = 0; i < ref.userData.length; i += 1) {
			if (ref.userData[i].email == email) {
				dataToSend.myInfo = ref.userData[i];
				dataToSend.userData = ref.userData;
				break;
			}
		}
		res.json(dataToSend);
	}

}
module.exports = commonAPI;