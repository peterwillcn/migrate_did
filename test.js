Web3 = require("web3");
web3 = new Web3("http://52.80.107.251:1111");
// web3 = new Web3("http://127.0.0.1:1111");

contract = new web3.eth.Contract([
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"name": "publishDidTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]);
//did合约地址
contract.options.address = "0x8b2324fd40a74843711C9B48BC968A5FAEdd4Ef0";

// contract.options.address = "0x8b2324fd40a74843711C9B48BC968A5FAEdd4Ef0";

//账号
acc = web3.eth.accounts.decrypt({"address":"53781e106a2e3378083bdcede1874e5c2a7225f8","crypto":{"cipher":"aes-128-ctr","ciphertext":"bc53c1fcd6e31a6392ddc1777157ae961e636c202ed60fb5dda77244c5c4b6ff","cipherparams":{"iv":"c5d1a7d86d0685aa4542d58c27ae7eb4"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"409429444dabb5664ba1314c93f0e1d7a1e994a307e7b43d3f6cc95850fbfa9f"},"mac":"4c37821c90d35118182c2d4a51356186482662bb945f0fcd33d3836749fe59c0"},"id":"39e7770e-4bc6-42f3-aa6a-c0ae7756b607","version":3}, "123");  

//创建did payload

createDID = '{"header":{"specification":"elastos/did/1.0","operation":"create"},"payload":"ewogICAgICAgICJpZCIgOiAiZGlkOmVsYXN0b3M6aVRXcWFuVW92aDN6SGZuRXhHYWFuNFNKQVhHM0RDWkM2aiIsCiAgICAgICAgInB1YmxpY0tleSI6W3sgImlkIjogImRpZDplbGFzdG9zOmlUV3FhblVvdmgzekhmbkV4R2FhbjRTSkFYRzNEQ1pDNmojZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgInR5cGUiOiJFQ0RTQXNlY3AyNTZyMSIsCiAgICAgICAgICAgICAgICAgICAgICAgImNvbnRyb2xsZXIiOiJkaWQ6ZWxhc3RvczppY0o0ejJEVUxySEV6WVN2aktOSnBLeWhxRkR4dllWN3BOIiwKICAgICAgICAgICAgICAgICAgICAgICAicHVibGljS2V5QmFzZTU4Ijoienh0Nk55b29yRlVGTVhBOG1EQlVMam51SDN2NmlOZFptNDJQeUc0YzFZZEMiCiAgICAgICAgICAgICAgICAgICAgICB9LAoJCQkJCXsKCQkJCQkgICAiaWQiOiAiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiNtYXN0ZXIiLAoJCQkJCSAgICJ0eXBlIjoiRUNEU0FzZWNwMjU2cjEiLAoJCQkJCSAgICJjb250cm9sbGVyIjoiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiIsCgkJCQkJICAgInB1YmxpY0tleUJhc2U1OCI6InpOeG9aYVpMZGFja1pRTk1hczdzQ2tQUkhac0ozQnRkakV2TTJ5NWdOdktKIgoJCQkJICAgfQogICAgICAgICAgICAgICAgICAgIF0sCiAgICAgICAgImF1dGhlbnRpY2F0aW9uIjpbImRpZDplbGFzdG9zOmljSjR6MkRVTHJIRXpZU3ZqS05KcEt5aHFGRHh2WVY3cE4jZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgImlkIjogImRpZDplbGFzdG9zOmljSjR6MkRVTHJIRXpZU3ZqS05KcEt5aHFGRHh2WVY3cE4jZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICJjb250cm9sbGVyIjoiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAicHVibGljS2V5QmFzZTU4Ijoiek54b1phWkxkYWNrWlFOTWFzN3NDa1BSSFpzSjNCdGRqRXZNMnk1Z052S0oiCiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgIF0sCiAgICAgICAgImF1dGhvcml6YXRpb24iOlsiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiNkZWZhdWx0Il0sCiAgICAgICAgImV4cGlyZXMiIDogIjIwMjMtMDItMTBUMTc6MDA6MDBaIgoJfQ","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j#default","signature":"1whEYxQs7ZxxnghS9sSoK7l5e2VxXJZAACkAK1UY2e-7gDzE4iL6tWQLgPY5k8GL_-gSFIiyAnTbNF5kcbuMUA"}}'

updateDID = '{"header":{"specification":"elastos/did/1.0","operation":"update","previousTxid":"0xb03b1d571079c0be72757102822e7277fe74195112589315f9996785d6975d31"},"payload":"ewogICAgICAgICJpZCIgOiAiZGlkOmVsYXN0b3M6aVRXcWFuVW92aDN6SGZuRXhHYWFuNFNKQVhHM0RDWkM2aiIsCiAgICAgICAgInB1YmxpY0tleSI6W3sgImlkIjogImRpZDplbGFzdG9zOmlUV3FhblVvdmgzekhmbkV4R2FhbjRTSkFYRzNEQ1pDNmojZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgInR5cGUiOiJFQ0RTQXNlY3AyNTZyMSIsCiAgICAgICAgICAgICAgICAgICAgICAgImNvbnRyb2xsZXIiOiJkaWQ6ZWxhc3RvczppY0o0ejJEVUxySEV6WVN2aktOSnBLeWhxRkR4dllWN3BOIiwKICAgICAgICAgICAgICAgICAgICAgICAicHVibGljS2V5QmFzZTU4Ijoienh0Nk55b29yRlVGTVhBOG1EQlVMam51SDN2NmlOZFptNDJQeUc0YzFZZEMiCiAgICAgICAgICAgICAgICAgICAgICB9LAoJCQkJCXsKCQkJCQkgICAiaWQiOiAiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiNtYXN0ZXIiLAoJCQkJCSAgICJ0eXBlIjoiRUNEU0FzZWNwMjU2cjEiLAoJCQkJCSAgICJjb250cm9sbGVyIjoiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiIsCgkJCQkJICAgInB1YmxpY0tleUJhc2U1OCI6InpOeG9aYVpMZGFja1pRTk1hczdzQ2tQUkhac0ozQnRkakV2TTJ5NWdOdktKIgoJCQkJICAgfQogICAgICAgICAgICAgICAgICAgIF0sCiAgICAgICAgImF1dGhlbnRpY2F0aW9uIjpbImRpZDplbGFzdG9zOmljSjR6MkRVTHJIRXpZU3ZqS05KcEt5aHFGRHh2WVY3cE4jZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgImlkIjogImRpZDplbGFzdG9zOmljSjR6MkRVTHJIRXpZU3ZqS05KcEt5aHFGRHh2WVY3cE4jZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICJjb250cm9sbGVyIjoiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAicHVibGljS2V5QmFzZTU4Ijoiek54b1phWkxkYWNrWlFOTWFzN3NDa1BSSFpzSjNCdGRqRXZNMnk1Z052S0oiCiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgIF0sCiAgICAgICAgImF1dGhvcml6YXRpb24iOlsiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiNkZWZhdWx0Il0sCiAgICAgICAgImV4cGlyZXMiIDogIjIwMjMtMDItMTBUMTc6MDA6MDBaIgoJfQ","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j#default","signature":"G5a7KK06lNTMvuOxmfhQ6FU2WLeQpi1WjGjcrRF-09PEtejQLospWUxg6mArjOC0WPx3jHFGF_cIx71qzKpL2g"},"DIDDoc":{"id":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j","publicKey":[{"id":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j#default","type":"ECDSAsecp256r1","controller":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN","publicKeyBase58":"zxt6NyoorFUFMXA8mDBULjnuH3v6iNdZm42PyG4c1YdC"},{"id":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN#master","type":"ECDSAsecp256r1","controller":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN","publicKeyBase58":"zNxoZaZLdackZQNMas7sCkPRHZsJ3BtdjEvM2y5gNvKJ"}],"authentication":["did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN#default",{"controller":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN","id":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN#default","publicKeyBase58":"zNxoZaZLdackZQNMas7sCkPRHZsJ3BtdjEvM2y5gNvKJ","type":"ECDSAsecp256r1"}],"authorization":["did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN#default"],"expires":"2023-02-10T17:00:00Z"},"CredentialDoc":null,"Ticket":null}'

//停用id payload
deactiveDID = '{"header":{"specification":"elastos/did/1.0","operation":"deactivate"},"payload":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j#default","signature":"p33_nbN8xqfbyAnedKJNjYqQDuWnfqhn5NXiFqkd_ASujcj7xn3hu0fM2dnUvpm1S5lUWtNn-bIinO4Qt4TH3w"},"DIDDoc":null,"CredentialDoc":null,"Ticket":null}'


cdata  = contract.methods.publishDidTransaction(createDID).encodeABI();


tx = {data: cdata, to: contract.options.address, from: acc.address, gasPrice: "1000000000000"}

web3.eth.sendTransaction(tx).then(console.log)

// acc.signTransaction(tx).then((res)=>{
// 	console.log("coming");
// 	stx = res;
// 	console.log(stx.rawTransaction);
// 	web3.eth.sendSignedTransaction(stx.rawTransaction).then(console.log)
// });


// acc = web3.eth.accounts.decrypt({"address":"6ff1e677a6e128157a8d2d7498f7e863f67d592c","id":"c2a1822b-c0fb-4921-9a63-aa1a016e8379","version":3,"crypto":{"cipher":"aes-128-ctr","ciphertext":"6fb41d89389a2b30e7b3011b5d6c167836b21df9deb38a2e60a274be0ead4f54","cipherparams":{"iv":"882aa44d1ec8a30a6fb292d7e778e67c"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"5987527a0a946830e8a9737e010393855ede9c1a8f6aaa3c9f8b34bdda599a6e"},"mac":"4f3c70d02ab2641147a999e064c6da796b1f6a080849bf67179c0923065b6305"}}, "password");  
// tx = {data: cdata, to: contract.options.address, from: acc.address, gas: 2000000, gasPrice: "1000000000000"}


// acc.signTransaction(tx).then((res)=>{
// 	console.log("coming");
// 	stx = res;
// 	console.log(stx.rawTransaction);
// 	web3.eth.sendSignedTransaction(stx.rawTransaction).then(console.log)
// });
