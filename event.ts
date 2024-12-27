
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
}




 export {get_event as Get_event, get_event_craps as Get_event_craps,get_event_jack as Get_event_jack, get_event_cetus as Get_event_cetus,get_event_turbos as Get_event_turbos};
















