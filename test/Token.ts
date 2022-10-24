import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { parseEther } from 'ethers/lib/utils';

describe('Token', function () {
	let token: Contract;

	beforeEach(async () => {
		const Token = await ethers.getContractFactory('BobRossToken');
		token = await Token.deploy();
		await token.deployed();
	});

	it('Should be able to create Token', async function () {
		const [signer0] = await ethers.getSigners();

		const createTx = await token.create(100);
		await createTx.wait();

		expect(await token.balances(signer0.address)).to.equal(100);
	});

	it('Should revert if created more than total supply', async function () {
		const totalSupply = await token.totalSupply();

		const createTx = token.create(totalSupply.add(100));
		expect(createTx).to.be.reverted;
	});

	it('Should revert if non-boss tries to create tokens', async function () {
		const [_, singer1] = await ethers.getSigners();

		const createTx = token.connect(singer1).create(100);
		expect(createTx).to.be.reverted;
	});

	it('Should be able to send tokens', async function () {
		const [signer0, signer1] = await ethers.getSigners();

		const createTx = await token.create(100);
		await createTx.wait();

		expect(await token.balances(signer0.address)).to.equal(100);

		const sendTx = await token.send(signer1.address, 25);
		await sendTx.wait();

		expect(await token.balances(signer0.address)).to.equal(75);
		expect(await token.balances(signer1.address)).to.equal(25);
	});

	it('Should allow random addresses to buy tokens', async function () {
		const [_, signer1] = await ethers.getSigners();

		const buyTx = await token.connect(signer1).buy({
			value: parseEther('0.01'),
		});

		await buyTx.wait();

		expect(await token.balances(signer1.address)).to.equal(1);
	});
});

// when the test is being run, if you do not specify the network in `hardhat.config.ts`
// then it would run the test on an independent network spun specifically to run the test
// once the test has been ran, the network node is torn down.
