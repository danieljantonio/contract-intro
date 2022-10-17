import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Greeter', function () {
	it("Should return the new greeting once it's changed", async function () {
		const Greeter = await ethers.getContractFactory('Greeter');
		const greeter = await Greeter.deploy('Hello, world!');
		await greeter.deployed();

		expect(await greeter.greet()).to.equal('Hello, world!');

		const setGreetingTx = await greeter.setGreeting('Hola, mundo!');

		await setGreetingTx.wait();

		expect(await greeter.greet()).to.equal('Hola, mundo!');
	});
});

// when the test is being run, if you do not specify the network in `hardhat.config.ts`
// then it would run the test on an independent network spun specifically to run the test
// once the test has been ran, the network node is torn down.
