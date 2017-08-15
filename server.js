var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));

 var ArticleOne  = {
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

};

function createTemplate(ArticleOne){
var title = ArticleOne.title;
var date = ArticleOne.date;
var heading = ArticleOne.heading;
var content = ArticleOne.content;
var htmlTemplate = `
    <html>
    <head>
        <title>
            $(title)
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
        date
        </div>
        
        <h3>
        heading
        </h3>
        <div>
            content
        </div>
    </div>        
    </body>
   `;
   return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one', function(req, res){
    res.send(createTemplate(ArticleOne));
});
app.get('/article-two', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
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
