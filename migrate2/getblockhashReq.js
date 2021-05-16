var http=require('http');

const getBlockRQ = require("./getblockReq")
const config = require("./config");

module.exports = function getblockhashReq(height,nonce) {
    //console.log('-----getblockhashReq begin-----', height, "nonce", nonce);
    var body = {
        "method": "getblockhash",
        "params": {"height" :height}
    };
    var bodyString = JSON.stringify(body);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
    };
    var options = {
        host: config.source_host,//api.elastos.io
        port: config.source_port,//20606
        path: '/Config',
        method: 'POST',
        headers: headers
    };

    var req=http.request(options,function(res){
        res.setEncoding('utf-8');
        var responseString = '';
        res.on('data', function(data) {
            //console.log('-----getblockhashReq######data-----',data);
            responseString += data;

        });

        res.on('end', function() {
           // console.log('-----getblockhashReq######end-----',responseString);
            //这里接收的参数是字符串形式,需要格式化成json格式使用
            var resultObject = JSON.parse(responseString);
            //console.log('-----getblockhashReq resBody-----',resultObject);
            curBlockHash =  resultObject.result
            //console.log('-----getblockhashReq curBlockHash-----',curBlockHash);
            getBlockRQ(curBlockHash, nonce)
        });
        req.on('error', function(e) {
            // TODO: handle error.
            console.log('-----getblockhashReq error-------',e);
        });
    });
    req.write(bodyString);
    req.end();
}
