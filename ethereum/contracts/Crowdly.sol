// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Crowdly {
    address[] public deployedPosts;

    function createPost(string memory content, string memory name)
        public
        returns (address[] memory)
    {
        Post newPost = new Post(msg.sender, content, name);
        deployedPosts.push(address(newPost));
        return deployedPosts;
    }

    function getDeployedPosts() public view returns (address[] memory) {
        return deployedPosts;
    }
}

contract Post {
    address tempAddress;

    address public manager;
    string public name;
    string public content;

    uint256 public total = 20000000000000000;
    uint256 public yayprice;
    uint256 public nayprice;
    uint256 public yaycount = 0;
    uint256 public naycount = 0;
    mapping(address => uint256) public yays;
    mapping(address => uint256) public nays;
    address payable[] public voted;
    bool public completed = false;
    bool public verdict;
    uint256 public balanceRef = 0;
    uint256 public timeStamp;

    modifier active() {
        require(!completed);
        _;
    }

    function complete() public payable {
        if (msg.sender == tempAddress) {
            completed = true;
            balanceRef = address(this).balance;
            if (verdict == true) {
                for (uint256 i = 0; i < voted.length; i++) {
                    if (yays[voted[i]] > 0) {
                        voted[i].transfer(
                            (((yays[voted[i]] * balanceRef) / (yaycount)) *
                                95) / 100
                        );
                    }
                }
            } else {
                for (uint256 i = 0; i < voted.length; i++) {
                    if (nays[voted[i]] > 0) {
                        voted[i].transfer(
                            (((nays[voted[i]] * balanceRef) / (naycount)) *
                                95) / 100
                        );
                    }
                }
            }
        }
    }

    function updateCost() public {
        yayprice = ((total * (yaycount + 10)) / (yaycount + naycount + 20));
        nayprice = total - yayprice;
        balanceRef = address(this).balance;
    }

    function voteYay() public payable active {
        if (msg.sender == tempAddress) {
            verdict = true;
            complete();
        } else {
            if (yays[msg.sender] == 0 && nays[msg.sender] == 0) {
                voted.push(payable(msg.sender));
            }
            require(msg.value >= yayprice);
            require(yays[msg.sender] <= 3);

            yays[msg.sender]++;
            yaycount++;
            updateCost();
        }
    }

    function voteNay() public payable {
        if (msg.sender == tempAddress) {
            verdict = false;
            complete();
        } else {
            if (yays[msg.sender] == 0 && nays[msg.sender] == 0) {
                voted.push(payable(msg.sender));
            }
            require(msg.value >= nayprice);
            require(nays[msg.sender] <= 3);

            nays[msg.sender]++;
            naycount++;
            updateCost();
        }
    }

    function getSummary()
        public
        view
        returns (
            address,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            bool,
            uint256
        )
    {
        return (
            address(this),
            name,
            content,
            yayprice,
            nayprice,
            yaycount,
            naycount,
            completed,
            verdict,
            balanceRef
        );
    }

    constructor(
        address manager_init,
        string memory content_init,
        string memory name_init
    ) {
        name = name_init;
        manager = manager_init;
        tempAddress = manager;
        content = content_init;
        updateCost();
    }
}
