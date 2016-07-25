var requestObj = new function() {

	this.sendRequest = function(ref, url, data, method, sucessFn) {
		var request = ref.request;
		console.log('.......url....' + JSON.stringify(data));
		JSON.stringify(data)
	    var options = {
	        method: method,
	        url: url,
	        rejectUnauthorized: false,
	        headers: {
	            'Content-Type': 'application/json',
	            'Accept': 'application/json',
	            'Accept-Language': 'en-us'
	        },
	        body: JSON.stringify(data)
	    };

	    function callback(error, response, body) {
	    	console.log('.......err........................................................................................' + error);
	        //console.log('.......err....' + error);
	        /*if (data.email)
	        	fileRef.fs.writeFileSync('./tempFile/response', JSON.stringify(response));*/
	        
	        if (!error && response.statusCode == 200) {
	        	if (sucessFn) {
	        		console.log('...sucessfully sent request to other server..' + JSON.stringify(body));
	        		sucessFn(body);
	        	}
	        }
	    }
	    request(options, callback);
	    /*var agent = new http.Agent({
		  keepAlive: true,
		  keepAliveMsecs: 10000
		});
	    var options = {
	        method: method,
	        host: 'localhost',
	        path: url,
	        port: 5059,
	        agent: agent,
	        headers: {
	            'Content-Type': 'application/json',
	            'Accept': 'application/json',
	            'Accept-Language': 'en-us',
	            //'Content-Length': Buffer.byteLength(JSON.stringify(data))
	        }
	    };
	    fileRef.fs.writeFileSync('./tempFile/options', JSON.stringify(options));
	    var req = http.request(options, function(res) {
			var responseString = '';
			res.on('data', function(data){
				responseString += data;
			});
			res.on('end', function(){
				var responseObject;
				try{
					responseObject = JSON.parse(responseString);	
				}
				catch(e){
					console.log(e);
				}
				fileRef.fs.writeFileSync('./tempFile/response', responseString);
				return sucessFn(responseObject);
			});
		});

		if(options.method != 'GET')
			req.write(JSON.stringify(data));
		
		req.end();
		// handle request error
		req.on('error', function(e) {
			//result.error = e;
			console.log('error > ', e);
			//logger.log(e);
			fileRef.fs.writeFileSync('./tempFile/response', e);
			//return sucessFn(e);
		});*/
	}
}


module.exports = requestObj;