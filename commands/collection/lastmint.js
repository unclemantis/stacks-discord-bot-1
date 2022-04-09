const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const collection = config.collection;
const getLastMint = require('../../util/stacksAPI/getLastMint.js');

module.exports = {
	name: 'lastmint',
	aliases: ['lastmint'],
	description: 'Get the last minted NFT in the collection',
	usage: 'lastmint',
	category: 'collection',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	guildOnly: false,
	args: false,
	cooldown: 5,
	async execute(message) {
		const lastMinted = await getLastMint();
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Last Minted: #' + lastMinted.nftID)
			.setImage(
				`${collection.image.prefix}${lastMinted.nftID}.${collection.image.imageType}`,
			)
			.setURL(`${collection.collectionWebsite}/details/${lastMinted.nftID}`)
			.addFields(
				{
					name: `${collection.nftPrefix} #`,
					value: `${lastMinted.nftID}`,
				},
				{
					name: 'Minted By',
					value: `${lastMinted.recipient}`,
				},
				{
					name: 'Link',
					value: `${collection.collectionWebsite}/details/${lastMinted.nftID}`,
				},
			);
		message.channel.send({ embeds: [embed] });
	},
};
