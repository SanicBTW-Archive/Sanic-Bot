const { executedcmdslist } = require('../Config/lists.js');
const vorpal = require('vorpal')();

module.exports = {
    category: 'Testing',
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