import { Secp256k1Keypair } from '@mysten/sui/keypairs/secp256k1';
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SignAndSubmitTXB } from 'navi-sdk/dist/libs/PTB';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  decodeSuiPrivateKey,
  encodeSuiPrivateKey,
} from '@mysten/sui/cryptography';
import { JSONRPCClient } from "json-rpc-2.0";
import {
  Transaction,
  TransactionArgument,
  TransactionObjectArgument,
} from "@mysten/sui/transactions";
import {setTimeout} from 'timers/promises';
import BN from 'bn.js'
import {AggregatorClient} from '@cetusprotocol/aggregator-sdk';
import { Env } from "@cetusprotocol/aggregator-sdk"
import {Get_event_turbos} from'./event.ts';
import { Network, TurbosSdk } from 'turbos-clmm-sdk';



 const { secretKey } = decodeSuiPrivateKey("suiprivkey....");//Your wallet secretKey
 const keypair = Ed25519Keypair.fromSecretKey(secretKey);
 const account = keypair.getPublicKey();
 const address=account.toSuiAddress();
const coinB='0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI';
const coinA='0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS';
const poolID='0xa0b55c090a286dfc77125231735077bc12a7bf865feb07accdac6f5be03f69b4';
const tickSpacing=60;
let open_count=0;
const reserve_amount=5*10**6;
let fail_flag=0;
let loopcount=0;
const client_sui = new SuiClient({ url: getFullnodeUrl('mainnet') });
const sdk = new TurbosSdk(Network.mainnet, client_sui);
const client_cetus = new AggregatorClient("https://api-sui.cetus.zone/router_v2",address,client_sui,Env.Mainnet);
const coinA_init=Number((await client_sui.getBalance({owner:address,coinType:coinA})).totalBalance);
let coinB_init=Number((await client_sui.getBalance({owner:address,coinType:coinB})).totalBalance);
console.log('initial coinA:',coinA_init,'coinB:',coinB_init);
let Liquidity='';


const coinA_amount=Number((await client_sui.getBalance({owner:address,coinType:coinA})).totalBalance);
const coinB_amount=Number((await client_sui.getBalance({owner:address,coinType:coinB})).totalBalance);
console.log('current coinA:',coinA_amount,'coinB:',coinB_amount);
let tx2 = new Transaction();
if (Math.abs(coinA_amount-coinA_init-open_count*reserve_amount)<10*10**6){
return;
}
if (coinA_amount>coinA_init+open_count*reserve_amount){
const swap_amount = new BN(coinA_amount-coinA_init-open_count*reserve_amount);
const routerRes = await client_cetus.findRouters({
  from:coinA,
  target:coinB,
  amount:swap_amount,
  byAmountIn: true, // `true` means fix input amount, `false` means fix output amount
  providers:['CETUS','TURBOS','AFTERMATH','BLUEFIN','KRIYAV3','AFSUI','HAEDAL','VOLO'],
});
await client_cetus.fastRouterSwap({
  routers: routerRes.routes,
  byAmountIn:true,
  txb: tx2,
  slippage: 0.3,
  isMergeTragetCoin: true,
  refreshAllCoins: true,
});
console.log('try swap',swap_amount,'NS to SUI');
}
else{
const swap_amount = new BN(open_count*reserve_amount+coinA_init-coinA_amount);
const routerRes = await client_cetus.findRouters({
  from:coinB,
  target:coinA,
  amount:swap_amount,
  byAmountIn: false, // `true` means fix input amount, `false` means fix output amount
  providers:['CETUS','TURBOS','AFTERMATH','BLUEFIN','KRIYAV3','AFSUI','HAEDAL','VOLO'],
});
await client_cetus.fastRouterSwap({
  routers: routerRes.routes,
  byAmountIn:false,
  txb: tx2,
  slippage: 0.3,
  isMergeTragetCoin: true,
  refreshAllCoins: true,
});
console.log('try swap',swap_amount,'SUI to NS');
}

	const response2 =  await SignAndSubmitTXB(tx2,client_sui,keypair);
	console.log(response2.effects.status);
	await setTimeout(1000);	
	const coinA_result=Number((await client_sui.getBalance({owner:address,coinType:coinA})).totalBalance);
	const coinB_result=Number((await client_sui.getBalance({owner:address,coinType:coinB})).totalBalance);
	console.log('wallet NS:',coinA_result,',SUI:',coinB_result);
	return response2.digest;
}
async function swap_A(){
const coinA_amount=Number((await client_sui.getBalance({owner:address,coinType:coinA})).totalBalance);
const coinB_amount=Number((await client_sui.getBalance({owner:address,coinType:coinB})).totalBalance);
console.log('current coinA:',coinA_amount,'coinB:',coinB_amount);
let tx2 = new Transaction();
if (Math.abs(coinB_amount-coinB_init)<10*10**9){
return;
}
if (coinB_amount>coinB_init){
const swap_amount = new BN(coinB_amount-coinB_init);
const routerRes = await client_cetus.findRouters({
  from:coinB,
  target:coinA,
  amount:swap_amount,
  byAmountIn: true, // `true` means fix input amount, `false` means fix output amount
  providers:['CETUS','TURBOS','AFTERMATH','BLUEFIN','KRIYAV3','AFSUI','HAEDAL','VOLO'],
});
await client_cetus.fastRouterSwap({
  routers: routerRes.routes,
  byAmountIn:true,
  txb: tx2,
  slippage: 0.3,
  isMergeTragetCoin: true,
  refreshAllCoins: true,
});
console.log('try swap',swap_amount,'SUI to NS');
}
else{
const swap_amount = new BN(coinB_init-coinB_amount);
const routerRes = await client_cetus.findRouters({
  from:coinA,
  target:coinB,
  amount:swap_amount,
  byAmountIn: false, // `true` means fix input amount, `false` means fix output amount
  providers:['CETUS','TURBOS','AFTERMATH','BLUEFIN','KRIYAV3','AFSUI','HAEDAL','VOLO'],
});
await client_cetus.fastRouterSwap({
  routers: routerRes.routes,
  byAmountIn:false,
  txb: tx2,
  slippage: 0.3,
  isMergeTragetCoin: true,
  refreshAllCoins: true,
});
console.log('try swap',swap_amount,'NS to SUI');
}

	const response2 =  await SignAndSubmitTXB(tx2,client_sui,keypair);
	console.log(response2.effects.status);
	await setTimeout(1000);	
	const coinA_result=Number((await client_sui.getBalance({owner:address,coinType:coinA})).totalBalance);
	const coinB_result=Number((await client_sui.getBalance({owner:address,coinType:coinB})).totalBalance);
	console.log('wallet NS:',coinA_result,',SUI:',coinB_result,'profit NS:',coinA_result-coinA_init);
	return response2.digest;
}




