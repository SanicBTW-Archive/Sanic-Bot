const { executedcmdslist } = require('../Config/lists.js');

module.exports = {
    category: 'Main Commands',
    description: 'Replies with pong',

    slash: true,

    callback: ({ interaction }) => {
        interaction.reply({
            content: 'pong'
        })
        executedcmdslist[0].exectimes ++;
        executedcmdslist[0].lastusertoexec = interaction.user.username;
        
        executedcmdslist[0].latestexc = true;
        executedcmdslist[1].latestexc = false;
        executedcmdslist[2].latestexc = false;
    },
}