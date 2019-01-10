// import 'babel-polyfill';
const StarNotary = artifacts.require('../contracts/StarNotary.sol')
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
    await instance.createStar("Awesome Star!","Found star using https://www.google.com/sky/","16h 29m 1.0s" ,"68° 52 56.9",
    "4.83", tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
  });
/*  it('has a correct name', async() => {
    assert.equal(await instance.startName.call(), 'Awesome Udacity Star!')
  });
  it('can be claimed', async () => {
    await instance.claimStar({from: owner});
    assert.equal(await instance.starOwner.call(), owner)
  })
  it('can change owners', async () => {
    var secondUser = accounts[1];
    await instance.claimStar({from: owner})
    assert.equal(await instance.starOwner.call(), owner)
    await instance.claimStar({from: secondUser})
    assert.equal(await instance.starOwner.call(), secondUser)
 })*/
  // it('lets user1 put up their star for sale', async() => {
  //   let user1 = accounts[1]
  //   let starId = 2;
  //   let starPrice = web3.toWei(.01, "ether")
  //   await instance.createStar('awesome star', starId, {from: user1})
  //   await instance.putStarUpForSale(starId, starPrice, {from: user1})
  //   assert.equal(await instance.starsForSale.call(starId), starPrice)
  // });

  // it('lets user1 get the funds after the sale', async() => {
  //   let user1 = accounts[1]
  //   let user2 = accounts[2]
  //   let starId = 3
  //   let starPrice = web3.toWei(.01, "ether")
  //   await instance.createStar('awesome star', starId, {from: user1})
  //   await instance.putStarUpForSale(starId, starPrice, {from: user1})
  //   let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
  //   await instance.buyStar(starId, {from: user2, value: starPrice})
  //   let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
  //   assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
  // });

  // it('lets user2 buy a star, if it is put up for sale', async() => {
  //   let user1 = accounts[1]
  //   let user2 = accounts[2]
  //   let starId = 4
  //   let starPrice = web3.toWei(.01, "ether")
  //   await instance.createStar('awesome star', starId, {from: user1})
  //   await instance.putStarUpForSale(starId, starPrice, {from: user1})
  //   let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
  //   await instance.buyStar(starId, {from: user2, value: starPrice});
  //   assert.equal(await instance.ownerOf.call(starId), user2);
  // });

  // it('lets user2 buy a star and decreases its balance in ether', async() => {
  //   let user1 = accounts[1]
  //   let user2 = accounts[2]
  //   let starId = 5
  //   let starPrice = web3.toWei(.01, "ether")
  //   await instance.createStar('awesome star', starId, {from: user1})
  //   await instance.putStarUpForSale(starId, starPrice, {from: user1})
  //   let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
  //   const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
  //   await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
  //   const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
  //   assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
  // });

