function commonAPI (ref) {
	var me = this;
	this.renderIndex = function(req, res) {
		res.render('index');
	}
	var runParallelWithAsync = function (req, res, buildArr, cb) {
		var fnArr = [];
		me[buildArr](req, res, fnArr);
		ref.async.parallel(fnArr, function(err, results) {
			if (err) 
				res.status(500).send(err);
			else
				cb(results);
		});
	}
	this.getNecData = function(req, res) {
		runParallelWithAsync(req, res, 'buildNecData', function (results) {
			res.send({webJSON: results[0], formJSON: results[1]});
		})
	}
	/*this.getFormData = function(req, res) {
		ref.mongoObj.twoArgQuery({}, {}, res, req.clientDb, 'formCollection', 'find', function(data) {
			res.json(data);
		})
	}
*/
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
		debugger;
		runParallelWithAsync(req, res, 'buildFormArrFn', function (results) {
			res.send({webJSON: results[0], formJSON: results[1]});
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