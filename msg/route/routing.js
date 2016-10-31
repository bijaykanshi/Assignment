
module.exports = function(ref) {
    var defaultFn = {};
    ref.routeJson.forEach(function(obj) {
        var splitStr = obj.callbackFun.split('_');
        var methodCall = splitStr[1] ? ref[splitStr[0]][splitStr[1]] : defaultFn[splitStr[0]];
        ref.router[obj.method](obj.url, methodCall); 
    });
    return ref.router; 
};
