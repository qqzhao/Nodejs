var https = require('https');

/** 同GET
这里设置环境变量，避免出现错误
错误 DEPTH_ZERO_SELF_SIGNED_CERT
*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function sendHttpsPost(argument){

	var data = {  
        address: 'test@test.com',  
        subject: "test"  ,
        aa: 'bb'
    };  

    data = require('querystring').stringify(data);  
	var options = {
	  hostname: '127.0.0.1',
	  port: 3011,
	  path: '/post',
	  method: 'POST',
	  headers: {  
            "Content-Type": 'application/x-www-form-urlencoded',  
            "Content-Length": data.length  
        }  
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

	req.write(data + "\n"); 

	req.end();

	req.on('error', (e) => {
	  console.error(e);
	});
}

//同：curl -k -d "aa=bb"  https://127.0.0.1:3011/post
//其中 -k 的作用也是关闭ssh验证。
sendHttpsPost();



