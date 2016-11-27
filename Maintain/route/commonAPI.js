function commonAPI (ref) {
	var me = this;
	this.renderIndex = function(req, res) {
		res.render('index');
	}
	this.getJson = function(req, res) {
		console.log(" hi i am here");
		res.json({webTemp: ref.webTemp, form: ref.form});
	}
	this.getFormData = function(req, res) {
		ref.mongoObj.twoArgQuery({}, {}, res, req.clientDb, 'formCollection', 'find', function(data) {
			res.json(data);
		})
	}

	this.saveChange = function(req, res) {
		var data = req.body.data;
		var dbName = req.body.dbName || 'mydb';
		var fnArr = [];
		me.getSaveChangeArr(req, res, fnArr, data, dbName);
		ref.async.parallel(fnArr,
		function(err, results){
			if (err) 
				res.status(500).send(err);
			else
				res.send("success in update")
		});
	}
	this.submitQuery = function(req, res) {
		var dbName = req.body.dbName || 'mydb';
		ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + dbName, 100, res, function(err, clientDb) {
			clientDb.collection(req.body.collection).find(req.body.row, req.body.col, function(err, data) {
				if (err) {
					res.status(500).send(err);
					return;
				}
				data.toArray(function(err, jsonData) {
					res.json(jsonData);
				})
			})
		})
	}
	this.saveFormJSON = function(req, res) {
		ref.mongoObj.oneArgQuery(req.body.data, res, req.clientDb, 'formCollection', 'insertMany', function(data) {
			res.send("successfully inserted");
		})
	}
	this.register = function (req, res) {
		var dbName = req.body.dbName || 'mydb';
		ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + dbName, 100, res, function(err, clientDb) {
			if (err)
				res.status(500).send(err);
			clientDb.collection('users').insert(req.body.data, function(err, data) {
				if (err) {
					res.status(500).send(err);
					return;
				}
				res.send("successfully inserted");
			})
			
		})
	}
	this.test = function (req, res) {
		console.log("reached there with data :--- " + JSON.stringify(req.body));
		res.send("successfully");
	}
}
module.exports = commonAPI;