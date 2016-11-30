function commonAPIHelper (ref) {
	var ObjectID = ref.mongo.ObjectID;
	this.buildNecData = function(req, res, fnArr) {
		fnArr.push(function(callback) {
			callback(null, ref.webTemp);
		});
		fnArr.push(function(callback) {
			var users = req.body.users || req.query.users;
			if (users == 'admin') {
				ref.mongoObj.twoArgQuery({}, {}, res, req.clientDb, 'formCollection', 'find', function(data) {
					callback(null, data);
				}, callback)
			}
		})
	}
	var obj = {};
	obj.insertMany = function(req, res, data, fnArr) {
		fnArr.push(function(callback) {
			ref.mongoObj.oneArgQuery(data, res, req.clientDb, 'formCollection', 'insertMany', function(data) {
				callback(null, data);
			}, callback);
		})
	}
	obj.save = function(req, res, data, fnArr) {
		data.forEach(function(val) {
			fnArr.push(function(callback) {
				ref.mongoObj.oneArgQuery(val, res, req.clientDb, 'formCollection', 'save', function(data) {
					callback(null, data);
				}, callback);
			})
		})
	}
	obj.remove = function(req, res, data, fnArr) {
		fnArr.push(function(callback) {
			ref.mongoObj.oneArgQuery({formName: {$in: data}}, res, req.clientDb, 'formCollection', 'remove', function(data) {
				callback(null, data);
			}, callback);
		})
	}
	this.buildFormArrFn = function(req, res, fnArr) {
		debugger;
		var data = req.body.data;
		for (var key in data) {
			obj[key](req, res, data[key], fnArr)
		}
	}
	this.getSaveChangeArr = function(req, res, fnArr, data, dbName) {
		
		if (data.remove) {
			fnArr.push(function (callback) {
				
				var innArr = data.remove._id.$in;
				for (var i = 0; i < innArr.length; i += 1)
					innArr[i] = new ObjectID(innArr[i]);
				ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + dbName, 100, res, function(err, clientDb) {
					clientDb.collection(req.body.collection).remove(data.remove, function(err, data) {
						if (err) {
							callback(err);
							return;
						}
						callback(null, 'Remove query success');
					});
				});
			});
			
		}
		if (data.update) {
			for (var key in data.update) {
				fnArr.push(function(callback) {
					var where = {_id: new ObjectID(key)};
					var updateWith = data.update[key];
					ref.mongoObj.getCachedClientConnectionDb(ref.envVar.dbHost + dbName, 100, res, function(err, clientDb) {
						clientDb.collection(req.body.collection).update(where, updateWith, {multi: true}, function(err, data) {
							if (err) {
								callback(err);
								return;
							}
							callback(null, 'update query success | key ' + key);
						});
					});
				})
			}
		}
	}
}
module.exports = commonAPIHelper;