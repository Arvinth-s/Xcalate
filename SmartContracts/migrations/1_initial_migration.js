const Migrations = artifacts.require("Migrations");
const Market = artifacts.require("Market");
const Page = artifacts.require("Page");
const Usdc = artifacts.require("USDC");
const web3 = require('../web_3/web3');

var token_address;

module.exports = async function (deployer) {
  deployer.deploy(Migrations);
  await deployer.deploy(Usdc).then((_deployedContract)=>{
    token_address = _deployedContract.address;
  });
  const accounts = await web3.eth.getAccounts();


  console.log('accounts: ', accounts);
  console.log('token address: ', token_address);

  deployer.deploy(
    Market,
    1000, token_address 
  );

  deployer.deploy(
    Page,
    "Garuda Service", "1000", accounts[0], token_address
  );

};
