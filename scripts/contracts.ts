import { ethers } from 'hardhat';

const main = async () => {
	const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	const greeter = await ethers.getContractAt('Greeter', contractAddress);

	console.log('Initial greeting:', await greeter.greet());

	console.log('Setting greeting...');

	const setTx = await greeter.setGreeting('Is this working?');

	console.log('sentTx sent!');

	await setTx.wait();

	console.log('setTx mined!');

	console.log('New greeting:', await greeter.greet());
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
