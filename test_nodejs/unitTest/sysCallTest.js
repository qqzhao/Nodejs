var sysc = require('../core/sys');
var co = require('co');
var excl = 'ls -l ' + '';

function test() {
	
	// testSync();
	//testSync2();
	// testSync3();
	// testSync4();
	//testSync5();
	//testAsync();
	testError();
}

function testSync() {
	// body...
	console.log('sync begin');
	sysc.sysCallSync(excl);
	console.log('sync end');
/*
注：这里没有产生同步的效果
sync begin
sync:ls -l
sync end
Server running at http://127.0.0.1:8888/
stdout:
 total 8
drwxr-xr-x  5 username  admin   170  8  6 14:44 core
drwxr-xr-x  4 username  staff   136  8  6 06:55 node_modules
drwxr-xr-x  2 username  admin    68  8  6 06:56 routes
-rw-r--r--  1 username  admin  1171  8  6 17:58 server.js
drwxr-xr-x  5 username  admin   170  8  6 17:44 unitTest

stderr
*/	
}

function testSync2() {
	// body...
	// console.log('sync begin');
	// yield sysc.sysCallSync(excl);
	// console.log('sync end');
/*
这样写会报编译错误。
因为yield必须在co中。
*/
}

function testSync3() {

	// return new Promise(function(resolve,reject){
	// 	console.log('sync begin');
	// 	yield sysc.sysCallSync(excl);
	// 	console.log('sync end');
	// })
/*
这样写会报编译错误。
同上。
*/
}

function testSync4() {
	var gen = function *(){
		console.log('sync begin');
		sysc.sysCallSync(excl);
		console.log('sync end');
	}

	co(gen);
/*
结果同样是异步的，因为没有yield。
sync begin
sync:ls -l
sync end
Server running at http://127.0.0.1:8888/
stdout:
 total 8
drwxr-xr-x  5 username  admin   170  8  6 14:44 core
drwxr-xr-x  4 username  staff   136  8  6 06:55 node_modules
drwxr-xr-x  2 username  admin    68  8  6 06:56 routes
-rw-r--r--  1 username  admin  1171  8  6 17:58 server.js
drwxr-xr-x  5 username  admin   170  8  6 17:44 unitTest

stderr

*/	
}

function testSync5() {
	var gen = function *(){
		console.log('sync begin');
		var ret = yield sysc.sysCallSync(excl);
		console.log(ret);
		console.log('sync end');
	}

	co(gen);
/*
正确结果
(注意这里还需要正确的resolve结果，否则不执行下面的。)
sync begin
sync:ls -l
Server running at http://127.0.0.1:8888/
stdout:
 total 8
drwxr-xr-x  5 username  admin   170  8  6 14:44 core
drwxr-xr-x  4 username  staff   136  8  6 06:55 node_modules
drwxr-xr-x  2 username  admin    68  8  6 06:56 routes
-rw-r--r--  1 username  admin  1171  8  6 17:58 server.js
drwxr-xr-x  5 username  admin   170  8  6 17:44 unitTest

stderr

////////////////////
sync begin
sync:ls -l
Server running at http://127.0.0.1:8888/
stdout:
 total 8
drwxr-xr-x  5 username  admin   170  8  6 14:44 core
drwxr-xr-x  4 username  staff   136  8  6 06:55 node_modules
drwxr-xr-x  2 username  admin    68  8  6 06:56 routes
-rw-r--r--  1 username  admin  1171  8  6 17:58 server.js
drwxr-xr-x  5 username  admin   170  8  6 17:44 unitTest

stderr

sysCallSync success
sync end
*/
}

function testAsync() {
	// body...
	console.log('async begin');
	sysc.sysCall(excl);
	console.log('async end');
/*out:
async begin
ls -l
async end
Server running at http://127.0.0.1:8888/
stdout:
 total 8
drwxr-xr-x  5 username  admin   170  8  6 14:44 core
drwxr-xr-x  4 username  staff   136  8  6 06:55 node_modules
drwxr-xr-x  2 username  admin    68  8  6 06:56 routes
-rw-r--r--  1 username  admin  1171  8  6 17:58 server.js
drwxr-xr-x  5 username  admin   170  8  6 17:44 unitTest

stderr
*/
}

function testError() {
	// body...
	var gen = function *(){
		var excl2 = excl + 'aa';
		console.log('Error begin');
		var ret ;
		try{
			ret = yield sysc.sysCallSync(excl2);
		}catch(e){
			console.log('catch:',e);
		}
		console.log('Error end');
	}

	co(gen);
/*
正确输出：
Error begin
sync:ls -l aa
Server running at http://127.0.0.1:8888/
err:
 { [Error: Command failed: /bin/sh -c ls -l aa
ls: aa: No such file or directory
]
  killed: false,
  code: 1,
  signal: null,
  cmd: '/bin/sh -c ls -l aa' }
catch: error occur
Error end
*/	
}

exports.test = test;

