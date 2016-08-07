var request = require('request');
var fs = require('fs');
var config = require('./config.js');
var downloadM = require('download');
var pathM = require('path');
var http = require('http');
const urlM = require('url');
const sysc = require('./sys');

function download(url,path) {
	request(url).pipe(fs.createWriteStream(path));
	console.log(path);
}

function downloadSync(url,path) {

	return downloadSync5(url, path);
}

//pipi产生的仍然是异步的。
function downloadSync1(url,path) {

	return new Promise(function(resolve,reject){
		request(url).pipe(fs.createWriteStream(path));
		console.log(path + ' download finish...');
		resolve('download success');
	})
	
}

//http.request..这里适用于文本格式，不适用于二进制数据
function downloadSync2(url,path) {
	
	return new Promise(function(resolve, reject) {
		var parseResult = urlM.parse(url);
		var options = {
			host: parseResult.host,
			port: 80,
			path: parseResult.path,
			method: 'GET',
		};

		console.log(options);

		var req = http.request(options, (res) => {
			console.log('Got response: ' + res.statusCode);

			var dataBuf;
			var chunkIndex = 0;
			res.on("data", function(chunk) {
				console.log("chunk.... "+ chunkIndex);
				dataBuf += chunk;
				chunkIndex ++;
			});

			res.on("end", function() {
				console.log('end');
				fs.writeFileSync(path, dataBuf);
				resolve('success');

			})
		})

		req.on('error', (e) => {
			console.log('Got error :'+ e);
		});

		req.end();
	})
}


//http.request..这里使用Buffer,二进制文件的下载
//这里注意buffer追加的顺序，第一次错误的原因就是顺序搞反了。
function downloadSync3(url,path) {
	
	return new Promise(function(resolve, reject) {

		var parseResult = urlM.parse(url);
		var options = {
			host: parseResult.host,
			port: 80,
			path: parseResult.path,
			method: 'GET',
		};

		console.log(options);

		var req = http.request(options, (res) => {
			console.log('Got response: ' + res.statusCode);
			var dataBuf2 = new Buffer('');
			var chunkIndex = 0;
			res.on("data", function(chunk) {
				chunkIndex ++;
				const curBuf = new Buffer(chunk);
				var totalLength = curBuf.length+dataBuf2.length;
				dataBuf2 = Buffer.concat([dataBuf2,curBuf],totalLength);
				console.log("curIndex:",chunkIndex," length:",dataBuf2.length);
			});

			res.on("end", function() {
				console.log('end');
				fs.writeFileSync(path, dataBuf2,'binary');
				resolve('success');

			})
		})

		req.on('error', (e) => {
			console.log('Got error :'+ e);
		});

		req.end();
	})
}

//http.get 这里也是成功的。
function downloadSync4(url,path) {

	console.log('downloadSync4');
	return new Promise(function(resolve, reject) {
		http.get(url, (res) => {
			console.log('Got response: ${res.statusCode}');

			var dataBuf = new Buffer('');
			var chunkIndex = 0;
			res.on("data", function(chunk) {
				console.log("chunk.... "+ chunkIndex);
				const curBuf = new Buffer(chunk);
				const length = dataBuf.length + curBuf.length;
				dataBuf = Buffer.concat([dataBuf,curBuf],length);
				chunkIndex ++;
			});

			res.on("end", function() {
				console.log('end');
				fs.writeFileSync(path, dataBuf, 'binary');
				resolve('success');

			})
		}).on('error', (e) => {
			console.log(`Got error: ${e.message}`);
		});
	})
}

//使用downloadM模块，好用。但是需要传入目录，并且文件名不确定。
function downloadSync5(url,path) {

	var urlPathName = urlM.parse(url).pathname;
	var urlName = pathM.basename(urlPathName);
	console.log('downloadSync5:' + urlPathName);
	return new Promise(function(resolve,reject){
		var filedir = pathM.dirname(path);
		console.log(filedir);
		var excl = 'mv ' + filedir + '/' + urlName +  ' ' + path;

		//这样可以达到效果。
		// downloadM(url, filedir).then(() => {
		// 	sysc.sysCallSync(excl)
		//     console.log('done!');
		//     resolve('success');
		// })

		//then后面需要跟函数，否则没法进行同步then的执行。正确写法是下面的代码
		// downloadM(url, filedir)
		// 	.then(sysc.sysCallSync(excl))
		// 	.then(resolve('success'))

		downloadM(url, filedir)
			.then(() => {sysc.sysCallSync(excl)})
			.then(() => {resolve('success')})
	});
}

//使用body下载下来的文件不对。
function downloadSync6(url,path) {
	
	console.log('url:' + url);
	return new Promise(function(resolve, reject) {
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('request success');
				fs.writeFileSync(path, response.data,'binary');
				resolve('success');
			}else{
				console.log('request fail.');
				resolve('fail');
			}
		})
	})
}

exports.download = download;
exports.downloadSync = downloadSync;

