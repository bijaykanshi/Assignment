
module.exports = function(ref) {
    var routingData = [
        {
            'url': '/',
            'method': 'get',
            'callbackFun':  function(req, res) {
                res.render('blog');
            }
        },
        {
            'url': '/loginSignUp',
            'method': 'post',
            'callbackFun': function(req, res) {
                var dec = req.body.dec;
                console.log(dec)
                if (dec === 'login') {
                    var userCat = req.body.ucat;
                    var str = 'deleted';
                    //query = 'select * from news n join user_action u on n.news_id = u.news_id where u.user_email = n.inserted_by and u.action <>' + "'"+str+"'"+ 'and EXISTS(SELECT name FROM users WHERE email ='+ "'"+req.body.email+"'"+ ' and password =' + "'"+req.body.password+"'"+ ' and ucat = ' + "'"+userCat+"'" + ');'
                    query = 'SELECT * FROM news n WHERE EXISTS(SELECT name FROM users WHERE email ='+ "'"+req.body.email+"'"+ ' and password =' + "'"+req.body.password+"'"+ ' and ucat = ' + "'"+userCat+"'" + ') and NOT EXISTS(select user_email from user_action where user_email = '+ "'"+req.body.email+"'"+ ' and news_id_action = n.news_id and action = '+ "'"+str+"'"+ ' );';
                    query += 'select n.news_id, u.action from news n inner join user_action u on u.news_id_action = n.news_id where u.user_email='+ "'"+req.body.email+"'"+ ' and u.action <> '+ "'"+str+"'"+ ';';
                    query += 'SELECT name FROM users WHERE email ='+ "'"+req.body.email+"'"+ ' and password =' + "'"+req.body.password+"'"+ ' and ucat = ' + "'"+userCat+"'" + ';';
                    query += 'select * from news_comment ORDER BY datetime DESC;';

                    //query = 'SELECT name FROM users WHERE email ='+ "'"+req.body.email+"'"+ ' and password =' + "'"+req.body.password+"'" + ' and ucat = ' + "'"+userCat+"'" +';';
                    
                } else {
                    var format = '%d-%m-%Y';
                    query = 'insert into users (name , password, email, ucat, dob, country, state, city, pin_code, contact_No) values ('+"'"+req.body.name+"'"+','+"'"+req.body.password+"'"+','+"'"+req.body.email+"'"+','+"'"+req.body.ucat+"'"+','+ 'STR_TO_DATE('+"'"+req.body.birthdate+"'"+',' + "'"+format+"'" +')'+','+"'"+req.body.country+"'"+','+"'"+req.body.state+"'"+','+"'"+req.body.city+"'"+','+"'"+req.body.pin_code+"'"+','+"'"+req.body.contact_No+"'"+');';
                   
                }
                console.log('email' + req.body.email);
                ref.dbconnection.applyQueryIntoDataBase(query, dec, res, req);
            }
        }
    ];
    routingData.forEach(function(obj) {
       ref.router[obj.method](obj.url, obj.callbackFun); 
    });
    return ref.router; 
};
