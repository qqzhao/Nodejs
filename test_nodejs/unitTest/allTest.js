var downloadTest = require('./downloadTest');
var sysCallTest = require('./sysCallTest');
var promiseTest = require('./promiseTest');
var moduleTest = require('./moduleTest');
var coTest = require('./coTest');

function test() {
	//downloadTest.test();
	//sysCallTest.test();
	// promiseTest.test();

	// moduleTest.test();
	coTest.test();
}

exports.test = test;