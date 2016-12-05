const baseTest = require('../unitTest/baseTest').baseTest;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var file = require('./file');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

function route(app){
	app.get('/sayHello',sayHello);
	app.get('/test',baseTest);

	app.post('/file/uploadOri', function(req, resp) {
	  // console.log(req.body, req.files);
	  console.log('req:',req);
	  // don't forget to delete all req.files when done
	});

	// app.post('/file/upload',multipartMiddleware,file.upload);

	//console.log('multipartMiddleware:',multipartMiddleware);
	app.post('/file/upload', multipartMiddleware, function(req, resp) {
	  // console.log(req.body, req.files);
	  console.log('req:',req);
	  // don't forget to delete all req.files when done
	});

	app.post('/file/uploading', function(req, res, next){
	  //生成multiparty对象，并配置上传目标路径
	  var form = new multiparty.Form({uploadDir: './public/files/'});
	  //上传完成后处理
	  form.parse(req, function(err, fields, files) {
	    var filesTmp = JSON.stringify(files,null,2);

	    if(err){
	      console.log('parse error: ' + err);
	    } else {
	      console.log('parse files: ' + filesTmp);
	      var inputFile = files.inputFile[0];
	      var uploadedPath = inputFile.path;
	      var dstPath = './public/files/' + inputFile.originalFilename;
	      //重命名为真实文件名
	      fs.rename(uploadedPath, dstPath, function(err) {
	        if(err){
	          console.log('rename error: ' + err);
	        } else {
	          console.log('rename ok');
	        }
	      });
	    }

	    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
	    res.write('received upload:\n\n');
	    res.end(util.inspect({fields: fields, files: filesTmp}));
	 });
	});
}

function sayHello(req,res) {
	res.send('hello world!!');
}

exports.route = route;