var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
这里同时接受http和https的请求
*/
router.post('/post', function(req, res, next) {
  console.log('req body:',req.body);
  res.send('post return.');
});

module.exports = router;
