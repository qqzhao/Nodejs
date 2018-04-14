

function uploadFile(req,res){

	console.log('uploadFile2');
	console.log('files:',req.files);
	console.log(req.params);

	var index = 0;
	req.on('data',function(chunk){
		console.log('index:',index);
		index ++;
	});

	req.on('end',function(e){
		console.log('end');
	});

	// res.send('ok');
}

exports.upload = uploadFile;