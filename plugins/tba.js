const Discord = require('discord.js');
const TBA = require('tba-api-storm');
let req = new TBA('FRCDiscord', 'Discord Bot', 1.0);

module.exports = {
	main: function(bot, m) {
		var args = m.content.split(" ")[0];
		var teamNumber = m.content.split(" ")[1];
		console.log(args + ", " + teamNumber);
		if(!isNaN(args)) {
			var embed = new Discord.RichEmbed();
			req.getTeam(args).then(d => {
					embed.setTitle('*FIRST®* Robotics Competition Team ' + args)
						 .setColor(0x1675DB)
						 .setURL('https://www.thebluealliance.com/team/' + args)
						 .addField('Name', d.nickname, true)
						 .addField('Rookie Year', d.rookie_year, true)
						 .addField('Location', d.location, true)
						 .addField('Website', d.website, true)
						 .addField('Motto', d.motto, true)
					m.channel.sendEmbed(embed)
					embed = null;
			}).catch((e) => {console.log(e); m.channel.sendMessage('Team does not exist')});
		}
		if(!isNaN(teamNumber)) {
			if (args === "team") {
				var embed = new Discord.RichEmbed();
				req.getTeam(teamNumber).then(d => {
						embed.setTitle('*FIRST®* Robotics Competition Team ' + teamNumber)
							 .setColor(0x1675DB)
							 .setURL('https://www.thebluealliance.com/team/' + teamNumber)
							 .addField('Name', d.nickname, true)
							 .addField('Rookie Year', d.rookie_year, true)
							 .addField('Location', d.location, true)
							 .addField('Website', d.website, true)
							 .addField('Motto', d.motto, true)
						m.channel.sendEmbed(embed)
						embed = null;
				}).catch((e) => {console.log(e); m.channel.sendMessage('Team does not exist')});
			} else if (args === "awards") {
				var embed = new Discord.RichEmbed();
				req.getTeamAwardHistory(teamNumber).then(d => {
					var embed = new Discord.RichEmbed();
						embed.setTitle('Awards for *FIRST®* Robotics Competition Team ' + teamNumber)
							.setColor(0x1675DB)
							.setURL('https://www.thebluealliance.com/team/' + teamNumber)
						var awards = [""];
						var n = 0;
						for(var i = 0; i < d.length; i++) {
							if((awards[n] + d[i].year + " - " + d[i].name).length >= 1024) {
								n++;
							}
							if(awards[n] != undefined) {
								awards[n] += d[i].year + " - " + d[i].name + "\n";
							}
							else {
								awards[n] = d[i].year + " - " + d[i].name + "\n";
							}
						}
						for(var j = 0; j < awards.length; j++) {
							if(awards[j] != undefined) {
								if(awards.length == 1) {
									embed.addField("Award List", awards[j])
								}
								else {
									embed.addField("Award List Page " + (j + 1), awards[j])
								}
							}
							if(embed.fields.length == 2 || j == awards.length - 1) {
								embed.setColor(0x1675DB)
								m.channel.sendEmbed(embed);
								embed = null;
								var embed = new Discord.RichEmbed();
							}
						}
						embed = null;
				}).catch((e) => {
					console.log(e.message);
					msg.reply(e);
				});
			} else if (args === "robots") {
				var embed = new Discord.RichEmbed();
				req.getTeamRobotHistory(teamNumber).then(d => {
						embed.setTitle('Robots for *FIRST®* Robotics Competition Team ' + teamNumber)
							.setColor(0x1675DB)
							.setURL('https://www.thebluealliance.com/team/' + teamNumber)
						for(let i in d){
							embed.addField(i, d[i].name);
						}
						m.channel.sendEmbed(embed);
						embed = null;
						team = null;
				}).catch((e) => {
					console.log(e.message);
					m.reply("an error has occurred")
				});
			} else if (args === "events") {
				var embed = new Discord.RichEmbed();
				let year = m.content.split(" ")[2];
				console.log(year); //Here it says year is fine
				if(year == undefined) {
					console.log('switching to 2017');
					year = 2017;
				}
				req.getTeamEvents(teamNumber, year).then(d => {
					//here year is undefined
						embed.setTitle('Events for *FIRST®* Robotics Competition Team ' + teamNumber + ' in ' + year)
							.setColor(0x1675DB)
							.setURL('https://www.thebluealliance.com/team/' + teamNumber)
						for(var i = 0; i < d.length; i++){
							startDate = new Date(d[i].start_date);
							endDate = new Date(d[i].end_date);
							embed.addField(d[i].year + ' ' + d[i].name, d[i].location + '\n' + startDate.toLocaleDateString() + ' - ' + endDate.toLocaleDateString());
						}
						m.channel.sendEmbed(embed);
						embed = null;
				}).catch((e) => {
					console.log(e.message);
					m.reply("an error has occurred")
				});
			} else {
				m.channel.sendMessage("Please specify an argument! Accepted arguments: team, awards, robots, events");
			}
		} else {
			m.channel.sendMessage("Please specify an argument! Accepted arguments: team, awards, robots, events");
		}
	}
};
