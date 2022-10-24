pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract BobRossToken {
	uint256 public constant totalSupply = 1000;
	uint256 public totalCreated = 0;
	uint256 public constant CREATION_PRICE = 0.01 ether;
	address public immutable owner;

	constructor() {
		owner = msg.sender;
	}

	mapping (address => uint256) public balances;

	modifier ownerOnly(){
		require(msg.sender == owner, "Sorry, not the owner.");
		_;
	}

	function create(uint256 quantity) public ownerOnly {
		require(quantity + totalCreated <= totalSupply, "Total supply reached!");
		totalCreated += quantity;
		balances[msg.sender] += quantity;
	}

	function send(address to, uint256 quantity) public {
		require(balances[msg.sender] >= quantity, "You don't have enough balance.");
		
		balances[msg.sender] -= quantity;
		balances[to] += quantity;
	}

	function buy() public payable{
		require(totalCreated < totalSupply, "totalSupply reached!");
		require(msg.value == CREATION_PRICE, "Incorrect ETH amount");

		balances[msg.sender] += 1;
		totalCreated += 1;
	}
}