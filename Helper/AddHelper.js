const { channelidslist } = require('../Helper/Lists');
const Log = require('../Helper/Log');
const { debuglogs } = require('../Config/TerminalSettings.json');

//Improve the uhhhh string, number thingy uh that

/**
 * 
 * @param {String} slot - Slot where the info its saved
 * @param {String} channelname - The channel name that you want saved
 * @param {Number} channelid - The channel id that you want saved
 * @param {String} readline - To prompt back again 
 */
module.exports = (slot, channelname, channelid, readline) => {

    if(debuglogs.state == "Enabled"){
        Log("Displaying old slot contents", 2);
        Log("Old Slot Name: " + slot.name, 2);
        Log("Old Slot Channel ID: " + slot.chnlid, 2);
        Log("Channel Name that will be saved in the slot: " + channelname, 2);
        Log("Channel ID that will be saved in the slot: " + channelid, 2);
        if(readline != null){ //Stupid ass debug stuff
            Log("Readline was given I guess", 2);
        } else {
            Log("Not given readline, will probably crash later on", 2);
        }
        Log("Trying to save stuff into the specified slot", 2);
    }

    slot.name = channelname;
    slot.chnlid = channelid;
    
    if(debuglogs.state == "Enabled"){
        Log("Displaying current slot stuff", 2);
        Log("New Slot Name: " + slot.name, 2);
        Log("New Slot Channel ID: " + slot.chnlid, 2);
        if(readline != null){ //Stupid ass debug stuff
            Log("Prompting to readline again using given readline", 2);
        } else {
            Log("Not given readline, can't prevent the crash lol", 2);
        }
    }
    readline.prompt();
}