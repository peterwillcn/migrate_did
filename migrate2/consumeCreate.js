var fs = require('fs');


const sendmigrateDIDTX = require("../sendmigratedidtx")

var createDIDTxPayloads = readOneFileToArr("./create.csv")

sendAllMigrateDIDTXs();

//async
function sendAllMigrateDIDTXs() {
    var nonce =0
    for (let payload of createDIDTxPayloads) {
        var payloadStr = "";
        payloadStr = payload[1];
        console.log("payload",payload)
        sendmigrateDIDTX(payloadStr, nonce)
        nonce++;
        //await sleep(10);
    }
}

const sleep = function (ms){
    return new Promise(resolve => setTimeout(resolve, ms))
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