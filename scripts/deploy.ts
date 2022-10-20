import { ethers } from 'hardhat';

async function deployLock() {
	const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
	const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

	const lockedAmount = ethers.utils.parseEther('1');

	const Lock = await ethers.getContractFactory('Lock');
	const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

	await lock.deployed();

	console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}

async function deployGreeter() {
	const Greeter = await ethers.getContractFactory('Greeter');
	const greeter = await Greeter.deploy('Hello, Goerli!');

	await greeter.deployed();

	console.log('Greeter deployed to:', greeter.address);
}

async function deployCounter() {
	const Counter = await ethers.getContractFactory('Counter');
	const counter = await Counter.deploy(10);
	await counter.deployed();

	console.log('Counter deployed to:', counter.address);
}

async function main() {
	deployGreeter();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
