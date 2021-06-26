// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


library Shared {
    struct Order{
        address customer;
        bool purchase;
        uint price;
        uint quantity;
    }  
}

contract Stock is ERC20{
    string public stock_name;
    string public stock_symbol;
    address public owner;
    uint public nstocks;
    address[] public board;  
    mapping(address=>uint) public shareholders;


    Shared.Order[] public orders;

    constructor(string memory _name, string memory _symbol, uint _nstocks) ERC20(_name, _symbol){
        _mint(msg.sender, _nstocks);
        nstocks=_nstocks;
        stock_name=_name;
        stock_symbol=_symbol;
    }

}

contract Market{

    ERC20 public usdc;

   

    mapping(bytes32=>Shared.Order) public customers;


    constructor(address _token){
        usdc = ERC20(_token);
    }

    function processTransaction(address _stock) public returns(bool){
        Stock stock = Stock(_stock);
        Shared.Order[] memory ord0 = stock.orders;
        if(ord0.length<=1)return false;
        while(ord0.length > 1){
            Shared.Order memory ord1 = stock.orders[stock.orders.length-1];
            Shared.Order memory ord2 = stock.orders[stock.orders.length-2];
            address buyer;
            address seller;
            if(ord1.purchase != ord2.purchase){
                
                if(ord1.purchase){
                    buyer=ord1.customer;
                    seller=ord2.customer;
                }else{
                    buyer=ord2.customer;
                    seller=ord1.customer;
                }
            }else{
                break;
            }

            uint _min = (ord1.quantity < ord2.quantity)?ord1.quantity:ord2.quantity;
            stock.transfer(buyer, _min);
            usdc.transfer(seller, _min);//to change

            ord1.quantity -= _min;
            ord2.quantity -= _min;

            stock.shareholders[buyer] += _min;
            stock.shareholders[seller] -= _min;

            if(ord2.quantity == 0){
                stock.orders[stock.orders.length-2]=stock.orders[stock.orders.length-1];
                stock.orders.pop();
            }

            if(ord1.quantity==0){
                stock.orders.pop();
            }

        }

        return true;
    }

    function buy(address _stock, uint _price, uint _quantity) public returns(bytes32){
        uint256 allowance = usdc.allowance(msg.sender, address(this));
        uint amount = _price*_quantity;
        require(allowance >= amount, "Check the token allowance");
        usdc.transferFrom(msg.sender, address(this), amount);
        bytes32 pid = keccak256(abi.encodePacked(msg.sender, _stock, block.timestamp));


        Stock stock = Stock(_stock);
        Shared.Order storage ord; 
        ord.customer = msg.sender;
        ord.purchase=true;
        ord.quantity = _quantity;
        ord.price=_price;
        stock.orders.push(ord);
        stock.shareholders[ord.customer] += _quantity;
        customers[pid] = ord;
        return pid;
    }

    function cancelPurchase(address _purchageId) public{
        assert(customers[_purchageId] != 0, "Invalid Purchase Id");
        Shared.Order memory ord = customers[_purchageId];
        assert(ord.customer==msg.sender, "Address Miss match");
        assert(ord.purchase==true, "The id doesn't correspond to purchase id");

        usdc.transfer(ord.customer, ord.price*ord.quantity);
        customers[_purchageId] = 0;
    } 

    function sell(address _stock, uint _price, uint _quantity) public returns(bytes32){
        Stock stock = Stock(_stock);
        uint amount = _price*_quantity;
        uint256 allowance = stock.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        stock.transferFrom(msg.sender, address(this), amount);
        bytes32 pid = keccak256(abi.encodePacked(msg.sender, _stock, block.timestamp));


        Shared.Order storage ord; 
        ord.customer = msg.sender;
        ord.purchase=false;
        ord.quantity = _quantity;
        ord.price=_price;
        stock.orders.push(ord);
        stock.shareholders[ord.customer] -= _quantity;
        customers[pid] = ord;
        return pid;
    }

    function cancelSupply(address _supplyId) public{
        assert(customers[_supplyId] != 0, "Invalid supply Id");
        Shared.Order memory ord = customers[_supplyId];
        assert(ord.customer==msg.sender, "Address Miss match");
        assert(ord.purchase==false, "The id doesn't correspond to supply id");

        usdc.transfer(ord.customer, ord.price*ord.quantity);
        customers[_supplyId] = 0;
    }

}