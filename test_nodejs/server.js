var fs = require('fs');
var co = require('co');
var request = require('request');
var http = require('http');
var sysc = require('./core/sys');
var config = require('./core/config').config();
var dl = require('./core/download.js');
var test = require('./unitTest/allTest')

const fileDir = '/tmp/test_nodejs/';


http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
}).listen(8888);

// sysc.sysCall('ls -l');

function testF(url,name) {

	var gen = function *(){
	
		var path = config.downloadPath + name;
		dl.download(url,path);

		var excl = 'ls -l ' + path;
		// var excl = 'du -b ' + path;
		// sysc.sysCall(excl);
		// console.log('excl' + excl);

		var ret = yield sysc.sysCallSync(excl);
		console.log(ret);
		console.log('sync excl...' + excl);
	}	

	co(gen);
}

//test('http://img4.cache.netease.com/cnews/2016/8/6/201608060957169fae8_550.jpg','1.jpg');

test.test();

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');