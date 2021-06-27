//OM NAMO NARAYANA

import web3 from '../web3';
import Post from '../build/contracts/Post.json';

export default (address) => {
    return new web3.eth.Contract(
        Post.abi,
        address
    );
};