var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user : 'sakshambarcelona',
    database : 'sakshambarcelona',
    host : 'db.imad.hasura-app.io',
    port :'5432',
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles = { 'article-one' : {
    title : 'Article-one',
    heading : 'BIO',
    date : '12 August, 2017',
    content : `<p>
                Hello, My name is Saksham and I am a wizard. Avada Kedavra !!
            </p>
            <p>
                Hello, My name is Saksham and I am a wizard. Avada Kedavra !!
            </p>
             <p>
                Hello, My name is Saksham and I am a wizard. Avada Kedavra !!
            </p>`
     
 }};

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
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
    Pool.query("SELECT * FROM article WHERE title ='" + req.params.articlename + "'" , function (err,result){
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
