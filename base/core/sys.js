var cp = require('child_process');

function sysCall (commandStr){

	console.log(commandStr);
	cp.exec(commandStr, function(e, stdout, stderr) {　　
		if (!e) {　　　　
			console.log("stdout: \n",stdout);　　　　
			console.log("stderr \n",stderr);　　
		} else {
			console.log("err:\n",e);
		}
	});
}

function sysCallSync(commandStr) {
	return new Promise(function(resolve, reject){
		console.log('sync:' + commandStr);
		cp.exec(commandStr, function(e, stdout, stderr) {　　
			if (!e) {　　　　
				console.log("stdout: \n",stdout);　　　　
				console.log("stderr \n",stderr);　　
				resolve('sysCallSync success');
			} else {
				console.log("err:\n",e);
				reject('error occur');
			}
		});
	})
}

exports.sysCall = sysCall;
exports.sysCallSync = sysCallSync;