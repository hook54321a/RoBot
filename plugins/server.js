module.exports = {
	main: function(bot, message) {
		const Discord = require('discord.js');
		const embed = new Discord.RichEmbed()
		  .setTitle(message.guild.name)
		  .setColor(0x1675DB)
		  .setDescription('Server Information')
		  .setFooter('Triggered by ' + message.author.username, message.author.avatarURL)
		  .setThumbnail(message.guild.iconURL)
		  .setTimestamp()
		  .addField('Name', message.guild.name, true)
		  .addField('Created', message.guild.createdAt.toLocaleString())
		  .addField('ID', message.guild.id, true)
		  .addField('Owner', message.guild.owner.user.username, true)
		  .addField('Default Channel', message.guild.defaultChannel, true)
		  .addField('Region', message.guild.region, true)
		  .addField('Member Count', message.guild.members.size, true)
		  .addField('Channel Count', message.guild.channels.size, true)
		  .addField('Role List', message.guild.roles.map(r => r.name).join(", "), true)
		message.channel.sendEmbed(embed,{ disableEveryone: true });
	}
};