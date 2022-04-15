const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;
const collection = require('../../collectionConfig.json');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');
const getBNS = require('../../util/stacksAPI/names/get-bns');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for blocks...');
	(await sc).subscribeBlocks(async (block) => {
		block.txs.forEach(async (tx_id) => {
			// Get Transaction Details
			const tx = await getTx(tx_id);

			// Collection Contract
			if (tx.data.tx_type === 'contract_call' && tx.data.contract_call.contract_id === contractID && tx.data.tx_status === 'success') {
				console.log(tx.data);
				const tx_id = tx.data.tx_id;
				const BNS = getBNS(tx.data.sender_address);
				const functionName = tx.data.contract_call.functionName;
				const contract = tx.data.contract_call.contract_id;
				const resultRepr = tx.data.tx_result.repr;
				const fee = tx.data.fee_rate / (10 ** 6);
				const nonce = tx.data.nonce;

				// MessageEmbed: New Mint Transaction
				const embed = new MessageEmbed()
					.setTitle('New Mint!')
					.setColor('#0099ff')
					.setURL(`https://explorer.stacks.co/transaction/${tx.data.tx_id}`)
					.setDescription(
						`Successful mint of ${tx.data.tx_id} by ${BNS}: ${resultRepr}`,
					)
					.setTimestamp();
				// Send Embed
				await client.channels.cache.get(channels.stacks.minted).send({ embeds: [embed] });
				console.log(embed);
			}
			else {return;}
		});
	});
};