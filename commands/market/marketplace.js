const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const collection = config.collection;

module.exports = {
	name: 'marketplace',
	aliases: ['market', 'byz', 'byznation', 'stxnft'],
	execute(message) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Marketplace')
			.addFields(
				{
					name: 'STXNFT',
					value: `View at stxnft.com: \n https://stxnft.com/collections/${collection.contractNameAlt}`,
				},
				{
					name: 'BYZANTION',
					value: `View at byzantion.xyz: \n https://byzantion.xyz/collection/${collection.contractName}`,
				},
			)
			.setImage(`${collection.collectionWebsite}/assets/unknownxx.png`)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};
