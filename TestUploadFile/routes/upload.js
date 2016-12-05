var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var Busboy = require('busboy');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a upload module.');
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/file/', function(req, res, next){
	  //生成multiparty对象，并配置上传目标路径
	  var form = new multiparty.Form({uploadDir: './public/files/'});

	  form.on('close',function(e){
	  	console.log('close event');
	  })
	  //上传完成后处理
	  form.parse(req, function(err, fields, files) {
	    var filesTmp = JSON.stringify(files,null,2);

	    console.log("fields:",fields);
	    console.log("files:",files);

	    if(err){
	      console.log('parse error: ' + err);
	    } else {
	      console.log('parse files: ' + filesTmp);
	      // var inputFile = files.inputFile[0];
	      // var uploadedPath = inputFile.path;
	      // var dstPath = './public/files/' + inputFile.originalFilename;
	      // //重命名为真实文件名
	      // fs.rename(uploadedPath, dstPath, function(err) {
	      //   if(err){
	      //     console.log('rename error: ' + err);
	      //   } else {
	      //     console.log('rename ok');
	      //   }
	      // });
	    }

	    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
	    res.write('received upload:\n\n');
	    res.end(util.inspect({fields: fields, files: filesTmp}));
	 });
	});

router.post('/file2/', function(req, res, next){

	console.log('aaa');
	var busboy = new Busboy({ headers: req.headers });
		
		// Listen for event when Busboy finds a file to stream.
	busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
	
		// We are streaming! Handle chunks
		console.log('finename:',filename);
		file.on('data', function (data) {
			// Here we can act on the data chunks streamed.
			console.log('here');
		});
		
		// Completed streaming the file.
		file.on('end', function () {
			console.log('Finished with ' + fieldname);
		});
	});
	
	// Listen for event when Busboy finds a non-file field.
	busboy.on('field', function (fieldname, val) {
		// Do something with non-file field.
	});
	
	// Listen for event when Busboy is finished parsing the form.
	busboy.on('finish', function () {
		res.statusCode = 200;
		res.end('OK');
	});
	
	// Pipe the HTTP Request into Busboy.
	req.pipe(busboy);
		
});

module.exports = router;


/**
1. 使用命令可以使用（两种方法都可以使用）

curl -F file=@tts2.mp3   http://127.0.0.1:3000/upload/file

2. 使用uploadFile.html不能使用

原因？
*/



