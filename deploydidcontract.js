"use strict";

const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:1111");
const ks = require("./ks");

const acc = web3.eth.accounts.decrypt(ks.kstore, ks.kpass);

console.log("===>", acc.address);
// const ctrt = require("./ctrt");

const contract=new web3.eth.Contract([
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "didDocument",
				"type": "string"
			}
		],
		"name": "operationDID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "leftGas",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]);


const cdata="0x608060405234801561001057600080fd5b50610222806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063d315e83114610030575b600080fd5b61004a60048036038101906100459190610139565b61004c565b005b6000601690506000602090506000602090506100666100af565b6000805a90506000879050858151019250848484838a86fa61008757600080fd5b60018460006001811061009657fe5b6020020151146100a557600080fd5b5050505050505050565b6040518060200160405280600190602082028036833780820191505090505090565b60006100e46100df846101ab565b61017a565b9050828152602081018484840111156100fc57600080fd5b6101078482856101db565b509392505050565b600082601f83011261012057600080fd5b81356101308482602086016100d1565b91505092915050565b60006020828403121561014b57600080fd5b600082013567ffffffffffffffff81111561016557600080fd5b6101718482850161010f565b91505092915050565b6000604051905081810181811067ffffffffffffffff821117156101a1576101a06101ea565b5b8060405250919050565b600067ffffffffffffffff8211156101c6576101c56101ea565b5b601f19601f8301169050602081019050919050565b82818337600083830152505050565bfefea2646970667358221220bf07c289250300beeee8cd1726ef20a07bb00e407bf73e6cdb07c83efa60e21c64736f6c63430007060033"


const data = contract.deploy({data: cdata}).encodeABI();
const tx = {data: data, gas: "2000000", gasPrice: "2000000000"};

acc.signTransaction(tx).then((stx) => {
	console.log("sign over", stx.rawTransaction)
    web3.eth.sendSignedTransaction(stx.rawTransaction).on("transactionHash", console.log)
        .then(console.log)
        .catch(console.log);
}).catch(console.log);
