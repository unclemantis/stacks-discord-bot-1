const axios = require('axios').default;
const config = require('../../../botConfig.json');

module.exports = async () => {
	const contractIdentifier = `${config.collection.contract.contractAddress}.${config.collection.contract.contractName}`;
	const data = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${principal}/transactions`);
	const results = data;
	console.log(results);
};