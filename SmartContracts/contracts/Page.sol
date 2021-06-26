// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


//minimize the number of contract calls for single transaction
//maximize the number of transaction
contract Page{

    struct Order{
        address customer;
        bool purchase;
        uint price;
        uint quantity;
        bytes32 receipt;
        bool valid;
    }  

    mapping(address => uint) share;
    mapping(bytes32 => Order) orders;
    mapping(bytes32 => bool) receipts;
    address org;
    string name;
    uint likes;
    ERC20 usdc;

    constructor(string _name, uint price, uint nstocks, address owner, address _token) public {
        name=_name;
        org=msg.sender;
        share[owner]=nstocks;
        likes=0;
        usdc = ERC20(_token);
    }

    function like() public {
        assert(msg.sender==org, "only organization can call the like function");
        likes += 1;
    }
    

    }

    function bid(address buyer, uint nstocks, uint price) payable public returns(bytes32){
        assert(msg.sender==org, "only the market contract can call this function");
        return keccak256();
    }

    function ask(address seller, uint nstocks, uint price) payable{
        assert(msg.sender==org, "only the market contract can call this function");
    }

    function cancelBid(address buyer, bytes32 receipt_addr){
        assert(receipts[receipt_addr]==true, "The order doesn't exist");
        assert(orders[receipt_addr].receipt == receipt_addr, "The order has different receipt");
        assert(orders[receipt_addr].valid, "The order is not valid. Is already cancelled");
        receipts[receipt_addr]=false;
        orders[receipt_addr].valid=false;

    }

    
}

contract Market{

    address[] pages;
    mapping(address, uint) rem_reactions;
    mapping(address, uint) subscribers;
    address org;
    uint subcription_fee;
    ERC20 usdc;

    constructor(uint _fee, address _token){
        ord = msg.sender;
        subscription_fee= _fee;
        usdc=ERC20(_token);
    }


    function deposit(uint256 amount) public returns (bool) {
        uint256 allowance = usdc.allowance(msg.sender, address(this));
        require(allowance >= amount, "Allowance is not adequete");
        usdc.transferFrom(msg.sender, address(this), amount);
        return true;
    }

    function ipo(string name, uint price, uint nstocks) public returns(address) {
        Page storage page = new Page(name);
        pages.push(page);
        return address(page);
    }

    function subscribe(uint validity) public {
        deposit(validity*subscription_fee);
        subscribers[msg.sender]=block.timestamp + validity * 1 days;
       
    }

    function like(address page_addr){
        address user = msg.sender;
        assert(subscribers[user]!=0, "The user has not subscribered");
        assert(rem_reactions[user] > 0, "The user has no reactions left");
        Page memory page = Page(page_addr);
        page.like();
    }

    function bid(address page_addr, uint nstocks, uint price) public returns(bytes32) {
        Page memory page = Page(page_addr);
        deposit(nstocks*price);
        page.bid(uint nstocks, uint price);
    }

    function ask(address page_addr, uint nstocks) public returns(bytes32){
        Page memory page = Page(page_addr);
        page.ask(uint nstocks, uint price);
    }

    function cancelBid(address page_addr, bytes32 receipt) public returns (bool){
        Page memory page = Page(page_addr);
        uint repay_amount = page.cancelBid(receipt);
        usdc.transfer(msg.sender, repay_amount);
        return true;
    }

    function cancelAsk(address page_addr, uint nstocks) public returns (bool){
        Page memory page = Page(page_addr);
        page.cancelAsk(receipt);
        return true;
    }


}