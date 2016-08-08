
const co = require('co');


function test() {

	// test1();
	test2();

}

//结论：co中catch可以捕获reject，一旦捕获就结束。
function test1() {
	
	var gen = function *() {
		
		try{

			var a = yield compareA(3);
			console.log(a);

			var b = yield compareA(1);
			console.log(b);

			var c = yield compareA(-2);
			console.log(c);

		}catch(e){
			console.log(e);
		}
	}

	co(gen);
}

//这种写法需要传到错误，所以并没有上面的方法简洁。
function test2(argument) {
	
	compareA(3).then((ret) => {
		console.log(ret);
		return compareA(-2);
	})

	.then((ret) => {
		console.log(ret);
		return compareA(3);
	},(err) => {
		console.log(err);
		//这里需要将错误结果往下传递
	})

	.then((ret) => {
		//这里还需要处理错误结果的情况。
		console.log('ttt:')
		console.log(ret);
	},(err) => {
		console.log(err);
	})
}


function compareA(inNum) {
	
	return new Promise( (resolve,reject) => {

		if (inNum > 0) {
			var str = 'success:' + inNum;
			resolve(str);
		}else{
			var str = 'failed in compareA: ' + inNum;
			reject(str);
		}
	})
}


exports.test = test;