var Token = artifacts.require("./Token.sol");
var Ethswap = artifacts.require("./Ethswap.sol");

module.exports = async function(deployer) {
    //deploy the token
   await deployer.deploy(Token);
    const token=await Token.deployed()

    //deploy the ethswap
  await deployer.deploy(Ethswap,token.address);
  const ethSwap=await Ethswap.deployed()


  //transfer all the tokens to ethswap
    await token.transfer(ethSwap.address,'1000000000000000000000000')
};
