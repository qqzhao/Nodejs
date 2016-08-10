const baseTest = require('../unitTest/baseTest').baseTest;

function route(app){
	app.get('/sayHello',sayHello);
	app.get('/test',baseTest);
}

function sayHello(req,res) {
	res.send('hello world!!');
}

exports.route = route;