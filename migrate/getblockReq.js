var http=require('http');
const sendmigrateDIDTX = require("../sendmigratedidtx")


//RegisterDID types.TxType = 0x0a
const RegisterDID = 0x0a

//
function isDIDTx(txType)  {
    if (txType== RegisterDID){
        return true
    }
    return false
}

function dealBlock(block) {
    console.log("dealBlock begin",block.height);
    for(var i = 0; i < block.tx.length; i++) {
        if (isDIDTx(block.tx[i].type)){
            console.log("############第 ",i ,"个交易",block.tx[i])
            sendmigrateDIDTX(block.tx[i].payload)
        }
    }
    console.log("dealBlock end");
}

module.exports = function getblockReq(blockHash) {
    console.log('-----getblockReq begin-----');
    var body = {
        "method": "getblock",
        "params": {
            "blockhash" :blockHash,
            "verbosity" : 2
        }
    };
    var bodyString = JSON.stringify(body);
    console.log('-----getblockReq bodyString-----', bodyString);

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
            //console.log('-----getblockReq######data-----',data);
            responseString += data;
        });

        res.on('end', function() {
            var resultObject = JSON.parse(responseString);
            curBlock =  resultObject.result
            dealBlock(curBlock)
        });
        req.on('error', function(e) {
            // TODO: handle error.
            console.log('-----getblockReq error-------',e);
        });
    });

    console.log('-----getblockReq blockHash-----' +blockHash);
    //console.log('-----getblockReq before req.write-----');
    req.write(bodyString);
    req.end();
    console.log('-----getblockReq end-----');
}
