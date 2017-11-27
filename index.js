var express = require('express'),
  pug = require('pug'),
  path = require('path'),
  route = require('./routes/routes.js'),
  bodyParser = require('body-parser');


var app = express();


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.get('/', route.index);
app.get('/login', route.login);
app.get('/create', route.create);
app.get('/home', route.home);
app.get('/details', route.details);
app.get('/edit/', route.edit);
app.post('/login', urlencodedParser, route.loginUser);
app.post('/create', urlencodedParser, route.createUser);
app.post('/edit/:id', urlencodedParser, route.editUser);
app.get('/logout', route.logout);
app.get('/delete/:id', route.delete);

app.listen(3000);