function commonAPI (ref) {
	var me = this;
	this.renderIndex = function(req, res) {
		res.render('index');
	}
	this.saveLink = function (req, res) {
		var body = req.body;
		ref.mongoObj.mongoQuery([{}, body.updateWith], res, req.clientDb, 'website', 'update', function(data) {
			res.send("successfully updated");
		})
	}
	var runAsyncFun = function (req, res, buildArr, methodName, cb) {
		var fnArr = [];
		me[buildArr](req, res, fnArr);
		ref.async[methodName](fnArr, function(err, results) {
			if (err) 
				res.status(500).send(err);
			else
				cb(results);
		});
	}
	this.login = function(req, res) {
		var clientData = req.body.data;
		ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + 'myCentralDb', 100, res, function(err, centralDb) {
			ref.mongoObj.mongoQuery([clientData], res, centralDb, 'users', 'findOne', function(data) {
				if (!data)
					return res.status(500).send("users not found");
				ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + data.db, 100, res, function(err, clientDb) {
					req.clientDb = clientDb;
					req.usersInfo = {ucat: data.ucat};
					runAsyncFun(req, res, 'loginArr', 'parallel', function (results) {
						res.send({webJSON: results[0][0], formJSON: results[1], usersJSON: results[2], usersInfo: {ucat: data.ucat, email: data.email, db: data.db}});
					});
				})
			});
		})
	}
	this.getNecData = function(req, res) {
		runAsyncFun(req, res, 'buildNecData', 'parallel', function (results) {
			res.send({webJSON: results[0], formJSON: results[1]});
		});
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
	this.insertData = function (req, res) {
		debugger;
		var body = req.body;
		ref.mongoObj.mongoQuery([body.data], res, req.clientDb, body.collName, 'insert', function(data) {
			res.send("successfully inserted");
		})
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
		debugger;
		runAsyncFun(req, res, 'buildFormArrFn', 'parallel', function (results) {
			res.send({webJSON: results[0], formJSON: results[1]});
		})
	}
	this.test = function (req, res) {
		console.log("reached there with data :--- " + JSON.stringify(req.body));
		res.send("successfully");
	}
}
module.exports = commonAPI;