var dl = require('../core/download');
var co = require('co');
var sysc = require('../core/sys');

var url_image = 'http://img4.cache.netease.com/cnews/2016/8/6/201608060957169fae8_550.jpg';
var path = '/tmp/test_nodejs/2.jpg';

function test() {
	
	// testAsync();
	testSync();
	// testSync2();
	// testSync3();
}

function testAsync() {
	
	var gen = function *(){
		console.log('begin async download');
		dl.download(url_image,path);
		console.log('end async download');

		var excl = 'ls -l ' + path;
		yield sysc.sysCallSync(excl);
	}

	co(gen);
/*
begin async download
/tmp/test_nodejs/2.jpg
end async download
sync:ls -l /tmp/test_nodejs/2.jpg
Server running at http://127.0.0.1:8888/
stdout:
 -rw-r--r--  1 username  wheel  0  8  6 18:50 /tmp/test_nodejs/2.jpg

stderr
*/
}

function testSync() {
	// var gen = function *(){
	// 	console.log('begin sync download');
	// 	var ret = yield dl.downloadSync(url_image,path);
	// 	console.log(ret);

	// 	console.log('end sync download');

	// 	var excl = 'ls -l ' + path;
	// 	yield sysc.sysCallSync(excl);
	// }

	// co(gen);
	//正确写法
	// var excl = 'ls -l ' + path;
	// dl.downloadSync(url_image,path).then(function(){
	// 	sysc.sysCallSync(excl).then(function(){
	// 		console.log('success..');
	// 	});
	// })

	//另一种写法
	var excl = 'ls -l ' + path;
	dl.downloadSync(url_image,path)
		.then(() => {sysc.sysCallSync(excl)})
		.then(() => {console.log('success..');})
}


function testSync2() {
	var gen = function *(){
		console.log('begin sync download');
		var down_excl = 'curl -o ' + path + ' ' + url_image;
		var ret = yield sysc.sysCallSync(down_excl);
		console.log(ret);

		console.log('end sync download');

		var excl = 'ls -l ' + path;
		yield sysc.sysCallSync(excl);
	}

	co(gen);
}

function promiseLog(message) {
	return new Promise(function (resolve,reject) {
		console.log(message);
		resolve('');
	});
}

function testSync3() {
	// var gen = function *(){

	// 	var down_excl = 'curl -o ' + path + ' ' + url_image;
	// 	var ret = yield sysc.sysCallSync(down_excl);
	// 	console.log(ret);

	// 	var excl = 'ls -l ' + path;
	// 	yield sysc.sysCallSync(excl);
	// }

	// co(gen);

	var down_excl = 'curl -o ' + path + ' ' + url_image;
	var excl = 'ls -l ' + path;
	sysc.sysCallSync(down_excl).then(function (){
		sysc.sysCallSync(excl).then(function(){
			promiseLog('finish sysCallSync..');
			console.log('.....');
		})
	})


	// sysc.sysCallSync(down_excl)
	// 	.then(function (result){
	// 		sysc.sysCallSync(excl);
	// 		resolve('aaa');
	// 	})
	// 	.then(function (ret){
	// 		promiseLog('finish sysCallSync..' +ret);
	// 	})

/*output:
说明：前面同步，后面异步。所以如果全部同步，需要上面注释代码。
sync:curl -o /tmp/test_nodejs/2.jpg http://img4.cache.netease.com/cnews/2016/8/6/201608060957169fae8_550.jpg
Server running at http://127.0.0.1:8888/
stdout:

stderr
   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   99k  100   99k    0     0   173k      0 --:--:-- --:--:-- --:--:--  173k

sync:ls -l /tmp/test_nodejs/2.jpg
stdout:
 -rw-r--r--  1 username  wheel  101699  8  6 19:49 /tmp/test_nodejs/2.jpg

stderr
*/

}

exports.test = test;
