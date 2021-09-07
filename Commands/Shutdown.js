const { mainaccowner, altaccowner } = require('../Config/settings.json')
const Discord = require('discord.js');
const vorpal = require('vorpal')();
const clc = require('cli-color');

module.exports = {
    category: 'Main Commands',
    description: 'Sends a petition to shutdown the bot (Or can be forced without asking for petition to shutdown)',

    slash: true,

    options: [
        {
            name: 'forceshutdown',
            description: 'Force shutdown the bot',
            required: true,
            type: 3,
        }
    ],

    callback: ({ interaction, args }) => {
        const testembed = new Discord.MessageEmbed()
        .setDescription('test');
        
        const shutdownforce = new Discord.MessageEmbed()
        .setDescription('Forcing the bot shutdown, not asking for confirmation to the terminal... (20s until shutdown)')


        if(interaction){
            switch(args[0]){
                case 'true':
                    if (mainaccowner || altaccowner){
                        interaction.reply({
                            embeds: [shutdownforce]
                        }).then((resultMessage) => {
                            vorpal.log(clc.red('Shutdown scheduled in 20s'))
                            setTimeout(function() {
                                vorpal.exec('exit')
                            }, 20000)
                        })
                    }
                break;

                case 'false':
                    interaction.reply({
                        content: 'hola2',
                        embeds: [testembed]
                    })
                break;
            }
        }
    }
}