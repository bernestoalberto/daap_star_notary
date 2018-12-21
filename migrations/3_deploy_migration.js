var Migrations = artifacts.require("./sampleToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

