var fs = require('fs');


const sendmigrateDIDTX = require("../sendmigratedidtx")


//sendAllMigrateDIDTXs(file);


function recurseSendMigrateDIDTX(payloads,index) {
    // web3.eth.getTransactionCount(acc).then((index) =>
    //{
        console.log("######## getTransactionCount");
        console.log("lbq index", index);

        if (index >= payloads.length){
            return
        }
        var payloadStr = "";
        var txid = "";

        payloadStr = payloads[index][1];
        txid = payloads[index][0];
        console.log("#### nonce",index, " txid ", txid)
        console.log("payloadStr", payloadStr)
        sendmigrateDIDTX(payloadStr, index,payloads, recurseSendMigrateDIDTX)
    //});

   // nonce++;
}

//async
module.exports = async function sendAllMigrateDIDTXs(file) {
    var createDIDTxPayloads = readOneFileToArr(file)//"./create.csv"
    // var nonce =0
    // for (let payload of createDIDTxPayloads) {
    //     //await sleep(1000);
    //     sleep(10);
    //     var payloadStr = "";
    //     var txid = "";
    //
    //     payloadStr = payload[1];
    //     txid = payload[0];
    //     //console.log("#### nonce",nonce, " txid ", txid)
    //     //console.log("payloadStr", payloadStr)
    //     sendmigrateDIDTX(payloadStr, nonce)
    //     nonce++;
    // }
    // for (var i = 0; i < rows.length; i++) {
    //
    // }
    recurseSendMigrateDIDTX(createDIDTxPayloads, 0)
}

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        // 使用  continue 实现；
        continue;
    }
}

// const sleep = function (ms){
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

function readOneFileToArr(filePath) {
    const table = []

    var rows = new Array();
    const result = fs.readFileSync(filePath, 'utf-8');
    rows = result.split("\n");
    for (var i = 0; i < rows.length; i++) {
        const innterTable =[]
        var pos=rows[i].indexOf(",");
        var hash = "";
        var payloadStr = "";
        hash= rows[i].substring(0,pos)
        payloadStr= rows[i].substring(pos+1,rows[i].length)
        innterTable.push(hash);
        innterTable.push(payloadStr)
        table.push(innterTable);
    }
    return table;
}