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
//createDID = '{"header":{"specification":"elastos/did/1.0","operation":"create"},"payload":"eyJpZCI6ImRpZDplbGFzdG9zOmlvdU1TWEtITmN3ZGJQemI1OHBYcG1HQkRCeHJNemZxMmMiLCJwdWJsaWNLZXkiOlt7ImlkIjoiI3ByaW1hcnkiLCJwdWJsaWNLZXlCYXNlNTgiOiIyOThjTGNzVlpxUk56Vm5NdkZUdXIyZFNhaXRpM3VzUUpBQUhWY0ZSQVI5QzUifV0sImF1dGhlbnRpY2F0aW9uIjpbIiNwcmltYXJ5Il0sInZlcmlmaWFibGVDcmVkZW50aWFsIjpbeyJpZCI6IiNlbGFzdG9zLWFjYWRlbXkiLCJ0eXBlIjpbIkFwcGxpY2F0aW9uUHJvZmlsZUNyZWRlbnRpYWwiLCJHYW1lQXBwbGljYXRpb25Qcm9maWxlQ3JlZGVudGlhbCIsIlNlbGZQcm9jbGFpbWVkQ3JlZGVudGlhbCJdLCJpc3N1YW5jZURhdGUiOiIyMDIwLTAzLTEwVDAxOjQ3OjE5WiIsImV4cGlyYXRpb25EYXRlIjoiMjAyMC0wMy0yNVQwMTo0NzoxOVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJhY3Rpb24iOiJMZWFybiBFbGFzdG9zIGJ5IHBsYXlpbmcgZ2FtZXMgYWdhaW5zdCBmcmllbmRzIiwiYXBwcGFja2FnZSI6InRlY2gudHV1bS50ZXN0LmFjYWRlbXkiLCJhcHB0eXBlIjoiZWxhc3Rvc2Jyb3dzZXIiLCJpZGVudGlmaWVyIjoiZWxhc3Rvcy1hY2FkZW15In0sInByb29mIjp7InZlcmlmaWNhdGlvbk1ldGhvZCI6IiNwcmltYXJ5Iiwic2lnbmF0dXJlIjoiemNsQmxLc24zSkc1a2NIWERMNDZOa2xENkpmejh6M0dXWTVqZndCYjJWVFdPNVNZOWtZMHZFZDRBSnB6dnhNa2FfdlRhdDhzNkc1T2FUYkpuXzRiaUEifX1dLCJleHBpcmVzIjoiMjAyNS0wMy0xMFQwMTowNTowN1oiLCJwcm9vZiI6eyJjcmVhdGVkIjoiMjAyMC0wMy0xMFQwMTo0NzoxOVoiLCJzaWduYXR1cmVWYWx1ZSI6IjVVN1RVZFhhQ09JMDFubFBxemh2b19mbHJpLTFDZk5qR1dISWdUVUxwdl9KWTNWYi1ZYURDZkhrTHZnTlg4bFJNQVhUeWUtS0ZVbTQzSnZOUnZxMXNBIn19","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:iouMSXKHNcwdbPzb58pXpmGBDBxrMzfq2c#primary","signature":"XDkYZd5IIWKP1WUWFGldz6TJb00j_1eXZKemyJi0xldWxcdLv46xUTvOa2ptrRcfGU3_BXR2swHCTBGqNIui-g"},"DIDDoc":{"id":"did:elastos:iouMSXKHNcwdbPzb58pXpmGBDBxrMzfq2c","publicKey":[{"id":"#primary","type":"","controller":"","publicKeyBase58":"298cLcsVZqRNzVnMvFTur2dSaiti3usQJAAHVcFRAR9C5"}],"authentication":["#primary"],"verifiableCredential":[{"id":"#elastos-academy","type":["ApplicationProfileCredential","GameApplicationProfileCredential","SelfProclaimedCredential"],"issuanceDate":"2020-03-10T01:47:19Z","expirationDate":"2020-03-25T01:47:19Z","credentialSubject":{"action":"Learn Elastos by playing games against friends","apppackage":"tech.tuum.test.academy","apptype":"elastosbrowser","identifier":"elastos-academy"},"proof":{"created":"","verificationMethod":"#primary","signature":"zclBlKsn3JG5kcHXDL46NklD6Jfz8z3GWY5jfwBb2VTWO5SY9kY0vEd4AJpzvxMka_vTat8s6G5OaTbJn_4biA"}}],"expires":"2025-03-10T01:05:07Z","proof":{"created":"2020-03-10T01:47:19Z","signatureValue":"5U7TUdXaCOI01nlPqzhvo_flri-1CfNjGWHIgTULpv_JY3Vb-YaDCfHkLvgNX8lRMAXTye-KFUm43JvNRvq1sA"}},"CredentialDoc":null,"Ticket":null}'
createDID = '{"header":{"specification":"elastos/did/1.0","operation":"create"},"payload":"eyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJwdWJsaWNLZXkiOlt7ImlkIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5IiwidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY29udHJvbGxlciI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJwdWJsaWNLZXlCYXNlNTgiOiJrVFlRaE10b2ltbTl3VjN2eTRxOUVWeTRaMVd4UnF4aHZuZ3p0ZEdvMURtYyJ9XSwiYXV0aGVudGljYXRpb24iOlsiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Il0sInZlcmlmaWFibGVDcmVkZW50aWFsIjpbeyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWcjcHJvZmlsZSIsInR5cGUiOlsiU2VsZlByb2NsYWltZWRDcmVkZW50aWFsIl0sImlzc3VlciI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJpc3N1YW5jZURhdGUiOiIyMDIxLTAxLTI4VDA2OjM4OjM1WiIsImV4cGlyYXRpb25EYXRlIjoiMjAyNi0wMS0yOFQwNjozODozNVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDplbGFzdG9zOmlkd3VFTWNjU3BzVEg0WnFyaHVIcWc2eThYTVZRQXNZNWciLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJnZW5kZXIiOiJNYWxlIiwibGFuZ3VhZ2UiOiJFbmdsaXNoIiwibmFtZSI6IkpvaG4iLCJuYXRpb24iOiJTaW5nYXBvcmUiLCJ0d2l0dGVyIjoiQGpvaG4ifSwicHJvb2YiOnsidHlwZSI6IkVDRFNBc2VjcDI1NnIxIiwiY3JlYXRlZCI6IjIwMjEtMDEtMjhUMDY6Mzg6MzVaIiwidmVyaWZpY2F0aW9uTWV0aG9kIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Iiwic2lnbmF0dXJlIjoidWJSajNMNVp0LWZpUE4wT1dGLWZyQjlfZ2xHNWlHR1BFUzJKelNKWDhIX1M2bXotUnFQOTZzYXduYUVFdkN6Ym9NdHVnRlQxOXZTNC0xQnVLTlZRVGcifX1dLCJleHBpcmVzIjoiMjAyNi0wMS0yOFQwNjozODozNloiLCJwcm9vZiI6eyJ0eXBlIjoiRUNEU0FzZWNwMjU2cjEiLCJjcmVhdGVkIjoiMjAyMS0wMS0yOFQwNjozODozNVoiLCJjcmVhdG9yIjoiZGlkOmVsYXN0b3M6aWR3dUVNY2NTcHNUSDRacXJodUhxZzZ5OFhNVlFBc1k1ZyNwcmltYXJ5Iiwic2lnbmF0dXJlVmFsdWUiOiIzY3VDOUh5cTdiUUVyVmoxaTVIYlR3ZDRLZU9Lb3p6R0ROUkZPYmVPRk5NWElwcy1jT3V1Q1luTnZxRzUwNGJWYmhBbFl1QWNhOGNDQ2IzT3NBeHR4ZyJ9fQ","proof":{"type":"ECDSAsecp256r1","verificationMethod":"did:elastos:did:elastos:idwuEMccSpsTH4ZqrhuHqg6y8XMVQAsY5g#primary","signature":"8En5yTOrlARLZM3PbA8JaSydTiIoeTxe2JwfIwas5tRHSJ2V7Nnw_CGxkoCusGR91i2kXVrbQKbZVtsZ9tckyw"}}'


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