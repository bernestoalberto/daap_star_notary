let HDWalletProvider = require("truffle-hdwallet-provider");

 let mnemonic ="crater close lunar fitness uphold glue morning resemble suspect cigar front roast";
let account = "0x6D6BeF8E67a4D106F3f6b686De4004d486Eb1D62";

// console.log(providerk);
 // See <http://truffleframework.com/docs/advanced/configuration>
 // to customize your Truffle configuration!
   module.exports = {
networks: {
  development: {
   host: "127.0.0.1",
   port: 8545,
   network_id: "*" // Match any network id
 },
 rinkeby: {
  provider: function() {
 return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/91722a7efb1a4b7c855d9e20de86b59e")
     },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000,
    }
   }
 };


