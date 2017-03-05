var sig = require('./TLSAPI');
var config = {
    "sdk_appid": 1400025910,
    "expire_after": 180 * 24 * 3600,
    "private_key": "./keys/private_key",
    "public_key": "./keys/public_key"
}

var sig = new sig.Sig(config);
console.log(sig.genSig("admin1"));
