var downloadTest = require('./downloadTest');
var sysCallTest = require('./sysCallTest');
var promiseTest = require('./promiseTest');

function test() {
	downloadTest.test();
	//sysCallTest.test();
	// promiseTest.test();
}

exports.test = test;