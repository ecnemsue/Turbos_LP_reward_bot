
import { JSONRPCClient } from "json-rpc-2.0";



async function get_event(digest:string){
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("https://fullnode.mainnet.sui.io:443", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);

let reqresult=await client
  .request("sui_getEvents", { 
  'transaction_digest' : digest,
  'options':{
      "showType": true,
      "showOwner": true,
      "showPreviousTransaction": true,
      "showDisplay": false,
      "showContent": true,
      "showBcs": false,
      "showStorageRebate": true
    
    }
});
return reqresult[reqresult.length-1].parsedJson;
// let dice=parseInt(reqresult[0].parsedJson.outcome);
// let sum=Math.floor(dice/6)+2+dice%6;
 // return sum;
}
async function get_event_craps(digest:string){
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("https://fullnode.mainnet.sui.io:443", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);

let reqresult=await client
  .request("sui_getEvents", { 
  'transaction_digest' : digest,
  'options':{
      "showType": true,
      "showOwner": true,
      "showPreviousTransaction": true,
      "showDisplay": false,
      "showContent": true,
      "showBcs": false,
      "showStorageRebate": true
    
    }
});

 let dice=parseInt(reqresult[0].parsedJson.outcome);
 let sum=Math.floor(dice/6)+2+dice%6;
 return sum;
}
async function get_event_jack(digest:string){
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("https://fullnode.mainnet.sui.io:443", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);
let reqresult=await client
  .request("sui_getEvents", { 
  'transaction_digest' : digest,
  'options':{
      "showType": true,
      "showOwner": true,
      "showPreviousTransaction": true,
      "showDisplay": false,
      "showContent": true,
      "showBcs": false,
      "showStorageRebate": true
    
    }
});
return reqresult;
}
async function get_event_cetus(digest:string){
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("https://fullnode.mainnet.sui.io:443", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);
let reqresult=await client
  .request("sui_getEvents", { 
  'transaction_digest' : digest,
  'options':{
      "showType": true,
      "showOwner": true,
      "showPreviousTransaction": true,
      "showDisplay": false,
      "showContent": true,
      "showBcs": false,
      "showStorageRebate": true
    
    }
});
return reqresult[0].parsedJson.position;
// let dice=parseInt(reqresult[0].parsedJson.outcome);
// let sum=Math.floor(dice/6)+2+dice%6;
 // return sum;
}
async function get_event_turbos(digest:string){
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("https://fullnode.mainnet.sui.io:443", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);
let reqresult=await client
  .request("sui_getEvents", { 
  'transaction_digest' : digest,
  'options':{
      "showType": true,
      "showOwner": true,
      "showPreviousTransaction": true,
      "showDisplay": false,
      "showContent": true,
      "showBcs": false,
      "showStorageRebate": true
    
    }
});
return [reqresult[0].parsedJson.object_id,reqresult[2].parsedJson.liquidity];
// let dice=parseInt(reqresult[0].parsedJson.outcome);
// let sum=Math.floor(dice/6)+2+dice%6;
 // return sum;
}


async function roll(client_sui0,coin_type){
const unihouse='0x75c63644536b1a7155d20d62d9f88bf794dc847ea296288ddaf306aa320168ab';
const random='0x0000000000000000000000000000000000000000000000000000000000000008';
const config='0xa4847402c8b60dea08161f5392267a4629d80a88dbd475b5928cc21edf6f2a69';
 const keypair = Ed25519Keypair.fromSecretKey(secretKey);
 const account = keypair.getPublicKey();

		let tx2 = new Transaction();
		tx2.setGasBudget(84215520);
			tx2.moveCall({
			target: `0x0eb72162cfbecb56f4dd13cd558aadc78162f52f93fe5b24627e5a6f6fe15a74::roulette::start_roll`,
			arguments: [tx2.object(unihouse),tx2.object(random),tx2.object(config)
				],
			typeArguments: [coin_type],
		});
	 const response2 =  await SignAndSubmitTXB(tx2,client_sui0,keypair);
		console.log(response2.effects.status);
		return response2.digest;
}



 export {get_event as Get_event, get_event_craps as Get_event_craps, roll as Friend_roll,get_event_jack as Get_event_jack, get_event_cetus as Get_event_cetus,get_event_turbos as Get_event_turbos};
















