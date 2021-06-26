// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


//minimize the number of contract calls for single transaction
//maximize the number of transaction
contract Page{

    struct Order{
        address customer;
        bool purchase;
        uint amount;
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
    

    function makeDeal(address buyer, address seller, address nstocks, address amount, bytes32 ask_receipt, bytes32 bid_receipt) public returns(bool) {
        assert(msg.sender==org, "only organization can confirm the deal");
        assert(asreceipts[ask_receipt] && receipts[bid_receipt], "One of the receipt is invalid");
        Order memory ask_order=orders[ask_receipt], bid_order = orders[bid_receipt];
        assert(amount > ask_order.amount, "The price is less than the ask price");
        assert(amount < bid_order.amount, "The price is greater than the bid amount");
        assert(share[seller] >= nstocks, "The seller doesn't have enough share");
        assert(usdc.allowance(buyer, address(this)) >= amount, "The buyer doesn't have enough allowance");
        usdc.transferFrom(msg.sender, address(this), amount);
        usdc.transfer(seller, amount);


        share[seller] -= nstocks;
        share[buyer] += nstocks;
        usdc.transfer(seller, amount);


        return true;
    }

    function bid(address buyer, uint nstocks, uint price) payable public returns(bytes32){
        assert(msg.sender==org, "only the market contract can call this function");
        bytes32 receipt = keccak256(abi.encodePacked(buyer, block.timestamp));
        Order storage order = new Order;
        order.customer=buyer;
        order.quantity=nstocks;
        order.amount = nstocks*price;
        order.purchase=true;
        order.valid=true;
        order.receipt=receipt;
        return receipt;
    }

    function ask(address seller, uint nstocks, uint price) payable{
        assert(msg.sender==org, "only the market contract can call this function");
        bytes32 receipt = keccak256(abi.encodePacked(seller, block.timestamp));
        Order storage order = new Order;
        order.customer=seller;
        order.quantity=nstocks;
        order.amount = nstocks*price;
        order.purchase=false;
        order.valid=true;
        order.receipt=receipt;
        return receipt;
    }

    function cancelBid(address buyer, bytes32 receipt_addr) returns(bool){
        assert(msg.sender==org, "only the market contract can call this function");
        assert(receipts[receipt_addr]==true, "The order doesn't exist");
        assert(orders[receipt_addr].receipt == receipt_addr, "The order has different receipt");
        assert(orders[receipt_addr].valid, "The order is not valid. Is already cancelled");
        assert(orders[receipt_addr].customer==buyer, "Buyer address mismsatch");
        assert(orders[receipt_addr].purchase, "The order is a seller order");
        receipts[receipt_addr]=false;
        orders[receipt_addr].valid=false;
        return true;
    }

    function cancelAsk(address seller, bytes32 receipt_addr) returns(bool){
        assert(msg.sender==org, "only the market contract can call this function");
        assert(receipts[receipt_addr]==true, "The order doesn't exist");
        assert(orders[receipt_addr].receipt == receipt_addr, "The order has different receipt");
        assert(orders[receipt_addr].valid, "The order is not valid. Is already cancelled");
        assert(orders[receipt_addr].customer==seller, "Seller address mismsatch");
        assert(orders[receipt_addr].purchase==false, "The order is a buyer order");
        receipts[receipt_addr]=false;
        orders[receipt_addr].valid=false;
        uint amount = orders[receipt_addr].amount;
        return true;
    }

    
}

contract Market{

    address[] pages;
    mapping(address, uint) rem_reactions;
    mapping(address, uint) subscribers;
    address org, token;
    uint subcription_fee;
    ERC20 usdc;

    constructor(uint _fee, address _token){
        ord = msg.sender;
        subscription_fee= _fee;
        token=_token;
        usdc=ERC20(_token);
    }


    function deposit(address page, uint256 amount) public returns (bool) {
        uint256 allowance = usdc.allowance(msg.sender, address(this));
        require(allowance >= amount, "Allowance is not adequete");
        usdc.transferFrom(msg.sender, address(this), amount);
        usdc.transfer(page, amount);
        return true;
    }

    function ipo(string _name, uint price, uint nstocks, address owner) public returns(address) {
        Page storage page = new Page(_name, price, nstocks, msg.sender, token);
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
        assert(usdc.allowance(msg.sender, page_addr) > nstocks*price, "Not enough allowance");
        page.bid(uint nstocks, uint price);
    }

    function ask(address page_addr, uint nstocks) public returns(bytes32){
        Page memory page = Page(page_addr);
        page.ask(uint nstocks, uint price);
    }

    function cancelBid(address page_addr, bytes32 receipt) public returns (bool){
        Page memory page = Page(page_addr);
        page.cancelBid(receipt);
        return true;
    }

    function cancelAsk(address page_addr, uint nstocks) public returns (bool){
        Page memory page = Page(page_addr);
        page.cancelAsk(receipt);
        return true;
    }

    function makeDeal(address page_addr, address buyer, address seller, address nstocks, address amount, bytes32 ask_receipt, bytes32 bid_receipt) public returns(bool) {
        assert(msg.sender==org, "only organization can confirm the deal");
        Page memory page = Page(page_addr);
        page.makeDeal(receipt);
    }

}