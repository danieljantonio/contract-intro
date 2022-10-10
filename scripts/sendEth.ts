import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

// Run using `npx hardhat run scripts/sendEth.ts --network localhost`
// Otherwise it does not execute it on the correct network since it uses npx.
// But since defaultNetwork: localhost has been added to hardhat config
// It now defaults to localhost and could be run using `ts-node scripts/fileName.ts`

const main = async () => {
	// Get signer using hardhat function that wraps EthersJS
	const hardhatSigner = (await ethers.getSigners())[0];

	// Get Account Balance
	const myBalance = await hardhatSigner.getBalance();
	console.log('My Balance:', ethers.utils.formatEther(myBalance));

	// Determine receiver address
	const toAddress = '0x8C2A267b58627Eb810CDe9A02FB6d5C2d288276C';
	console.log('Sending ETH to:', toAddress);

	// Send transaction
	const tx = await hardhatSigner.sendTransaction({
		to: toAddress,
		value: myBalance.div(BigNumber.from(10)),
	});

	console.log('Transaction Sent!', tx.hash);

	// Wait for the transaction to be approved.
	await tx.wait();

	console.log('Transaction Mined!');
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
