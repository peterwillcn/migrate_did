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


function writeFile(file, data){
    fs.writeFile(file, data, function (error) {
        if (error) {
            console.log('写入失败'+file)
        } else {
            console.log('写入成功了'+file)
        }
    })
}
function removeSame(payloads){
    const resultTable = []
    const maxPayloadSize =32*1024 -1024

    for (let payload of payloads) {
        var payloadStr = "";
        var txid = "";

        payloadStr = payload[1];
        txid = payload[0];
        if (resultTable.length == 0){
            if (payloadStr.length <=maxPayloadSize ){
                resultTable.push(payload);
            }
        }else{
            if (payloadStr.length >maxPayloadSize ){
                continue;
            }
            var payloadStrInner = "";
            var txidInner = "";
            var needPush =true;
            for (let payloadInner of resultTable){
                txidInner= payloadInner[0];
                payloadStrInner =payloadInner[1]
                if (payloadStr == payloadStrInner){
                    console.log("排重", "txid", txid, "txidInner ", txidInner);
                    needPush = false
                    break;
                }
            }
            if (needPush){
                resultTable.push(payload);
            }
        }

        //console.log("#### nonce",nonce, " txid ", txid)
        //console.log("payloadStr", payloadStr)

    }
    return resultTable;
}

//async
module.exports =  function sendAllMigrateDIDTXs(file) {
    var createDIDTxPayloads = readOneFileToArr(file)//"./create.csv"
    //writeFile("mult.txt", createDIDTxPayloads)
    result = removeSame(createDIDTxPayloads);
    //writeFile("single.txt", result)

    recurseSendMigrateDIDTX(result, 0)
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