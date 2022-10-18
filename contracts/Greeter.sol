// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Greeter {
	string private greeting;
	bool public unlocked = false;

	constructor(string memory _greeting) {
		greeting = _greeting;
	}

	function greet() public view returns (string memory) {
		return greeting;
	}

	function setGreeting(string memory _greeting) public {
		require(unlocked, "Sorry, this is locked");
		greeting = _greeting;
	}

	function toggleUnlocked() public {
		unlocked = !unlocked;
	}
}