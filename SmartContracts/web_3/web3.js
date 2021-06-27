// import Portis from '@portis/web3';
const Web3 = require("web3");
const { mnemonic, projectId } = require("./secrets/secrets.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");


// const portis = new Portis('c4eb0bfb-bbcb-4e23-8c38-f41129f1469f', 'maticMumbai');
// let web3;
// web3 = new Web3(portis.provider);

// if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
//   console.log("web3 available");
//   web3 = new Web3(window.web3.currentProvider);
// } else {
//   var provider = new HDWalletProvider(mnemonic, projectId);
//   console.log("injecting metamask from infura");

//   web3 = new Web3(provider);
// }

web3 = new Web3('http://localhost:7545');

module.exports = web3;
