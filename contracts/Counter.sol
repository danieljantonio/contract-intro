pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Counter {
	uint public count = 0;
	address creator;

	constructor(uint256 _initialCount) {
		count = _initialCount;
		creator = msg.sender;
	}

	modifier onlyCreator {
		require(msg.sender == creator, "Sorry, not the creator :)");
		_;
	}

	function get() public view returns (uint) {
		return count;
	}

	function inc() public {
		count += 1;
	}

	function dec() public {
		count -= 1;
	}

	function setCreator(address newCreator) public onlyCreator {
		creator = newCreator;
	}
	
	function owner() public view returns (address) {
		return creator;
	}
}