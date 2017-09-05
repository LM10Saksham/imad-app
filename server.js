var express = require('express');    //dependencies
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;      //required for querying and injectiong into database
var crypto = require('crypto');     //to use the hashing functions
var bodyParser = require('body-parser');    //To parse the the JSON objexts sent from the GET request into String
var session = require('express-session');


var config = {
    user : 'sakshambarcelona',
    database : 'sakshambarcelona',
    host : 'db.imad.hasura-app.io',
    port :'5432',
    password : process.env.DB_PASSWORD
};        //To access the databse

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie : {maxAge : 1000*60*60*24*30}}
));

function createTemplate(data){
var title = data.title;
var date = data.date;
var heading = data.heading;
var content = data.content;
var htmlTemplate = `
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name='viewport' content='width-device-width, initial scale = 1'/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
        <div class='container'>
    <div>    
        <a href = "/">Home</a>
        </div>
        <hr/>
        <div>
        ${date}
        </div>
        
        <h3>
        ${heading}
        </h3>
        <div>
            ${content}
        </div>
    </div>        
    </body>
   `;
   return htmlTemplate;
}  //contains the the tempated html code

function hash(input, salt){
 var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');   //using the pbkdf2Sync fucntion
    return ['pbkdf2','10000', salt,hashed.toString('hex')].join('$');
}    // function that performs hashing

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});  


app.get('/hash/:input', function(req,res){
    var hashedString = hash (req.params.input, 'this-is-some-random-string');  //The scond parameter is the salt
    res.send(hashedString);
});    //To check if on a site we can ge the hashed password

app.post('/login', function(req,res){       //Getting input from the HTTP body
    var username = req.body.username;
    var password = req.body.password;
        
    Pool.query('SELECT * FROM "User" WHERE username = $1', [username], function(err, result){   //check the way dollar sign has been used
        if(err){
            res.status(500).send("Login or password incoorect");
        }
        else{
            var dbString = result.rows[0].password;
            var salt = dbString.split('$')[2];
            var hashedPassword = hash(password, salt);
            if(hashedPassword === dbString){
                res.send("User credentials correct!!");
            }
            else{
                res.status(500).send("Login or password incorrect");
            }
            req.session.auth = {userID : result.rows[0].id};
            
            
            
            res.send("user successfully created" + username);
        } 
    });
});



app.post('/create-user', function(req,res){       //Getting input from the HTTP body
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');    //Getting random salt string
    var dbString = hash(password, salt);    
    Pool.query('INSERT INTO "User"(username, password) VALUES ($1, $2)', [username, dbString], function(err, result){   //check the way dollar sign has been used
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send("user successfully created" + username);
        } 
    });
});


var Pool = new Pool(config);
app.get('/db-test', function (req, res){
    Pool.query("SELECT name FROM category",function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/articles/:articlename', function(req, res){
    Pool.query("SELECT * FROM article WHERE title = $1", [req.params.articlename] , function (err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           if(result.rows.length === 0){
               res.status(400).send("Could not find the article");
           }
           else{
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
    
});
var counter =0;
app.get('/counter', function (req, res) {
    counter = counter +1;
  res.send(counter.toString());
});
var names =[];
app.get('/submit-name', function(req, res){
    var name = req.query.name ;
    
    names.push(name);
    
    res.send(JSON.stringify(names));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
