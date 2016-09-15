var http = require('http');
var fs = require('fs');

var port = 3000;
var postPath = '/postfile';

function sendFileData(path) {

	var opt = {  
        method: "POST",  
        host: "localhost",  
        port: port,  
        path: postPath,  
    };

	var request = http.request(opt, (req) => {

		var bodyData = '';
		req.on('data', (chunk) => {
		  	bodyData += chunk;
		  	// console.log('data');
		  });

		req.on('end', (chunk) => {
			var datavv = JSON.parse(bodyData);
	        console.log('received data : ',datavv);
		  });
	});

	var boundaryKey = Math.random().toString(16); // random string
	request.setHeader('Content-Type', 'multipart/form-data; boundary="'+boundaryKey+'"');
	// the header for the one and only part (need to use CRLF here)
	request.write( 
	  '--' + boundaryKey + '\r\n'
	  // use your file's mime type here, if known
	  + 'Content-Type: application/octet-stream\r\n' 
	  // "name" is the name of the form field
	  // "filename" is the name of the original file
	  + 'Content-Disposition: form-data; name="my_file.jpg"; filename="fileName.jpg"\r\n'
	  + 'Content-Transfer-Encoding: binary\r\n\r\n' 
	);

	fs.createReadStream(path, { bufferSize: 4 * 1024 })
	  .on('end', function() {
	    // mark the end of the one and only part
	    request.end('\r\n--' + boundaryKey + '--'); 
	  })
	  // set "end" to false in the options so .end() isn't called on the request
	  .pipe(request, { end: false }) // maybe write directly to the socket here?
}


function sendData(data) {
  var reqdata = 'file='+data;
  var request = http.request({
    host : 'localhost',
    port : port,
    path : postPath,
    method : 'POST',
    headers : {
      'Content-Type' : 'multipart/form-data',
      'Content-Length' : reqdata.length
    }
  }, function (response) {
      var data = '';
      response.on('data', function(chunk) {
        data += chunk.toString();
      });
      response.on('end', function() {
        console.log(data);
      });
    });

  //request.write(reqdata+'\r\n\r\n');
  request.end();
}

function sendFileData2(filePath){
	fs.readFile(filePath,function(err, data){
	  if(err){
	  	console.log('error ',err);
	   }else{ 
	   	console.log('data:',data);
	    sendData(data);
	   }
	});
}

var filePath = './aaa.jpeg';
// var filePath = './package.json';

sendFileData(filePath);
// sendFileData2(filePath);//确实有问题，不work

/*
参考： http://stackoverflow.com/questions/5744990/how-to-upload-a-file-from-node-js
*/




