
const process = require('process');
const consumer = require("./consumerCommon");

try{
    consumer("./create.csv")
}
catch(err) {
    console.log(" ##### never will be here consumer ",err)
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    console.log(err.stack);
});