
module.exports = function(ref) {
    var query = '';
    var routingData = [
        {
            'url': '/',
            'method': 'get',
            'callbackFun':  function(req, res) {
                res.render('index');
            }
        },
        {
            'url': '/getCourseDetail',
            'method': 'get',
            'callbackFun':  function(req, res) {
                query = 'select * from mmt';
                ref.dbconnection.applyQueryIntoDataBase(query, 'getCourseDetail', res);
            }
        }
    ];
    routingData.forEach(function(obj) {
       ref.router[obj.method](obj.url, obj.callbackFun); 
    });
    return ref.router; 
};
