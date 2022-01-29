const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/served', function (req, res) {
  const x= `<h1>Recieved from node</h1>`
  res.send(x);
})

//Serving Dynamic Posts
app.get('/post/:postid(\\d+)', function (req, res) {
  let postID=parseInt(req.params.postid);
  let html= `<h1>Post Title</h1>`;
  html+= `<h2>by Author</h2>`;
  html+= `<h3>Post ID: ${postID}</h3>`
  res.send(html);
})

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
})


//posting the contact form

app.post('/comments', function(req,res){
  let name = req.body.name;
  let email = req.body.email;
  let subject = req.body.subject;
  let message = req.body.message;
  console.log(`Data recieved: ${name}, ${email}, ${subject}, ${message}`);
  var stmt = db.run(`INSERT INTO comments VALUES("${name}", "${email}", "${subject}", "${message}")`)
})



app.get('/comments', function(req, res){
  db.all('SELECT * FROM comments', function(err, row){
 res.json(row);
  })
})

app.listen(5000, function(){
    console.log('Listening to 5000');
})

//Database connection
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');



db.serialize(function(){
  db.run(`CREATE TABLE IF NOT EXISTS comments(
    NAME           TEXT ,
    EMAIL          TEXT ,
    SUBJECT        TEXT ,
    MESSAGE TEXT
    ); `);
})