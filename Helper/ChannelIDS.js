const { channelidslist } = require('../Helper/Lists');
const { Log } = require('../Helper/Log');
const { debuglogs } = require('../Config/TerminalSettings.json');

class AddHelper {
    //It actually fucking works lets go
    //It goes here because its part of the channel id stuff, i will probably transfer it to helper someday or i guess it wont happen
    //Testing readline thingy
    constructor(slot, channelname, channelid, rl){
        this.slot = slot;
        this.channelname = channelname;
        this.channelid = channelid;
        this.rl = rl;

        if(debuglogs.state == "Enabled"){
            new Log("Displaying old slot contents", 2);
            new Log("Old Slot Name: " + slot.name, 2);
            new Log("Old Slot Channel ID: " + slot.chnlid, 2);
            new Log("Channel Name that will be saved in the slot: " + channelname, 2);
            new Log("Channel ID that will be saved in the slot: " + channelid, 2);
            if(rl != null){ //Stupid ass debug stuff
                new Log("Readline was given I guess", 2);
            } else {
                new Log("Not given readline, will probably crash later on", 2);
            }
            new Log("Trying to save stuff into the specified slot", 2);
        }

        slot.name = channelname;
        slot.chnlid = channelid;
        
        if(debuglogs.state == "Enabled"){
            new Log("Displaying current slot stuff", 2);
            new Log("New Slot Name: " + slot.name, 2);
            new Log("New Slot Channel ID: " + slot.chnlid, 2);
            if(rl != null){ //Stupid ass debug stuff
                new Log("Prompting to readline again using given readline", 2);
            } else {
                new Log("Not given readline, can't prevent the crash lol", 2);
            }
        }
        rl.prompt();
    }
}

class RestoreHelper {
    constructor(){
        //Just pasted the code from index lol
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
    }
}

module.exports = { AddHelper, RestoreHelper }