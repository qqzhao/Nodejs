
### 1. app2.js

复制的/bin/www 文件

### 2. npm app2.js // npm start

同时可以使用http和https效果一样

### 3. https的post数据同http的post数据的方法

### 4. 命令

```
openssl genrsa -out privatekey.pem 1024
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```

