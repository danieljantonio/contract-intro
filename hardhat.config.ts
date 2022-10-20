import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

const config: HardhatUserConfig = {
	solidity: '0.8.17',
	// defaultNetwork: 'localhost',
	networks: {
		goerli: {
			url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
			accounts: [`${process.env.WALLET_PRIVATE_KEY}`],
		},
	},
};

export default config;
