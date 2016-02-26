
module.exports = function() {
    var dbconnection = new function () {
        this.pool =  ref.mysql.createPool({
            host : 'localhost',
            user : 'root',
            password: 'mypass123'
            database: 'logis',
            multipleStatements: true
        });
        this.applyQueryIntoDataBase = function (query, decision, res, req, data) {
            console.log(query);
            dbconnection.pool.getConnection(function(err, connection) {
                        if (err) {
                            console.log('...........................error...............' + err);
                            ref.responseToClient.error.error = err;
                            res.send(ref.responseToClient.error);
                        }
                        connection.query( query,  function(err, rows) {
                            if (err) {
                                console.log('...........................error...............' + err);
                                res.send(ref.responseToClient.error);
                            } else {
                                dbconnection.sendResponse(rows, decision, res, req, data);
                            }
                        });
                    
                connection.release();
            });
        };
        this.sendResponse = function(rows, decision, req, data) {
            ref.responseToClient.success.result = rows;
            console.log(decision);
            switch(decision) {
                default:
                    if (res) {
                        console.log('...sending response to client...');
                        res.send(ref.responseToClient.success);
                    }
            }
        };
    }
    return dbconnection; 
};
