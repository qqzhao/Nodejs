var express = require('express');
var router = express.Router();
var path = require('path');
var ejs = require('ejs');



var rootPathConfig = { root: path.join(__dirname, '../publicTest/aaa') };
var viewPath = { root: path.join(__dirname, '../views') };
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
	console.log('ourl:'.req.host);
  res.sendFile('uploadFile.html',rootPathConfig);
});

router.get('/test2', function(req, res, next) {
  res.sendFile('test2.html',rootPathConfig);
});

router.get('/test3', function(req, res, next) {
  console.log("--test3--");
  res.render('index', {
            title: "mytest3"
        });
});

router.get('/test4', function(req, res, next) {
  console.log("--test4--");
  var mystr = require('fs').readFileSync(viewPath.root + '/list.ejs', 'utf8');
  var ret = ejs.render(mystr, {
    names: ['foo', 'bar', 'baz']
  });

  console.log(ret);
  res.send('OK!')
});


router.get('/test5', function(req, res, next) {
  console.log("--test5--");
  var mystr = require('fs').readFileSync(viewPath.root + '/ifMode.ejs', 'utf8');
  var path = viewPath.root + '/ifMode.ejs';
  console.log('path:',path);
  var ret = ejs.render(mystr, {
    type:'qba',
    aaType:true,
    bbType:false,
    aa_if:false,
    filename:path
  });

  console.log(ret);
  res.send(ret)
});



module.exports = router;
