var fs = require('fs');


const sendmigrateDIDTX = require("../sendmigratedidtx")

var dirtyTxIDs =[
    "537134a05991eb5f048c20e70107eea254b3b08626b4a830bb0e1b9fab14d15e",
    "cf9e4038c7fd01033a89f95be8af50a3e7e7c5e1100863e6dff4fe8d76fcf731",
    "7808e3e3e4d66588b09428e18f42e29e6f22531d5a0fea7cfcf13b18fbcfa8a6",
    "75f4d0578a34bb4b4075eeac78c734b4e6d19d78fed21663a2c6f64b8862f7c9",
    "b0a87d0e2fa26254818087310d9fc1d9bdefa0df0e7ad654ca439d8e22fdf2aa",
//    "a2372d950c0da9a5d215245e575660d78fe287fc67c446ab2af95661cc18f4ce",
//    "15eb789472352fa2f411a4f09db70a754a82d46ad2d600e38df77c051c6262cf",
//    "914d675c4365cecc52c71229c361b067cb321c31ea87e89291f850c09d4ccb39",
//    "605d9e31677b16da593509519a38b136f531dd18569fc09be97d58b11973b6db",
//    "fe8b0c6ae362cd2e748b03a70af68aa93aac5dadfaeb9585f788acc5f95d6957",
//    "a1e10d1031c86643932296c53e278b3cc7c8ddeb9413f2fe4adf26c473ca397e",
//    "5ad80a5c352d07874bf4044c6f64b35d2df6a923bad05e21d84ed6ea157f86da",
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
    //const maxPayloadSize =80*1000*1000 -1024
    const maxPayloadSize= 600 *1024
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
    console.log("before remove Same ", createDIDTxPayloads.length);
    //sort
    //createDIDTxPayloads.sort(len_sort);
    //writeFile("mult.txt", createDIDTxPayloads)
    result = removeSame(createDIDTxPayloads);
    console.log("after remove Same ", result.length);
   // console.log("result ", result);

    //result = exludDirtyData(result)
    console.log("after exludDirtyData ", result.length);
   // console.log("result ", result);

    //writeFile("single.txt", result)

    sendmigrateDIDTX.getTransactionCount(function (nonce) {
	var t1 = new Date().getTime();
        console.log("sendAllMigrateDIDTXs getTransactionCount nonce", t1, nonce)
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
