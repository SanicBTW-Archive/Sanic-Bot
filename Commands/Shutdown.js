module.exports = {
    category: 'Main Commands',
    description: 'Sends a petition to shutdown the bot (Or can be forced without asking for petition to shutdown)',

    options: [
        {
            name: 'shutdownopt',
            description: 'Options to shutdown the bot',
            required: false,
            type: 3,
        }
    ],

    callback: ({ interaction, args }) => {
        if(interaction){
            interaction.reply({
                content: 'Test' + args[0]
            })
        }
    }
}