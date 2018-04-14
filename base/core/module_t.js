
function log(message) {
	console.log(message);
}

function logWithoutExport(message) {
	console.log(message);
}

function print(message){
	console.log(message);
}

exports.log = log;//test1

module.exports = print;//test2
