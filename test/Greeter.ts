import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';

describe('Greeter', function () {
	let greeter: Contract;
	beforeEach(async () => {
		const Greeter = await ethers.getContractFactory('Greeter');
		greeter = await Greeter.deploy('Hello, world!');
		await greeter.deployed();
	});

	it('Should revert if the contract is not unlocked', async function () {
		await expect(greeter.setGreeting('Hola, mundo!')).to.be.reverted;
	});

	it("Should return the new greeting once it's changed (and it's unlocked)", async function () {
		expect(await greeter.greet()).to.equal('Hello, world!');

		const unlockTx = await greeter.toggleUnlocked();
		await unlockTx.wait();

		const setGreetingTx = await greeter.setGreeting('Hola, mundo!');

		await setGreetingTx.wait();

		expect(await greeter.greet()).to.equal('Hola, mundo!');
	});
});

// when the test is being run, if you do not specify the network in `hardhat.config.ts`
// then it would run the test on an independent network spun specifically to run the test
// once the test has been ran, the network node is torn down.
