
module.exports = function() {
    var query = '';
    var insertQueryBuilder = function(arr, data, tableName, multipleValue) {
        var build = 'insert into ' + tableName + ' (';
        arr.forEach(function(val) {
            build += val + ',';
        });
        build = build.substring(0, build.length - 1) + ') values (';
        data.forEach(function(obj) {
            arr.forEach(function(val) {
                build += "'"+ obj[val] +"'"+','";
            });
            build = build.substring(0, build.length - 1) + '),(';
        })
        build = build.substring(0, build.length - 2) + ';';
        return build;
    }
    var routingData = [
        {
            'url': '/',
            'method': 'get'
            'callbackFun':  function(req, res) {
                res.render('index');
            }
        }
        {
            'url': '/loginSignUp',
            'method': 'post',
            'callbackFun': function(req, res) {
                var dec = req.body.dec;
                console.log(dec)
                if (dec === 'login') {
                    var userCat = req.body.ucat === 'site_user' ? 'lawyer' : 'site_user';
                    query = 'SELECT * FROM users WHERE EXISTS(SELECT name FROM users WHERE email ='+ "'"+req.body.email+"'"+ ' and password =' + "'"+req.body.password+"'" + ' )and city = (select city from users where email =' + "'"+req.body.email+"'" +') and ucat = ' + "'"+userCat+"'" +';';
                    query += 'SELECT * from users T1  INNER JOIN userlawyer T2 ON T1.email = T2.lawyer_email where T2.site_user_email = ' + "'"+req.body.email+"'"+ ';';
                    
                } else if (dec === 'lawyer') {
                    query = 'SELECT * from users T1  INNER JOIN userlawyer T2 ON T1.email = T2.site_user_email where T2.lawyer_email = ' + "'"+req.body.email+"'"+ 'and EXISTS(SELECT name FROM users WHERE email ='+ "'"+req.body.email+"'"+ ' and password =' + "'"+req.body.password+"'" + ' );';
                } else {
                    var format = '%d-%m-%Y';
                    query = 'insert into users (name , password, email, ucat, dob, country, state, city, pin_code, contact_No) values ('+"'"+req.body.name+"'"+','+"'"+req.body.password+"'"+','+"'"+req.body.email+"'"+','+"'"+req.body.ucat+"'"+','+ 'STR_TO_DATE('+"'"+req.body.birthdate+"'"+',' + "'"+format+"'" +')'+','+"'"+req.body.country+"'"+','+"'"+req.body.state+"'"+','+"'"+req.body.city+"'"+','+"'"+req.body.pin_code+"'"+','+"'"+req.body.contact_No+"'"+');';
                   
                }
                console.log('email' + req.body.email);
                ref.dbconnection.applyQueryIntoDataBase(query, dec, res, req);
            }
        },
        {
            'url': '/saveBookingOrDelete',
            'method': 'post',
            'callbackFun': function(req, res) {
                var dec = req.body.dec;
                var data = req.body.data;
                console.log('....data...' + data);
                console.log(dec)
                if (dec == 'multiple' || dec == 'single') {
                    query = insertQueryBuilder(['contact_No', 'city', 'status', 'lawyer_email', 'site_user_email'], data, 'userlawyer');
                } else if (dec === 'action_by_lawyer') {
                    query = 'UPDATE userlawyer set status = '+"'"+data[0].status+"'"+' WHERE lawyer_email='+"'"+data[0].lawyer_email+"'"+' and site_user_email = '+"'"+data[0].site_user_email+"'"+';';
                    
                   
                } else {
                    query = 'delete from userlawyer where lawyer_email = '+ "'"+data[0].lawyer_email+"'"+ ' and site_user_email ='+ "'"+data[0].site_user_email+"'"+ ';';
                }
                console.log('email' + req.body.email);
                ref.dbconnection.applyQueryIntoDataBase(query, dec, res, req);
            }
        }
        {
            'url': '/getData',
            'method': 'get'
            'callbackFun':  function(req, res) {
                query = 'select * from users';
                ref.dbconnection.applyQueryIntoDataBase(query, 'getData', res);
            }
        }
    ];
    routingData.forEach(function(obj) {
       ref.router[obj.method](obj.url, obj.callbackFun); 
    });
    return ref.router; 
};
