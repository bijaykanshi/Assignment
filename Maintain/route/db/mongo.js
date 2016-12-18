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
    	var conn = ref.lncObj.get(catcheKey);
    	if (conn) {
    		console.log("Client db found on catch | catcheKey => " + catcheKey);
	    	callback(null, conn);
	    } else {
	    	me.connectClientDB(url, res, catcheKey, callback);
	    }

    }
    this.connectClientDB = function connectClientDB(url, res, catcheKey, callback) {
    	console.log("url ==> " + url);
	    MongoClient.connect(url, options , function(err ,  openedDb) {
	        if (err) {
	            console.log(colors.red('[DB] Error : opening ' + catcheKey + ' Err: ' + err));
	            res.status(500).send(err);
	            return;
	        }
	        ref.lncObj.set(catcheKey, openedDb);
	        callback(false, openedDb);
	    });
	}
	this.insertInitialData = function () {
		me.getCachedClientConnectionDb(ref.envVar.dbHost + 'mydb', 100, {}, function(err, clientDb) {
			me.mongoQuery([ref.webTemp], {}, clientDb, 'website', 'insert')
		})
	}
}
module.exports = MongoConf;