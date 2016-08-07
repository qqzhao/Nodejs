var downloadTest = require('./downloadTest');
var sysCallTest = require('./sysCallTest');
var promiseTest = require('./promiseTest');
var moduleTest = require('./moduleTest');

function test() {
	downloadTest.test();
	//sysCallTest.test();
	// promiseTest.test();

	// moduleTest.test();
}

exports.test = test;