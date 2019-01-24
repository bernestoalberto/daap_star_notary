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

it('can Create a Star', async() => {
let tokenId = 1;
instance.createStar("Pluton","6h 29m 1.0s" ,"68° 52' 56.9", 4, 63, "Pluton sa",tokenId,{from: accounts[0]})//,
    .then((result) => {
        // tokenId = result.toNumber();
        console.log('The token is', tokenId, result);
    }).catch((err) => {
    console.log(err);
});
});


it('has a correct name and token symbol are added properly.', async() => {
let name = 'ErnestoBM Token';
let symbol = 'EBM';
assert.equal( await instance.getTokenName(), name);
assert.equal( await instance.getSymbolName(), symbol);
});


it('2 users can exchange their stars',async ()=>{
let starId1 = 1;
let starId2 = 2;
let address1 = accounts[3];
let address2 = accounts[4];
let na = 'Pluton';
let na1 = 'Neptuno';
let  ra = "16h 29m 1.0s";
let  ra1 = "26h 39m 2.0s";
let dec = "68° 52' 56.9";
let dec1 = "78° 62' 66.9";
let mag = 4;
let mag1 = 5;
let cent = 63;
let cent1 = 65;
let story = "Found star using https://www.google.com/sky/";
let story1 = "Found star using https://www.google.com/neptuno/";
await instance.createStar(na, ra, dec,  mag,  cent,  story,starId1 ,{from: user1});
await instance.createStar(na1, ra1, dec1,  mag1,  cent1,  story1, starId2,{from: address2});
await instance.approve(address1, starId2,{from: address2});
await instance.exchangeStars.call(starId1, starId2, {from:address1});
assert.equal(await instance.ownerOf.call(tokenId1),address2 );
assert.equal(await instance.ownerOf.call(tokenId2),address1 );
});

//Code execution fails at some require() or (caller must be owner or authorized users), insufficient eth sent.

it('Stars Tokens can be transferred from one address to another.',async ()=>{
let receiver = accounts[6];
let token = 6;
await instance.approve(token);
await instance.transferStar(receiver,token, {from:receiver});
assert.equal(await instance.ownerOf.call(token), receiver)
});

/*it('can be claimed', async () => {
await instance.claimStar({from: owner});
assert.equal(await instance.starOwner.call(), owner)
})
it('can change owners', async () => {
var secondUser = accounts[1];
await instance.claimStar({from: owner})
assert.equal(await instance.starOwner.call(), owner)
await instance.claimStar({from: secondUser})
assert.equal(await instance.starOwner.call(), secondUser)
})
it('lets user1 put up their star for sale', async() => {
let user1 = accounts[1]
let starId = 2;
let starPrice = web3.toWei(.01, "ether");
let  ra = "16h 29m 1.0s";
let dec = "68° 52' 56.9";
let mag = "4.83";
let cent = "";
let story = "Found star using https://www.google.com/sky/";
await instance.createStar.call(name, ra, dec,  mag,  cent,  story,starId, {from: user1});
await instance.putStarUpForSale(starId, starPrice, {from: user1})
assert.equal(await instance.starsForSale.call(starId), starPrice)
});
it('lets user1 get the funds after the sale', async() => {
let user1 = accounts[1]
let user2 = accounts[2]
let starId = 3
let starPrice = web3.toWei(.01, "ether");
let  ra = "16h 29m 1.0s";
let dec = "68° 52' 56.9";
let mag = "4.83";
let cent = "";
let story = "Found star using https://www.google.com/sky/";
await instance.createStar.call(name, ra, dec,  mag,  cent,  story,starId, {from: user1});
await instance.putStarUpForSale(starId, starPrice, {from: user1})
let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
await instance.buyStar(starId, {from: user2, value: starPrice})
let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
});
it('lets user2 buy a star, if it is put up for sale', async() => {
let user1 = accounts[1];
let user2 = accounts[2];
let starId = 4;
let  ra = "16h 29m 1.0s";
let dec = "68° 52' 56.9";
let mag = "4.83";
let cent = "";
let starPrice = web3.toWei(.01, "ether")
await instance.createStar.call(name, ra, dec,  mag,  cent,  story,starId, {from: user1});
await instance.putStarUpForSale(starId, starPrice, {from: user1})
let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
await instance.buyStar(starId, {from: user2, value: starPrice});
assert.equal(await instance.ownerOf.call(starId), user2);
});
it('lets user2 buy a star and decreases its balance in ether', async() => {
let user1 = accounts[1]
let user2 = accounts[2]
let starId = 5
let starPrice = web3.toWei(.01, "ether");
let  ra = "16h 29m 1.0s";
let dec = "68° 52' 56.9";
let mag = "4.83";
let cent = "";
await instance.createStar.call(name, ra, dec,  mag,  cent,  story,starId, {from: user1});
await instance.putStarUpForSale(starId, starPrice, {from: user1})
let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
});*/
