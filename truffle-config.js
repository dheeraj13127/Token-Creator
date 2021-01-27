const {projectId,mnemonic}=require('./secrets.json')
const HDWalletProvider=require('@truffle/hdwallet-provider')


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
   ropsten:{
     provider:()=>new HDWalletProvider(mnemonic,`https://ropsten.infura.io/v3/${projectId}`),
     network_id:3,
     gas:5500000,
     confimations:2,
     timeoutBlocks:200,
     skipDryRun:true
   },
    
  },
};
