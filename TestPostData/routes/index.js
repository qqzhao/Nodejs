var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/postdata', function(req, res, next) {
  console.log('req.body:',req.body);
  var result = {};
  result.description = 'respond with a postdata';
  result.data = req.body;
  res.send(result);
});

router.post('/postfile', multipartMiddleware ,function(req, res, next) {
  console.log('req.files:',req.files);
  var result = {};
  result.description = 'respond with a postfile';
  // result.data = req.body;
  res.send(result);
  res.end();
});

module.exports = router;
