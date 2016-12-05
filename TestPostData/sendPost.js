var http = require('http');

var port = 3000;
var postPath = '/postdata'
function sendPostData(argument) {
	var data = {  
        address: 'test@test.com',  
        subject: "test"  
    };  
  
    data = require('querystring').stringify(data);  
    console.log('sendPostData: ',data);  
    var opt = {  
        method: "POST",  
        host: "localhost",  
        port: port,  
        path: postPath,  
        headers: {  
            "Content-Type": 'application/x-www-form-urlencoded',  
            "Content-Length": data.length  
        }  
    };  
  
    var req = http.request(opt, function (serverFeedback) {  
        if (serverFeedback.statusCode == 200) {  
            var body = "";  
            serverFeedback.on('data', function (data) { body += data; })  
                          .on('end', function () { 
                          	var data = JSON.parse(body);
                          	console.log('received data : ',data);
                          });  
        }  
        else {  
            console.log('error occur');
        }  
    });  
    req.write(data + "\n");  
    req.end();  
}

function sendPostData2(argument) {
	var data = {  
        address: 'test@test.com',  
        subject: "test"  
    };  
  
    data = JSON.stringify(data); 
    console.log('sendPostData: ',data);  
    var opt = {  
        method: "POST",  
        host: "localhost",  
        port: port,  
        path: postPath,  
        headers: {  
            "Content-Type": 'application/json',  
            "Content-Length": data.length  
        }  
    };  
  
    var req = http.request(opt, function (serverFeedback) {  
        if (serverFeedback.statusCode == 200) {  
            var body = "";  
            serverFeedback.on('data', function (data) { body += data; })  
                          .on('end', function () { 
                          	var data = JSON.parse(body);
                          	console.log('received data : ',data);
                          });  
        }  
        else {  
            console.log('error occur');
        }  
    });  
    req.write(data + "\n");  
    req.end();  
}


// sendPostData();
sendPostData2();


/*
    require('querystring'):是类似于url编码的格式
    sendPostData:  address=test%40test.com&subject=test

    JSON.stringify：JSON数据格式。
    sendPostData:  {"address":"test@test.com","subject":"test"}
    */

