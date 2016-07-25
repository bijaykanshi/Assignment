
module.exports = function(ref) {
    var query = '';
    var routingData = [
        {
            'url': '/rty',
            'method': 'get',
            'callbackFun':  function(req, res) {
                console.log(' i am here...');
                ref.dbconnection.applyQueryIntoDataBase(query, 'firstQueryToMongo', res);
            }
        },
        {
            'url': '/insertPostData',
            'method': 'post',
            'callbackFun':  function(req, res) {
                console.log(' i am here...');
                ref.dbconnection.applyQueryIntoDataBase(query, 'insertDataToMongo', res, req);
            }
        },
        {
            'url': '/getAllData',
            'method': 'get',
            'callbackFun':  function(req, res) {
                console.log(' i am here...');
                ref.dbconnection.applyQueryIntoDataBase(query, 'getAllData', res, req);
            }
        },
        {
            'url': '/updateData',
            'method': 'put',
            'callbackFun':  function(req, res) {
                console.log(' i am here...');
                ref.dbconnection.applyQueryIntoDataBase(query, 'updateData', res, req);
            }
        },
        {
            'url': '/sendEmail',
            'method': 'post',
            'callbackFun':  function(req, res) {
                console.log(' i am here...');
                ref.backEndRequest.sendRequest(ref, 'http://localhost:8085/sendEmail', req.body.data, 'post' , function(body) {
                    console.log('.. sucessfully back ...');
                    res.send('.. aa gaye bhai hum...');
                });

            }
        }
    ];
    routingData.forEach(function(obj) {
       ref.router[obj.method](obj.url, obj.callbackFun); 
    });
    return ref.router; 
};
