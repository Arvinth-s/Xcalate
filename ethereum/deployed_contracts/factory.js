//OM NAMO NARAYANA
import web3 from '../web3';
import Crowdly from '../build/contracts/Crowdly.json';

const instance = new web3.eth.Contract(
	Crowdly.abi,
	//address of crowdly here
	'0x5a1A9E86A597Bacbf984AE22dD492849F949045F'
	);

console.log(instance);

export default instance;