async function open_position(lowerTick,Tickindex,coinA_amount_current,coinB_amount_current){	
 let deposit_amount=coinB_amount_current;
const tx = await sdk.pool.addLiquidity({
  pool: poolID,
  address: address,
  amountA: Math.min(Math.floor(  (deposit_amount*20*(lowerTick+tickSpacing-Tickindex))/(1000*(Tickindex-lowerTick))   )  ,coinA_amount_current-50*10**6),
  amountB: deposit_amount-5*10**9,
  slippage: 99,
  tickLower:lowerTick,
  tickUpper:lowerTick+tickSpacing,
});		
			
	console.log('try open position....');
	const response2 =  await SignAndSubmitTXB(tx,client_sui,keypair);
	console.log(response2.effects.status);
	return response2.digest;			
			
}

async function close_position(id,liq){

const tx = await sdk.pool.removeLiquidity({
  pool: poolID,
  nft: id,
  address: address,
  decreaseLiquidity: liq,
  amountA: 1,
  amountB: 1,
  slippage: 99,
  collectAmountA: 90000*10**9,
  collectAmountB: 90000*10**9,
  rewardAmounts: [90000*10**9]
});			
	console.log('try close position...');		
	const response2 =  await SignAndSubmitTXB(tx,client_sui,keypair);
	console.log(response2.effects.status);
	return response2.digest;				
}


let lastTick=0;
let lastlowerTick=0;
let position_id='';
let openflag=0;
let digest_id='';
let pool={};
while(true){
try{
 pool = await sdk.pool.getPool(poolID);
}catch{console.log('Get pool data failed');continue;}
let tick_index=pool.tick_current_index.fields.bits;
const lowerTick = ((tick_index-(tick_index % tickSpacing))/tickSpacing)*tickSpacing;
const upperTick = lowerTick+tickSpacing;
//console.log(pool);
if (loopcount%10==0){
console.log('Currnt tick range is [',lowerTick,upperTick,'], Tick is ',tick_index);
}
loopcount+=1;


	
if (position_id.length!=66){
const coinA_amount_current=Number((await client_sui.getBalance({owner:address,coinType:coinA})).totalBalance);
const coinB_amount_current=Number((await client_sui.getBalance({owner:address,coinType:coinB})).totalBalance);
if (Math.abs(coinB_amount_current-coinB_init)>9*10**9){
await setTimeout(6000);	
try{
await swap_A();
}catch{console.log('Swap failed');continue;}
await setTimeout(1000);	
}
if (lastTick!=0){
await setTimeout(1000);	
try{
[position_id,Liquidity]=await Get_event_turbos(digest_id);
}catch{console.log('Get event failed');continue;}

fail_flag=0;
continue;
}
try{
digest_id=await open_position(lowerTick,tick_index,coinA_amount_current,coinB_amount_current);
}catch{console.log('Open position failed');continue;}
lastTick=tick_index;
open_count+=1;
await setTimeout(1000);	
try{
[position_id,Liquidity]=await Get_event_turbos(digest_id);
}catch{console.log('Get event failed');continue;}
console.log('Position NFT:',position_id,'Liquidity',Liquidity);
fail_flag=0;
console.log('position_id=',position_id,'at tick ',tick_index);
lastlowerTick=lowerTick;
openflag=1;

}

if ((lowerTick!=lastlowerTick |Math.abs(tick_index-lastTick)>tickSpacing*0.1*((Math.abs(tick_index-lowerTick)<tickSpacing*0.1)?0.3:0.8))& position_id.length==66&openflag==0){
console.log(' try rebalance...' );
if (lastlowerTick!=lowerTick){
await setTimeout(1000);	
}
try{
 pool = await sdk.pool.getPool(poolID);
}catch{console.log('Get pool data failed');continue;}


if (Math.abs(pool.tick_current_index.fields.bits-lastTick)>=0.5*tickSpacing){
console.log('Great trend detected, bot stop 5 min....., at tick',pool.tick_current_index.fields.bits);
await setTimeout(1000*60*5);	
}



if (Math.abs(pool.tick_current_index.fields.bits-lastTick)>=1*tickSpacing){
console.log('attack detected, bot stop 20min....., at tick',pool.tick_current_index.fields.bits);
await setTimeout(1000*60*20);	
}
try{
await close_position(position_id,Liquidity);
}catch{console.log('Close position failed');continue;}
lastTick=0;
position_id='';
await setTimeout(300);	
if (loopcount>120){
open_count+=Math.floor(loopcount/120);
}
loopcount=0;
try{
await swap_A();
}catch{console.log('Swap failed');continue;}

await setTimeout(6000);	

}
await setTimeout(2000);		

openflag=0;



}
		
