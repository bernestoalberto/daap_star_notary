// import 'babel-polyfill' from ;
const StarNotary = artifacts.require('../contracts/StarNotary.sol');
// Write Tests for:

// 1) The token name and token symbol are added properly.
// 2) 2 users can exchange their stars.
// 3) Stars Tokens can be transferred from one address to another.

let instance;
let accounts;
let owner;
contract('StarNotary', async (accs) => {
accounts = accs;
owner = accounts[0];
instance = await StarNotary.deployed();
});

   
    

it('can add the star name and star symbol properly', async() => {
let name = 'ErnestoBM Token';
let symbol = 'EBM';
let tokenId = 1;
 //1. Create a star
await instance.createStar("Pluton",tokenId,{from: owner});
//2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
assert.equal( await instance.NAME.call(), name);
assert.equal( await instance.SYMBOL.call(), symbol);
});

    
    
it('2 users can exchange their stars',async ()=>{

let starId1 = 2;
let starId2 = 3;
let address1 = accounts[3];
let address2 = accounts[4];

  // 1. Create 2 Stars
await instance.createStar("Pluton",starId1,{from: address1});
await instance.createStar("Neptuno",starId2,{from: address2});
// 2. Call the exchangeStars functions implemented in the Smart Contract
await instance.approve.call(address2, starId1,{from: address1});
await instance.exchangeStars(starId1, starId2, {from:address1});
assert.equal(await instance.ownerOf(starId2),address1 );
// 3. Verify that the owners changed
await instance.approve.call(address1, starId2,{from: address2});
await instance.exchangeStars(starId2, starId1, {from:address2});
assert.equal(await instance.ownerOf(starId1),address2 );
});



    

it('Stars Tokens can be transferred from one address to another.',async ()=>{
    let receiver = accounts[7];
    let token = 4;
     // 1. create a Star
    await instance.createStar("Pluton",token,{from: owner});
    await instance.approve.call(receiver,token,{from:owner});
       
    // 2. use the transferStar function implemented in the Smart Contract
    await instance.transferStar(receiver,token, {from:owner});
    // 3. Verify the star owner changed.
    assert.equal(await instance.ownerOf.call(token), receiver)
    });
