var http=require('http');

//const getBlockRQ = require("./getblockReq")
//479015+2
const startBlockHeight =  276676//276676
const endBlockHeight =  startBlockHeight +200//0 //500082

const getblockhashRq = require("./getblockhashReq");

// function sleep(delay) {
//     var start = (new Date()).getTime();
//     while ((new Date()).getTime() - start < delay) {
//         // 使用  continue 实现；
//         continue;
//     }
// }

//async
async function callGetBlock(curBlockCount)  {
    var index = 0;
    for (var i = startBlockHeight ; i < curBlockCount; i++) {
        await sleep(10);
        getblockhashRq(i, index);
    }

}

const sleep = function (ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}



module.exports = function getblockhashReq(height) {
    //console.log('-----getblockhashReq begin-----', height);
    var body = {
        "method": "getblockcount","params": {}
    };
    var bodyString = JSON.stringify(body);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
    };
    var options = {
        host: 'api.elastos.io',
        port: 20606,
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
            //这里接收的参数是字符串形式,需要格式化成json格式使用
            var resultObject = JSON.parse(responseString);
            //console.log('-----resBody-----',resultObject);
            curBlockCount =  resultObject.result
            //test
           // curBlockCount =  endBlockHeight
            console.log('-----curBlockCount-----',curBlockCount);
            callGetBlock(curBlockCount);
        });
        req.on('error', function(e) {
            // TODO: handle error.
            console.log('-----getblockhashReq error-------',e);
        });
    });


    req.write(bodyString);
    req.end();

}