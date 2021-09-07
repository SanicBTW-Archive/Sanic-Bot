const { mainaccowner, altaccowner } = require('../Config/settings.json')
const Discord = require('discord.js');

module.exports = {
    category: 'Main Commands',
    description: 'Sends a petition to shutdown the bot (Or can be forced without asking for petition to shutdown)',

    slash: true,

    options: [
        {
            name: 'shutdownopt',
            description: 'Options to shutdown the bot',
            required: false,
            type: 3,
        }
    ],

    callback: ({ interaction, args }) => {
        const testembed = new Discord.MessageEmbed()
        .setDescription('test');

        if(interaction){
            if (args[0].contains("force")) {
                if(mainaccowner || altaccowner) {
                    interaction.reply({
                        content: 'hola',
                        embeds: [testembed]
                    })
                }
            }
        }
    }
}