var fs = require('fs');


const sendmigrateDIDTX = require("../sendmigratedidtx")

var dirtyTxIDs =[
    "537134a05991eb5f048c20e70107eea254b3b08626b4a830bb0e1b9fab14d15e",
    "cf9e4038c7fd01033a89f95be8af50a3e7e7c5e1100863e6dff4fe8d76fcf731",
    "7808e3e3e4d66588b09428e18f42e29e6f22531d5a0fea7cfcf13b18fbcfa8a6",
    "75f4d0578a34bb4b4075eeac78c734b4e6d19d78fed21663a2c6f64b8862f7c9",
    "b0a87d0e2fa26254818087310d9fc1d9bdefa0df0e7ad654ca439d8e22fdf2aa",
    // //update
    // "21e377eb4e4909e4381d4ed845b194ec0dad384df778b8ac5424996be4dbaf5d",
    // "13944def007d4d37872b4459e3cff1300e2c605724a50b06ce7b627e829a02ac",
    // "77e2f873dc7df544270fb0ab276208cbb2762559410ffe5ac3977dca8368c783",
    // "67c0c90c6877225b654f33e2ca65cff4393b8afc84cadb8ed37bbf9abca6fdb0",
    // //
    // "2a6ee7eb71c70a6d3b29e531ae92afc22199f9785baebc6e292f337afa22b3a4",
    // "418527e47abb226ef47a79c5e7e33bd8486a3689f994fad30ff98e08b05d4625",
    // "90ce5f48ee457320980627fdfdb135b067e14837bb7186a74e4905aa2a625855",
    // "f34957b55f3f2716731452363bf3b14284383af1586562cd34c7a6469832d23c",
    // "aca12e84fe986314c16efffaa2e45321c3a527f66a4a1d0c08662b9016c1fbca",
    // "38a6e7f2a0095d944aa9d31bf258237c3730f5ea0e03ca71f0e137a013a2e2cc",
    // "16f303deea1996904f4c0ea98248ef8e622e73ac1a7f884e6b52080cf8598bfe",
    // "9143b53f6532e6d987cd3f795c84dfb333d8446539c421f8e1f51a53174afe4b",
    // "3a95658fcb1fc3787467b199f79a69f9d3ca4201038fc904b26c61644c4acd0f",
    // "816ea32ec4566559eef034e9a3b37dbf5ab1b80cb2d66943c877b4a089b0a4d3",
    // "559f7e67eaaf32784a63a254ff16bf667fa1c097bb1a2c01955e667e75378e61",
    // "9748a7571d98733d04fb4a0d17d7fb26e4ffc0c5d834f81dad8afff9fa07ea90",
    // "a91f7e771d55e8c5445f4bd13b5354d87668e01b00d1e5940dfb74776e831708",
    // "e412d04f22f72c575fa3ddc05cd4c4f74042e2cf701eb49b8170187a9152c20e",
    // "a92e03f095af4a76a6bc2d6c67cad598cb37a18c0aec99e24016568382720ff0",
    // "c97d3209606c72fa55dc153ced1d7a99a20c3e130a0a507c3a37d4309b6516e4",
    // "12b075cdc838df53d0c46532e5527daaacf488ecf84a5df63f0dfec7f5b8c708",
    // "1ceb25bb3afec6c3d5be6d40bcae5ea5cd9b0d62a110abf68512242b08e241a6",
    // "4c87b6e71af1fb15e1190c2317de29359cef780318c5b4a31cd135764383d316",
    // "3b9c8b6330f858883b4f4a9fe3d36ae96be5ae74aaf1c03fefd45259130915c1",
    // "c1afb093669d0ff4364c4599b57fdfa7b1f735911c0952e0b53c1f2cac28f7ec",
    // "4aad7c1577e547ff25cde5c36ee146e0b32ad04329893eb5e81d20694cddc75b",
    // "1017c53b7d70cb52e2159b770283e2cc9fb75c155552672a6c7898c2a0576986",
    // "8495f3f6ede790e3550c16ace68ce8ed6e118e05b55d64349495a6730ff2e594",
    // "a4b47e980b25e9a99bf50560b2abb396093da40f2da7f890b33f7829a18fdf8b",
    // "c3e058794802127897dbf59d358d0f3b84fcd2da9248bdce72d404af01f13318",
    // "130d0753012bd47f44ea8615c953c470ac358d00245a65fbf66fbd3463de470c",
    // "87081d9c5fe364171ea8e55692350e68a346a61772104aba58ae37470fca81c3",
    // "39ace6e26c29062807c9ff2c5dcc65930331943f2dcdd105c8bf5576e53fe48d",
    // "81b84bfed75475bebce94dc2668fab9ac95e3e987b9f3b89e6c29e33a48fd51e",
    // "d9b7c9dddeaf6a55604dd1819edf239d0c765d5431e7d95338bade4a742ba395",
    // "2626250278b56a940deacca75e7a28b4c6f81aa839babecd7bd61fc227b0f904",
    // "e1083c6e1693d3c301bbc93219496740ff10a253faef6f5e9bac1a9bc2d97365",
    // "33b1b547a935e7dba718d9baa1ee6a1d56580246e84460a8382e021102dee698",
    // "90dabb39552f1460ca7a660bddaf4d8382b999c57a738fc9150343572ec721e5",
    // "d15260cfac69cae406bbb519852eb0d60dfbf4f44916001771f45d707cccec9d",
    // "0e0c78b208001f037df7058bddddcc3b3762cf9169aeae711f88c3d4f0e7cbc7",
    // "bf54748adaafa3193641172d330688856926f17b35d25ea63925f6ec2fae0fd8",
    // "07853821b1446097faa92d1fa9af0dad0f0a1a8855e27d928c7a38a8d9b06804",
    // "9c49872aec88d622dd5f46e8b0be822e382af5cc7627301ce32a36802dd418a8",
    // "2956ff548ee697902cf7077d36b6495d55d7fcf946a6e72f03fec36b9e0629e0",

]


//sendAllMigrateDIDTXs(file);


function recurseSendMigrateDIDTX(payloads,nonce,index) {
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
        sendmigrateDIDTX.sendMigrateDIDTX(payloadStr, nonce,index,payloads, recurseSendMigrateDIDTX)
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