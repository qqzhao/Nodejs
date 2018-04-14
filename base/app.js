const express = require('express');
const path = require('path');
const route = require('./routes/route').route;
var bodyParser = require('body-parser');

var app = express();
//.createServer();//这个函数会报错。
const port = 3000;

app.set('port', process.env.PORT || port);
//app.use(express.logger('dev'));/* 'default', 'short', 'tiny', 'dev' */

// app.use(bodyParser());
// app.use(bodyParser({uploadDir: './uploads'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser({ keepExtensions: true, uploadDir: './public/images' }));


app.use(express.static(path.join(__dirname, 'public')));

route(app);
app.get('/', function(req, res){
  res.send('hello world from test_nodejs!');
});

app.listen(port);
console.log('listen http://localhost:',port);