
module.exports = function(ref) {
    var query = '';
    var insertQueryBuilder = function(arr, data, tableName, updateIfExist, defaultVal) {
        var build = 'insert into ' + tableName + ' (';
        arr.forEach(function(val) {
            build += val + ',';
        });
        build = build.substring(0, build.length - 1) + ') values (';
        data.forEach(function(obj) {
            arr.forEach(function(val) {
                build += "'"+ obj[val] +"'"+',';
            });
            build = build.substring(0, build.length - 1) + '),(';
        })
        build = build.substring(0, build.length - 2);
        if (updateIfExist){
            build += 'ON DUPLICATE KEY UPDATE ';
            arr.forEach(function(val) {
                build += val + '=' + "'"+ data[0][val] +"'"+',';
            });
            Object.keys(defaultVal).forEach(function(key) {
                build += key + '=' +  defaultVal[key] + ',';
            })
            build = build.substring(0, build.length - 1);
        }
        build += ';';
        return build;
    }
    var routingData = [
        {
            'url': '/',
            'method': 'get',
            'callbackFun':  function(req, res) {
                res.render('index');
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
        },
        {
            'url': '/homePageRequest',
            'method': 'post',
            'callbackFun': function(req, res) {
                var dec = req.body.dec;
                var data = req.body.data;
                console.log('....data...' + data);
                console.log(dec)
                if (dec == 'newsSubmit') {
                    query = insertQueryBuilder(['url', 'news_title', 'hacker_news_url', 'news_desc', 'inserted_by'], data, 'news', true, {upvotes: 0});
                } else if (dec === 'SuccessfullyCommented') {
                    query = insertQueryBuilder(['news_id', 'comment', 'comment_by'], data, 'news_comment');
                } else if(dec === 'upvotes') {
                    data.upvotes += 1;
                    query = 'update news set upvotes = '+data.upvotes+' where news_id = '+data.news_id+';';
                } else {
                    query = insertQueryBuilder(['user_email', 'news_id_action', 'action'], data, 'user_action');
                }
                console.log('email' + req.body.email);
                ref.dbconnection.applyQueryIntoDataBase(query, dec, res, req);
            }
        },
        {
            'url': '/getData',
            'method': 'get',
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
