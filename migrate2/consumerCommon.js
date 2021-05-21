var fs = require('fs');


const sendmigrateDIDTX = require("../sendmigratedidtx")

var dirtyTxIDs =[
    "537134a05991eb5f048c20e70107eea254b3b08626b4a830bb0e1b9fab14d15e",
    "cf9e4038c7fd01033a89f95be8af50a3e7e7c5e1100863e6dff4fe8d76fcf731",
    "7808e3e3e4d66588b09428e18f42e29e6f22531d5a0fea7cfcf13b18fbcfa8a6",
    "75f4d0578a34bb4b4075eeac78c734b4e6d19d78fed21663a2c6f64b8862f7c9",
    "b0a87d0e2fa26254818087310d9fc1d9bdefa0df0e7ad654ca439d8e22fdf2aa",
]



function recurseSendMigrateDIDTX(payloads,nonce,index) {
        console.log("######## getTransactionCount");
        console.log(" index", index);
        if (index >= payloads.length){
            return
        }
        var payloadStr = "";
        var txid = "";

        payloadStr = payloads[index][1];
        txid = payloads[index][0];
        console.log("#### nonce",index, " txid ", txid)
        console.log("payloadStr", payloadStr)
        sendmigrateDIDTX.sendMigrateDIDTX(payloadStr, nonce,index,payloads, recurseSendMigrateDIDTX)
}

function exludDirtyData(payloads){
    const resultTable = []

    for (let payload of payloads) {
        var txid = "";
        var needPush =true;
        txid = payload[0];
        for (let dirtyTxId of dirtyTxIDs){
            if (txid == dirtyTxId){
                needPush = false;
                break
            }
        }
        if (needPush){
            resultTable.push(payload);
        }
    }
    return resultTable;

}
function removeSame(payloads){
    const resultTable = []
    const maxPayloadSize =80*1000*1000 -1024
    //137170
    //const maxPayloadSize =137216
    //const maxPayloadSize =32*1024 -1024

    for (let payload of payloads) {
        var payloadStr = "";
        var txid = "";

        payloadStr = payload[1];
        txid = payload[0];
        if (resultTable.length == 0){

            if (payloadStr.length <=maxPayloadSize && payloadStr.length > 0){
                resultTable.push(payload);
            }
            if (payloadStr.length >maxPayloadSize ){
                console.log("calc_size txid ", txid, "payloadStr.length ", payloadStr.length);

                continue;
            }
        }else{
            if (payloadStr.length >maxPayloadSize ){
                console.log("calc_size txid ", txid, "payloadStr.length ", payloadStr.length);
                continue;
            }
            if(payloadStr.length == 0){
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
    }
    return resultTable;
}

function len_sort(a ,b) {
    return (a[1].length - b[1].length);
}
//async
module.exports =  function sendAllMigrateDIDTXs(file) {
    var createDIDTxPayloads = readOneFileToArr(file)//"./create.csv"
    //sort
    createDIDTxPayloads.sort(len_sort);
    //writeFile("mult.txt", createDIDTxPayloads)
    result = removeSame(createDIDTxPayloads);
    console.log("after remove Same ", result.length);
   // console.log("result ", result);

    result = exludDirtyData(result)
    console.log("after exludDirtyData ", result.length);
   // console.log("result ", result);

    //writeFile("single.txt", result)

    sendmigrateDIDTX.getTransactionCount(function (nonce) {
        console.log("sendAllMigrateDIDTXs getTransactionCount nonce", nonce)
        recurseSendMigrateDIDTX(result, nonce, 0)
    })

}

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