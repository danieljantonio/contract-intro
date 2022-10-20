import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';

describe('Counter', function () {
	let counter: Contract;
	beforeEach(async () => {
		const Counter = await ethers.getContractFactory('Counter');
		counter = await Counter.deploy(10);
		await counter.deployed();
	});

	it('Should be owned by the creator', async function () {
		const [signer0] = await ethers.getSigners();
		expect(await counter.owner()).to.equal(signer0.address);
	});

	it('Should have the same initial count as constructed', async function () {
		expect(await counter.get()).to.equal(10);
	});

	it('Should be incrementable', async function () {
		const incTx = await counter.inc();
		await incTx.wait();

		expect(await counter.get()).to.equal(11);
	});

	it('Should be decrementable', async function () {
		const incTx = await counter.dec();
		await incTx.wait();

		expect(await counter.get()).to.equal(9);
	});

	it('Should revert if non-creator access onlyCreator function', async function () {
		const [_, singer1] = await ethers.getSigners();
		await expect(counter.connect(singer1).setCreator(singer1.address)).to.be.reverted;
	});

	it('Should set the right creator', async function () {
		const [_, signer1] = await ethers.getSigners();
		const setCrtr = await counter.setCreator(signer1.address);
		await setCrtr.wait();
		expect(await counter.owner()).to.equal(signer1.address);
	});
});

// when the test is being run, if you do not specify the network in `hardhat.config.ts`
// then it would run the test on an independent network spun specifically to run the test
// once the test has been ran, the network node is torn down.
