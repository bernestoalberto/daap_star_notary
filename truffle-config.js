let HDWalletProvider = require("truffle-hdwallet-provider");

let mnemonic ="crater close lunar fitness uphold glue morning resemble suspect cigar front roast";
let account = "0x7311bd9c8e5a3d46f3d36d8e99820682335fb949";

// console.log(providerk);
// See <http://truffleframework.com/docs/advanced/configuration>
// to customize your Truffle configuration!
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network id
            gas: 4712388,
            gasPrice: 100000000000

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


