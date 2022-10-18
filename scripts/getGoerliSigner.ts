import { formatEther } from 'ethers/lib/utils';
import { ethers } from 'hardhat';

async function main() {
	const signer = (await ethers.getSigners())[0];

	const myBalance = await signer.getBalance();

	console.log('My Balance:', formatEther(myBalance));
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
