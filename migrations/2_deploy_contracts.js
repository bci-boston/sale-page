var AssetToken = artifacts.require("AssetToken");
var CrowdSaleContract = artifacts.require("CrowdSale");

module.exports = function(deployer, networks, accounts) {

// todo: use https://blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6

console.log("Account being used as admin " + accounts[0]);

// Create assetToken with initialsupply, and assign to accounts[0] as owner account
deployer.deploy(AssetToken, 60000000, "Power2PeerToken", "Power2Peer", 0, accounts[0]).then(function() {
    return deployer.deploy(CrowdSaleContract, 100000, "http://power2peer.com/token-sale", accounts[0], 1000, 10000, AssetToken.address, 1);

})


};
