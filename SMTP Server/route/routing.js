
module.exports = function(ref) {
    var routingData = [
        {
            'url': '/sendEmail',
            'method': 'post',
            'callbackFun':  function(req, res) {

                console.log('.. i am in smtp server....' + JSON.stringify(req.body));
                res.send('sucessfully sent');
            }
        }
    ];
    routingData.forEach(function(obj) {
       ref.router[obj.method](obj.url, obj.callbackFun); 
    });
    return ref.router; 
};
