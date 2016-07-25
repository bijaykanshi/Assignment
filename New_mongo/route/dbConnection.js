
module.exports = function(ref) {
    var dbconnection = new function () {
        var url = 'mongodb://localhost:27017/test';
        var MongoClient = ref.mongodb.MongoClient;
        var me = this;
        this.firstQueryToMongo = function(db, res) {
            console.log('Connection established to', url);
            var collection = db.collection('my_db');
            var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
            var user2 = {name: 'modulus user', age: 22, roles: ['user']};
            var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

            
            collection.insert([user1, user2, user3], function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                  }
                  //Close connection
                  db.close();
                  res.send("successfully inserted");
            });
        }
        this.insertDataToMongo = function(db, res, req) {
            var x = req.body.data;
            console.log(JSON.stringify(x));
            var collection = db.collection('my_db');
            collection.insert([x], function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('successfully inserted : ---  ', result.length, result);
                  }
                  //Close connection
                  db.close();
                  res.send("successfully inserted");
            });
        }
        this.getAllData = function(db, res, req) {
            var collection = db.collection('my_db');
            collection.find().toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                }
                res.send(result);
                db.close();
            });
        }
        this.updateData = function(db, res, req) {
            var x = req.body.data;
            console.log(JSON.stringify(x));
            var collection = db.collection('my_db');
            collection.update(x.toUpdate, {$set: x.updateWith}, {upsert:true, multi:true}, function(err, result) {
                res.send(result);
                db.close();
            });
        }
        this.applyQueryIntoDataBase = function (query, methodToCall, res, req, data) {
            
            MongoClient.connect(url, function (err, db) {
              if (err)
                console.log('Unable to connect to the mongoDB server. Error:', err);
              else
                 me[methodToCall](db, res, req);
        
            });
        };
    }
    return dbconnection; 
};
