function commonAPI (ref) {
	
	this.renderIndex = function(req, res) {
		res.render('index');
	}
	this.getJson = function(req, res) {
		console.log(" hi i am here");
		res.json({webTemp: ref.webTemp, form: ref.form});
	}
	this.saveChange = function(req, res) {
		debugger;
		var data = req.body.data;
		var dbName = req.body.dbName || 'mydb';
		if (data.remove) {
			var ObjectID = ref.mongo.ObjectID;
			var innArr = data.remove._id.$in;
			for (var i = 0; i < innArr.length; i += 1)
				innArr[i] = new ObjectID(innArr[i]);
			ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + dbName, 100, res, function(err, clientDb) {
				clientDb.collection(req.body.collection).remove(data.remove, function(err, data) {
					if (err) {
						res.status(500).send(err);
						return;
					}
					res.json('success');
				});
			});
		}
		if (data.update) {
			var innArr = data.remove._id.$in;
			for (var key in data.update) {
				(function (key) {
					var where = {_id: key};
					var updateWith = data.update[key];
					ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + dbName, 100, res, function(err, clientDb) {
						clientDb.collection(req.body.collection).update(where, updateWith, {multi: true}, function(err, data) {
							if (err) {
								res.status(500).send(err);
								return;
							}
							console.log("updated successfully");
						});
					});
				})(key)
			}
			
		}
		
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
	this.register = function (req, res) {
		var dbName = req.body.dbName || 'mydb';
		ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + dbName, 100, res, function(err, clientDb) {
			if (err)
				res.status(500).send(err);
			clientDb.collection('users').insert(req.body.data, function(err, data) {
				if (err)
					res.status(500).send(err);
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