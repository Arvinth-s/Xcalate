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

    constructor(string memory _name, uint nstocks, address owner, address _token) {
        name=_name;
        org=msg.sender;
        share[owner]=nstocks;
        likes=0;
        usdc = ERC20(_token);
    }

    function like() public {
        require(msg.sender==org, "only organization can call the like function");
        likes += 1;
    }
    

    function makeDeal(address buyer, address seller, uint nstocks, uint amount, bytes32 ask_receipt, bytes32 bid_receipt) public returns(bool) {
        require(msg.sender==org, "only organization can confirm the deal");
        require(receipts[ask_receipt] && receipts[bid_receipt], "Receipts is invalid");
        Order memory ask_order=orders[ask_receipt];
        Order memory bid_order = orders[bid_receipt];
        require(amount > ask_order.amount, "The price is less than the ask price");
        require(amount < bid_order.amount, "The price is greater than the bid amount");
        require(share[seller] >= nstocks, "The seller doesn't have enough share");
        require(usdc.allowance(buyer, address(this)) >= amount, "The buyer doesn't have enough allowance");
        usdc.transferFrom(msg.sender, address(this), amount);
        usdc.transfer(seller, amount);


        share[seller] -= nstocks;
        share[buyer] += nstocks;
        usdc.transfer(seller, amount);


        return true;
    }

    function bid(address buyer, uint nstocks, uint price) payable public returns(bytes32){
        require(msg.sender==org, "only the market contract can call this function");
        bytes32 receipt = keccak256(abi.encodePacked(buyer, block.timestamp));
        Order memory order = Order(buyer, true, price*nstocks, nstocks, receipt, true);
        orders[receipt]=order;
        return receipt;
    }

    function ask(address seller, uint nstocks, uint price) public payable returns(bytes32){
        require(msg.sender==org, "only the market contract can call this function");
        bytes32 receipt = keccak256(abi.encodePacked(seller, block.timestamp));
        Order memory order = Order(seller, false, price*nstocks, nstocks, receipt, true);
        orders[receipt]=order;
        return receipt;
    }

    function cancelBid(address buyer, bytes32 receipt_addr) public returns(bool){
        require(msg.sender==org, "only the market contract can call this function");
        require(receipts[receipt_addr]==true, "The order doesn't exist");
        require(orders[receipt_addr].receipt == receipt_addr, "The order has different receipt");
        require(orders[receipt_addr].valid, "The order is not valid. Is already cancelled");
        require(orders[receipt_addr].customer==buyer, "Buyer address mismsatch");
        require(orders[receipt_addr].purchase, "The order is a seller order");
        receipts[receipt_addr]=false;
        orders[receipt_addr].valid=false;
        return true;
    }

    function cancelAsk(address seller, bytes32 receipt_addr) public returns(bool){
        require(msg.sender==org, "only the market contract can call this function");
        require(receipts[receipt_addr]==true, "The order doesn't exist");
        require(orders[receipt_addr].receipt == receipt_addr, "The order has different receipt");
        require(orders[receipt_addr].valid, "The order is not valid. Is already cancelled");
        require(orders[receipt_addr].customer==seller, "Seller address mismsatch");
        require(orders[receipt_addr].purchase==false, "The order is a buyer order");
        receipts[receipt_addr]=false;
        orders[receipt_addr].valid=false;
        return true;
    }

    
}

contract Market{

    address[] pages;
    mapping(address => uint) rem_reactions;
    mapping(address => uint) subscribers;
    address org;
    address token;
    uint subscription_fee;
    ERC20 usdc;

    constructor(uint _fee, address _token){
        org = msg.sender;
        subscription_fee = _fee;
        token=_token;
        usdc=ERC20(_token);
    }


    function deposit(uint256 amount) public returns (bool) {
        uint256 allowance = usdc.allowance(msg.sender, address(this));
        require(allowance >= amount, "Allowance is not adequete");
        usdc.transferFrom(msg.sender, address(this), amount);
        return true;
    }

    function ipo(string memory _name, uint nstocks) public returns(address) {
        Page page = new Page(_name, nstocks, msg.sender, token);
        pages.push(address(page));
        return address(page);
    }

    function subscribe(uint validity) public {
        deposit(validity*subscription_fee);
        subscribers[msg.sender]=block.timestamp + validity * 1 days;
       
    }

    function like(address page_addr) public {
        address user = msg.sender;
        require(subscribers[user]!=0, "The user has not subscribered");
        require(rem_reactions[user] > 0, "The user has no reactions left");
        Page page = Page(page_addr);
        page.like();
    }

    function bid(address page_addr, uint nstocks, uint price) public returns(bytes32) {
        Page page = Page(page_addr);
        require(usdc.allowance(msg.sender, page_addr) > nstocks*price, "Not enough allowance");
        return page.bid(msg.sender, nstocks, price);
    }

    function ask(address page_addr, uint nstocks, uint price) public returns(bytes32){
        Page page = Page(page_addr);
        return page.ask(msg.sender, nstocks, price);
    }

    function cancelBid(address page_addr, bytes32 receipt) public returns (bool){
        Page page = Page(page_addr);
        page.cancelBid(msg.sender, receipt);
        return true;
    }

    function cancelAsk(address page_addr, bytes32 receipt) public returns (bool){
        Page page = Page(page_addr);
        page.cancelAsk(msg.sender, receipt);
        return true;
    }

    function makeDeal(address page_addr, address buyer, address seller, uint nstocks, uint amount, bytes32 ask_receipt, bytes32 bid_receipt) public {
        require(msg.sender==org, "only organization can confirm the deal");
        Page page = Page(page_addr);
        page.makeDeal(buyer, seller, nstocks, amount, ask_receipt, bid_receipt);
    }

}