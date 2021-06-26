// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;



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


    constructor(string _name, uint price, uint nstocks, address owner) public {
        name=_name;
        org=msg.sender;
        share[owner]=nstocks;
        likes=0;
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

    constructor(uint _fee){
        ord = msg.sender;
        subscription_fee= _fee;
    }

    function ipo(string name, uint price, uint nstocks) public returns(address) {
        Page storage page = new Page(name);
        pages.push(page);
        return address(page);
    }

    function subscribe(uint validity) public payable {
        assert(msg.value >= validity * _fee, "Insufficien amount for subscription");
        subscribers[msg.sender]=block.timestamp + validity * 1 days;
    }

    function like(address page_addr){
        address user = msg.sender;
        assert(subscribers[user]!=0, "The user has not subscribered");
        assert(rem_reactions[user] > 0, "The user has no reactions left");
        Page memory page = Page(page_addr);
        page.like();
    }

    function bid(address page_addr, uint nstocks) public payable {
        Page memory page = Page(page_addr);
        page.bid(uint nstocks, uint price)
    }

    function ask(address page_addr, uint nstocks) public payable{
        Page memory page = Page(page_addr);
        page.ask(uint nstocks, uint price);
    }


}