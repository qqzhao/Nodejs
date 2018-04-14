const url = require('url');

function baseTest(req,res) {
	
	const action = req.query.action || 'none';
	console.log('action:',action);
	if (action === 'base') {
		res.send('base');
	}

	if (action === 'promise_then_res') {
		return promise_then_res(req,res);
	}

	res.send(action);
}

/*判断num是否大于0，大于0 正常返回*/
function compareA(num) {
	return new Promise((resolve,reject) => {
		if (num >= 0) {
			resolve(true);
		}else{
			reject(false);
		}
	})
}

/*
结果都输出 ： exception in promise_then_res 的原因：
从执行结果来看，行输出log，‘111’，然后输出‘222’，所以先执行下面的res.send函数。
*/
function promise_then_res(req,res) {
	
	const num = parseInt(req.query.num || 0);
	compareA(num).then((ret) => {
		console.log('bigger');
		return res.send('num is bigger or equal than zero');
	}, (ret) => {
		console.log('small');
		console.log('222');
		//console.log(res);
		res.send('num is smaller than zero');
	})

	console.log('111');
	// res.send('exception in promise_then_res');
}

exports.baseTest = baseTest;