import Portis from '@portis/web3';
import Web3 from 'web3';

const portis = new Portis('c4eb0bfb-bbcb-4e23-8c38-f41129f1469f', 'maticMumbai');
let web3; 
web3 = new Web3(portis.provider);

// if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
//     // we are in the client browser server and metamask is running.
//     console.log('web3 available');
//     web3 = new Web3(window.web3.currentProvider);
// }else {
//     // we are on the next js local server *OR* metamask is not running.
//     console.log('injecting metamask from infura');
//     const provider = new Web3.providers.HttpProvider(
//         'https://rinkeby.infura.io/v3/d2aaf60f86b64e8ab349c9cd9da59031'
//     );
    
//     web3 = new Web3(provider);
// }

export default web3;