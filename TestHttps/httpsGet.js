const https = require('https');
var fs = require('fs');

// var getUrl = 'https://baidu.com';
var getUrl = 'https://127.0.0.1:3011';

/**
这里设置环境变量，避免出现错误
错误 DEPTH_ZERO_SELF_SIGNED_CERT
*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function sendHttpsGet(argument) {
	https.get(getUrl, (res) => {
	  console.log('statusCode:', res.statusCode);
	  console.log('headers:', res.headers);

	  res.on('data', (d) => {
	    process.stdout.write(d);
	  });

	}).on('error', (e) => {
	  console.error(e);
	});

}

function sendHttpsGet2(argument){
	var options = {
	  hostname: '127.0.0.1',
	  port: 3011,
	  path: '/',
	  method: 'GET',
	  key: fs.readFileSync('privatekey.pem'),
	  cert: fs.readFileSync('certificate.pem')
	};

	/*
		这里是定制Agent的用法，不是NODE_TLS_REJECT_UNAUTHORIZED选项设置的问题。
		https://nodejs.org/api/https.html
	*/
	//options.agent = new https.Agent(options);

	var req = https.request(options, (res) => {
	  console.log('statusCode:', res.statusCode);
	  console.log('headers:', res.headers);

	  res.on('data', (d) => {
	    process.stdout.write(d);
	  });
	});

	req.end();

	req.on('error', (e) => {
	  console.error(e);
	});
}

// sendHttpsGet();
sendHttpsGet2();

