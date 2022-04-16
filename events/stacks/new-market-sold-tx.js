const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;
const collection = require('../../collectionConfig.json');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');
const getBNS = require('../../util/stacksAPI/names/get-bns');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for new sales txs...');
	(await sc).subscribeMempool(async (mempool) => {
		// Get Transaction Details
		const tx = mempool;
		// Collection Contract
		if (tx.tx_type === 'contract_call') {
			if (tx.contract_call.contract_id.includes('market') === true) {
				console.log('Contract ID' + tx);
				if (tx.contract_call.function_name.includes('sold' || 'purchased' || 'bought') === true) {
					console.log('Function Name' + tx);
					if (tx.contract_call.function_args[0].repr === contractID) {
						console.log('OK' + tx);
						const txID = tx.tx_id;
						const BNS = await getBNS(tx.sender_address);
						const fee = tx.fee_rate / (10 ** 6);

						// MessageEmbed: NFT Purchased / Sold
						const embed = new MessageEmbed()
							.setTitle('NFT Purchased / Sold')
							.setColor('#0099ff')
							.setURL(`https://explorer.stacks.co/txid/${txID}`)
							.setDescription(`${BNS} \nhas purchased a new NFT.`)
							.addFields(
								{ name: 'Address', value: `${BNS}` },
								{ name: 'Fee', value: `${fee} STX` },
							)
							.setTimestamp();
							// Send Embed
						await client.channels.cache.get(channels.marketplace.sold).send({ embeds: [embed] });
					}
					else {return;}
				}
				else {return;}
			}
			else {return;}
		}
		else {return;}

	});
};