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
    }  

    Order[] public orders;
    mapping(address, uint) share;
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

    //should
    function PlaceOrder(address customer, uint nstocks, uint price) payable private{
         assert(msg.sender==customer)
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

    function like(address page_addr, address user){
        assert(msg.sender==org, "Only organization can call this function");
        assert(subscribers[user]!=0, "The user has not subscribered");
        assert(rem_reactions[user] > 0, "The user has no reactions left");
        Page memory page = Page(page_addr);
        page.like();
    }


}