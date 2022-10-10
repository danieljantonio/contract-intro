import { ethers } from 'hardhat';

const main = async () => {
	// Set up providers
	const localProviderUrl = 'http://127.0.0.1:8545/';
	const provider = new ethers.providers.JsonRpcProvider(localProviderUrl);

	// Get and log the account 0 balance
	const account0Address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
	const account0Balance = await provider.getBalance(account0Address);
	console.log('account0Balance', ethers.utils.formatEther(account0Balance));
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
