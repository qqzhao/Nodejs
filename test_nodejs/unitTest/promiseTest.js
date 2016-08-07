var co = require('co');

/*
结论： promise和co返回结果的可以使用then函数。
*/
function test() {
	// body...
	//正常输出：bbb aaa
	promiseLog('bbb').then(function (){
		console.log('aaa');
	})

	//下面代码会报错...
	//Cannot read property 'then' of undefined
	// normalLog('ccc').then(function(){
	// 	console.log('ddd');
	// })

	//同上，下面代码会报同样的错误。
	// coFunc2('eee').then(function(){
	// 	console.log('fff');
	// })

	coFunc('ggg').then(function(){
		console.log('hhh');
	})

/*output:
注意这里的输出，ggg在aaa之前，因为是异步执行的。
bbb
ggg
aaa
hhh
*/	
}

function promiseLog(message) {
	return new Promise(function (resolve,reject) {
		console.log(message);
		resolve('');
	});
}

function normalLog(message) {
	console.log(message);
}

function coFunc(message){

	var gen = function *(){
		yield promiseLog(message);
	}

	return co(gen);
}

function coFunc2(message){

	var gen = function *(){
		yield promiseLog(message);
	}

	co(gen);
}

exports.test = test;

