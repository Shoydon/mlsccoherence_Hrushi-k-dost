let BorrowLend = artifacts.require("BorrowLend")

module.exports = function(deployer) {
	deployer.deploy(BorrowLend)
}
