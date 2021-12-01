const { channelidslist } = require('../Helper/Lists');
const { optionlist } = require('./Settings');
const Log = require('../Helper/Log');

/**
 * 
 * @param {String} wtrestore - What to restore, currently available: Settings, Channel IDS
 * @param {String} readline - To prompt back to readline
 */
module.exports = (wtrestore, readline) => {
    if(wtrestore == "Settings"){
        Log("Restoring Terminal Settings...", 3);

        optionlist[0].state = 'Disabled'; //clear console on startup
        optionlist[1].value = 'Sanic Bot Terminal'; //console title
        optionlist[2].state = 'Enabled'; //display terminal version
        optionlist[3].state = 'Enabled'; //use console mode
        optionlist[4].state = 'Disabled'; //show debug logs

        Log("Terminal Settings Restored! Restart the console to apply the changes", 1);

        readline.prompt();

    } else if (wtrestore == "Channel IDS"){
        Log("Restoring the Channel IDS...", 3);

        channelidslist[0].name = "";
        channelidslist[0].chnlid = 0;

        channelidslist[1].name = "";
        channelidslist[1].chnlid = 0;

        channelidslist[2].name = "";
        channelidslist[2].chnlid = 0;

        channelidslist[3].name = "";
        channelidslist[3].chnlid = 0;

        channelidslist[4].name = "";
        channelidslist[4].chnlid = 0;

        channelidslist[5].name = "";
        channelidslist[5].chnlid = 0;

        channelidslist[6].name = "";
        channelidslist[6].chnlid = 0;

        channelidslist[7].name = "";
        channelidslist[7].chnlid = 0;

        channelidslist[8].name = "";
        channelidslist[8].chnlid = 0;

        channelidslist[9].name = "";
        channelidslist[9].chnlid = 0;

        channelidslist[10].name = "";
        channelidslist[10].chnlid = 0;

        channelidslist[11].name = "";
        channelidslist[11].chnlid = 0;

        channelidslist[12].name = "";
        channelidslist[12].chnlid = 0;

        channelidslist[13].name = "";
        channelidslist[13].chnlid = 0;

        channelidslist[14].name = "";
        channelidslist[14].chnlid = 0;

        channelidslist[15].name = "";
        channelidslist[15].chnlid = 0;

        channelidslist[16].name = "";
        channelidslist[16].chnlid = 0;

        channelidslist[17].name = "";
        channelidslist[17].chnlid = 0;

        channelidslist[18].name = "";
        channelidslist[18].chnlid = 0;

        channelidslist[19].name = "";
        channelidslist[19].chnlid = 0;

        channelidslist[20].name = "";
        channelidslist[20].chnlid = 0;

        Log("Channel IDS Restored! Restart the console to apply the changes", 1);
        readline.prompt();
    }
}