Web3 = require("web3");
web3 = new Web3("http://127.0.0.1:1111");

contract = new web3.eth.Contract([
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
//did合约地址
contract.options.address = "0x491bC043672B9286fA02FA7e0d6A3E5A0384A31A";

//账号
acc = web3.eth.accounts.decrypt({"address":"53781e106a2e3378083bdcede1874e5c2a7225f8","crypto":{"cipher":"aes-128-ctr","ciphertext":"bc53c1fcd6e31a6392ddc1777157ae961e636c202ed60fb5dda77244c5c4b6ff","cipherparams":{"iv":"c5d1a7d86d0685aa4542d58c27ae7eb4"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"409429444dabb5664ba1314c93f0e1d7a1e994a307e7b43d3f6cc95850fbfa9f"},"mac":"4c37821c90d35118182c2d4a51356186482662bb945f0fcd33d3836749fe59c0"},"id":"39e7770e-4bc6-42f3-aa6a-c0ae7756b607","version":3}, "123");  

//创建did payload
createDID = `{
    "header":{
        "specification":"elastos/did/1.0",
        "operation":"create"
    },
    "payload":"eyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJwdWJsaWNLZXkiOlt7ImlkIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5IiwidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY29udHJvbGxlciI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJwdWJsaWNLZXlCYXNlNTgiOiJrVFlRaE10b2ltbTl3VjN2eTRxOUVWeTRaMVd4UnF4aHZuZ3p0ZEdvMURtYyJ9XSwiYXV0aGVudGljYXRpb24iOlsiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Il0sInZlcmlmaWFibGVDcmVkZW50aWFsIjpbeyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWcjcHJvZmlsZSIsInR5cGUiOlsiU2VsZlByb2NsYWltZWRDcmVkZW50aWFsIl0sImlzc3VlciI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJpc3N1YW5jZURhdGUiOiIyMDIxLTAxLTI4VDA2OjM4OjM1WiIsImV4cGlyYXRpb25EYXRlIjoiMjAyNi0wMS0yOFQwNjozODozNVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJnZW5kZXIiOiJNYWxlIiwibGFuZ3VhZ2UiOiJFbmdsaXNoIiwibmFtZSI6IkpvaG4iLCJuYXRpb24iOiJTaW5nYXBvcmUiLCJ0d2l0dGVyIjoiQGpvaG4ifSwicHJvb2YiOnsidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY3JlYXRlZCI6IjIwMjEtMDEtMjhUMDY6Mzg6MzVaIiwidmVyaWZpY2F0aW9uTWV0aG9kIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Iiwic2lnbmF0dXJlIjoidWJSajNMNVp0LWZpUE4wT1dGLWZyQjlfZ2xHNWlHR1BFUzJKelNKWDhIX1M2bXotUnFQOTZzYXduYUVFdkN6Ym9NdHVnRlQxOXZTNC0xQnVLTlZRVGcifX1dLCJleHBpcmVzIjoiMjAyNi0wMS0yOFQwNjozODozNloiLCJwcm9vZiI6eyJ0eXBlIjoiRUNEU0FzZWNwMjU2cjEiLCJjcmVhdGVkIjoiMjAyMS0wMS0yOFQwNjozODozNVoiLCJjcmVhdG9yIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Iiwic2lnbmF0dXJlVmFsdWUiOiIwY1M3VV9NRDRjSF94Tlh3dWVwczVjenlucDRCbU1xeS02OWxURi1zeW5JOUJ0N010cnY3eE9aNXFPZXd3N0w1cHE4d2stVHVuamtfLU43aHFOSkZadyJ9fQ",
    "payload":"eyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJwdWJsaWNLZXkiOlt7ImlkIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5IiwidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY29udHJvbGxlciI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJwdWJsaWNLZXlCYXNlNTgiOiJrVFlRaE10b2ltbTl3VjN2eTRxOUVWeTRaMVd4UnF4aHZuZ3p0ZEdvMURtYyJ9XSwiYXV0aGVudGljYXRpb24iOlsiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Il0sInZlcmlmaWFibGVDcmVkZW50aWFsIjpbeyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWcjcHJvZmlsZSIsInR5cGUiOlsiU2VsZlByb2NsYWltZWRDcmVkZW50aWFsIl0sImlzc3VlciI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJpc3N1YW5jZURhdGUiOiIyMDIxLTAxLTI4VDA2OjM4OjM1WiIsImV4cGlyYXRpb25EYXRlIjoiMjAyNi0wMS0yOFQwNjozODozNVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJnZW5kZXIiOiJNYWxlIiwibGFuZ3VhZ2UiOiJFbmdsaXNoIiwibmFtZSI6IkpvaG4iLCJuYXRpb24iOiJTaW5nYXBvcmUiLCJ0d2l0dGVyIjoiQGpvaG4ifSwicHJvb2YiOnsidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY3JlYXRlZCI6IjIwMjEtMDEtMjhUMDY6Mzg6MzVaIiwidmVyaWZpY2F0aW9uTWV0aG9kIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Iiwic2lnbmF0dXJlIjoidWJSajNMNVp0LWZpUE4wT1dGLWZyQjlfZ2xHNWlHR1BFUzJKelNKWDhIX1M2bXotUnFQOTZzYXduYUVFdkN6Ym9NdHVnRlQxOXZTNC0xQnVLTlZRVGcifX1dLCJleHBpcmVzIjoiMjAyNi0wMS0yOFQwNjozODozNloiLCJwcm9vZiI6eyJ0eXBlIjoiRUNEU0FzZWNwMjU2cjEiLCJjcmVhdGVkIjoiMjAyMS0wMS0yOFQwNjozODozNVoiLCJjcmVhdG9yIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Iiwic2lnbmF0dXJlVmFsdWUiOiIwY1M3VV9NRDRjSF94Tlh3dWVwczVjenlucDRCbU1xeS02OWxURi1zeW5JOUJ0N010cnY3eE9aNXFPZXd3N0w1cHE4d2stVHVuamtfLU43aHFOSkZadyJ9fQ",
    "proof":{
        "type":"ECDSAsecp256r1",
        "verificationMethod":"did:elastos:idwuEMccSpsTH4ZqrhuHqg6y8XMVQAsY5g#primary",
        "signature":"4TySw_ja7a56dah198UnFWMdP7ZyG9jukcnCCr5vnhuyDwGLJ-o9zG7UCFZ8Djv8W4LX6vHX3sBRUZ6fOjWIpw"
    }
}`
updateDID = '{"header":{"specification":"elastos/did/1.0","operation":"update","previousTxid":"0000000000000000000000000000000000000000000000000000000000000000"},"payload":"ewogICAgICAgICJpZCIgOiAiZGlkOmVsYXN0b3M6aVRXcWFuVW92aDN6SGZuRXhHYWFuNFNKQVhHM0RDWkM2aiIsCiAgICAgICAgInB1YmxpY0tleSI6W3sgImlkIjogImRpZDplbGFzdG9zOmlUV3FhblVvdmgzekhmbkV4R2FhbjRTSkFYRzNEQ1pDNmojZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgInR5cGUiOiJFQ0RTQXNlY3AyNTZyMSIsCiAgICAgICAgICAgICAgICAgICAgICAgImNvbnRyb2xsZXIiOiJkaWQ6ZWxhc3RvczppY0o0ejJEVUxySEV6WVN2aktOSnBLeWhxRkR4dllWN3BOIiwKICAgICAgICAgICAgICAgICAgICAgICAicHVibGljS2V5QmFzZTU4Ijoienh0Nk55b29yRlVGTVhBOG1EQlVMam51SDN2NmlOZFptNDJQeUc0YzFZZEMiCiAgICAgICAgICAgICAgICAgICAgICB9LAoJCQkJCXsKCQkJCQkgICAiaWQiOiAiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiNtYXN0ZXIiLAoJCQkJCSAgICJ0eXBlIjoiRUNEU0FzZWNwMjU2cjEiLAoJCQkJCSAgICJjb250cm9sbGVyIjoiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiIsCgkJCQkJICAgInB1YmxpY0tleUJhc2U1OCI6InpOeG9aYVpMZGFja1pRTk1hczdzQ2tQUkhac0ozQnRkakV2TTJ5NWdOdktKIgoJCQkJICAgfQogICAgICAgICAgICAgICAgICAgIF0sCiAgICAgICAgImF1dGhlbnRpY2F0aW9uIjpbImRpZDplbGFzdG9zOmljSjR6MkRVTHJIRXpZU3ZqS05KcEt5aHFGRHh2WVY3cE4jZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgImlkIjogImRpZDplbGFzdG9zOmljSjR6MkRVTHJIRXpZU3ZqS05KcEt5aHFGRHh2WVY3cE4jZGVmYXVsdCIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICJjb250cm9sbGVyIjoiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAicHVibGljS2V5QmFzZTU4Ijoiek54b1phWkxkYWNrWlFOTWFzN3NDa1BSSFpzSjNCdGRqRXZNMnk1Z052S0oiCiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgIF0sCiAgICAgICAgImF1dGhvcml6YXRpb24iOlsiZGlkOmVsYXN0b3M6aWNKNHoyRFVMckhFellTdmpLTkpwS3locUZEeHZZVjdwTiNkZWZhdWx0Il0sCiAgICAgICAgImV4cGlyZXMiIDogIjIwMjMtMDItMTBUMTc6MDA6MDBaIgoJfQ","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j#default","signature":"G5a7KK06lNTMvuOxmfhQ6FU2WLeQpi1WjGjcrRF-09PEtejQLospWUxg6mArjOC0WPx3jHFGF_cIx71qzKpL2g"},"DIDDoc":{"id":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j","publicKey":[{"id":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j#default","type":"ECDSAsecp256r1","controller":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN","publicKeyBase58":"zxt6NyoorFUFMXA8mDBULjnuH3v6iNdZm42PyG4c1YdC"},{"id":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN#master","type":"ECDSAsecp256r1","controller":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN","publicKeyBase58":"zNxoZaZLdackZQNMas7sCkPRHZsJ3BtdjEvM2y5gNvKJ"}],"authentication":["did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN#default",{"controller":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN","id":"did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN#default","publicKeyBase58":"zNxoZaZLdackZQNMas7sCkPRHZsJ3BtdjEvM2y5gNvKJ","type":"ECDSAsecp256r1"}],"authorization":["did:elastos:icJ4z2DULrHEzYSvjKNJpKyhqFDxvYV7pN#default"],"expires":"2023-02-10T17:00:00Z"},"CredentialDoc":null,"Ticket":null}'

//停用id payload
deactiveDID = '{"header":{"specification":"elastos/did/1.0","operation":"deactivate"},"payload":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:iTWqanUovh3zHfnExGaan4SJAXG3DCZC6j#default","signature":"p33_nbN8xqfbyAnedKJNjYqQDuWnfqhn5NXiFqkd_ASujcj7xn3hu0fM2dnUvpm1S5lUWtNn-bIinO4Qt4TH3w"},"DIDDoc":null,"CredentialDoc":null,"Ticket":null}'

cdata  = contract.methods.operationDID(createDID).encodeABI();

tx = {data: cdata, to: contract.options.address, from: acc.address, gas: 3000000, gasPrice: "1000000000000"}


acc.signTransaction(tx).then((res)=>{
	console.log("coming");
	stx = res;
	console.log(stx.rawTransaction);
	web3.eth.sendSignedTransaction(stx.rawTransaction).then(console.log)
});