var http=require('http');
const fs = require('fs');

//const sendmigrateDIDTX = require("../sendmigratedidtx")


//RegisterDID types.TxType = 0x0a
const RegisterDID = 0x0a

//
function isDIDTx(txType)  {
    if (txType== RegisterDID){
        return true
    }
    return false
}

function isCreateDID(operation)  {
    if (operation== 'create'){
        return true
    }
    return false
}

function saveCreatePayload(txid, createPayloadStr)  {
    var csvContent = "";
    csvContent += txid + ',';
    csvContent += createPayloadStr + '\n';
    fs.appendFile('./create.csv', csvContent, function(err) {
        if (err){
            console.log(err, 'create ---->csv<--- block.tx[i].txid ', txid, "payloadStr ", createPayloadStr)
        }
    });
}

function saveUpdatePayload(txid, updatePayloadStr)  {
    var csvContent = "";
    csvContent += txid + ',';
    csvContent += updatePayloadStr + '\n';
    fs.appendFile('./update.csv', csvContent, function(err) {
        if (err) {
            console.log(err, 'update ---->csv<--- block.tx[i].txid ', txid, "payloadStr ", updatePayloadStr)
        }
    });
}


//payload:
//   { header: { specification: 'elastos/did/1.0', operation: 'create' },
function dealBlock(block,nonce) {
    if (!block)
        return
    console.log("dealBlock begin",block.height);
    for(var i = 0; i < block.tx.length; i++) {
        if (isDIDTx(block.tx[i].type)){
            payloadStr = JSON.stringify(block.tx[i].payload)
            if (isCreateDID(block.tx[i].payload.header.operation)){
                saveCreatePayload(block.tx[i].txid, payloadStr);
            }else{
                saveUpdatePayload(block.tx[i].txid, payloadStr);
            }
            //console.log("############第 ",i ,"个交易",block.tx[i])
            //sendmigrateDIDTX(block.tx[i].payload, nonce)

            // var csvContent = "";
            // csvContent += block.tx[i].txid + ',';
            // csvContent += payloadStr + '\n';
            // fs.appendFile('./data.csv', csvContent, function(err) {
            //     if (err) console.log(err, '---->csv<---')
            // });
        }
    }
    console.log("dealBlock end");
}

module.exports = function getblockReq(blockHash,nonce) {
   // console.log('-----getblockReq begin-----');
    var body = {
        "method": "getblock",
        "params": {
            "blockhash" :blockHash,
            "verbosity" : 2
        }
    };
    var bodyString = JSON.stringify(body);
    //console.log('-----getblockReq bodyString-----', bodyString);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
    };
    var options = {
        host: '127.0.0.1',//api.elastos.io
        port: 21606,//20606
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
            dealBlock(curBlock, nonce)
        });
        req.on('error', function(e) {
            // TODO: handle error.
            console.log('-----getblockReq error-------',e);
        });
    });

    //console.log('-----getblockReq blockHash-----' +blockHash);
    //console.log('-----getblockReq before req.write-----');
    req.write(bodyString);
    req.end();
   // console.log('-----getblockReq end-----');
}
