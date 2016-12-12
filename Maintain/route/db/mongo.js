function MongoConf (ref) {
	var MongoClient = ref.mongo.MongoClient;
	var me = this;
	
	var options = {
        db: {
            native_parser: false,
            wtimeout: 5000
        },
        server: {
            auto_reconnect : true,
            poolSize : 5
        }
    };
    var clientDbCatche = {lengthOf: 0};
    this.mongoQuery = function (argArr, res, clientDb, collectionName, methodName, cb, callbackAsync) {
	    var collbackFn = function(err, data) {
	    	//argArr.pop();
	        var msg = err ? "Error found during " : "successfully completed  ";
	        msg += methodName + " operation of collection " + collectionName + " | firstArg = " + JSON.stringify(argArr[0]) + " | secondArg " + (typeof argArr[1] != "function" ? JSON.stringify(argArr[1]) : "");
	        console.log(msg);
	        if (err) 
	        	return (callbackAsync && callbackAsync(err)) || res.status(500).send(err);
	        if (cb) {
	        	if (methodName == 'find') {
	        		data.toArray(function(err, jsonData) {
						cb(jsonData);
					})
	        	} else
	           		cb(data);
	        }
	    }
	    argArr.push(collbackFn);
	    var collectionRef = clientDb.collection(collectionName);
	    collectionRef[methodName].apply(collectionRef, argArr);
	}
    this.getCachedClientConnectionDb = function (url, retries, res, callback) {
    	var catcheKey = url.replace(/([^a-zA-Z0-9]*)/g ,  '');
    	if (retries <= 0) {
    		me.connectClientDB(url, res, catcheKey, callback);
    		return;
    	}
    	if (clientDbCatche[catcheKey]) {
    		if (!clientDbCatche[catcheKey].wait) {
    			console.log("Client db found on catch | catcheKey => " + catcheKey);
    			clientDbCatche[catcheKey].ts = new Date().getTime();
	    		callback(null, clientDbCatche[catcheKey].conn);
    		} else  {
	    		setTimeout(function() {
			        console.log('cached Waiting for connection to be established ==>' + catcheKey + 'retries ' + retries);
			        me.getCachedClientConnectionDb(url, retries - 1, res, callback);
			    }, 50);
	    	}
	    } else {
	    	me.connectClientDB(url, res, catcheKey, callback);
	    }

    }
    this.connectClientDB = function connectClientDB(url, res, catcheKey, callback) {
	    clientDbCatche[catcheKey] = {"wait": true};
	    MongoClient.connect(url, options , function(err ,  opened_db) {
	        if (err) {
	            console.log(colors.red('[DB] Error : opening '+catcheKey + ' Err: '+ err));
	            delete clientDbCatche[catcheKey];
	            res.status(500).send(err);
	            return;
	        }
	        clientDbCatche[catcheKey] = {'ts': new Date().getTime(), 'conn': opened_db, 'wait': false};
	        clientDbCatche.lengthOf += 1;
	        callback(false, opened_db);
	        if (clientDbCatche.lengthOf > 100) 
	        	me.deleteObjKey(catcheKey);
	        
	    });
	}
	this.deleteObjKey = function (catcheKey) {
		var minTime = clientDbCatche[catcheKey].ts;
		var deleteKeys = catcheKey;
		for (key in clientDbCatche) {
			if (clientDbCatche[key].ts < minTime) {
				deleteKeys = key;
				minTime = clientDbCatche[key].ts;
			}
		}
		clientDbCatche[deleteKeys].conn.close();
		delete clientDbCatche[deleteKeys];
	}
	this.insertInitialData = function () {
		me.getCachedClientConnectionDb(ref.envVar.dbHost + 'mydb', 100, {}, function(err, clientDb) {
			me.mongoQuery([ref.webTemp], {}, clientDb, 'website', 'insert')
		})
	}
}
module.exports = MongoConf;