//Idk why I did this but it works I guess

const clc = require('cli-color');
const { channelidslist } = require('../Helper/Lists');
const { Log } = require('../Helper/Log');
const { debuglogs } = require('../Config/TerminalSettings.json');


class SendMenuHelp {
    constructor(){
        //Should make some foreach thingy but I dont know how to bruh and this is really fucking stupid too
        new Log("You can type 'add channelid' to add a channel id to the list", 0);
        console.log("Name: " + clc.cyan(channelidslist[0].name) + " (0)");
        console.log("Name: " + clc.cyan(channelidslist[1].name) + " (1)");
        console.log("Name: " + clc.cyan(channelidslist[2].name) + " (2)");
        console.log("Name: " + clc.cyan(channelidslist[3].name) + " (3)");
        console.log("Name: " + clc.cyan(channelidslist[4].name) + " (4)");
        console.log("Name: " + clc.cyan(channelidslist[5].name) + " (5)");
        console.log("Name: " + clc.cyan(channelidslist[6].name) + " (6)");
        console.log("Name: " + clc.cyan(channelidslist[7].name) + " (7)");
        console.log("Name: " + clc.cyan(channelidslist[8].name) + " (8)");
        console.log("Name: " + clc.cyan(channelidslist[9].name) + " (9)");
        console.log("Name: " + clc.cyan(channelidslist[10].name) + " (10)");
        console.log("Name: " + clc.cyan(channelidslist[11].name) + " (11)");
        console.log("Name: " + clc.cyan(channelidslist[12].name) + " (12)");
        console.log("Name: " + clc.cyan(channelidslist[13].name) + " (13)");
        console.log("Name: " + clc.cyan(channelidslist[14].name) + " (14)");
        console.log("Name: " + clc.cyan(channelidslist[15].name) + " (15)");
        console.log("Name: " + clc.cyan(channelidslist[16].name) + " (16)");
        console.log("Name: " + clc.cyan(channelidslist[17].name) + " (17)");
        console.log("Name: " + clc.cyan(channelidslist[18].name) + " (18)");
        console.log("Name: " + clc.cyan(channelidslist[19].name) + " (19)");
        console.log("Name: " + clc.cyan(channelidslist[20].name) + " (20)");
    }
}

class SendHelper {
    constructor(channel, message, client){
        this.channel = channel;
        this.message = message;
        this.client = client;

        if(debuglogs.state == "Enabled"){
            new Log("Channel ID Chosen: " + channel, 2);
            new Log("Chosen Channel ID Length: " + channel.length, 2);
        }

        if(channel.length == 18){
            client.channels.cache.get(channel).send(message);
        } else {
            new Log("Couldn't find a Channel ID on that list number", 3);
        }
    }
}

class AddHelper {
    //I doubt this will work tho
    //It goes here because its part of the channel id stuff, i will probably transfer it to helper someday or i guess it wont happen
    constructor(slot, channelname, channelid){
        if(debuglogs.state == "Enabled"){
            new Log("Slot where the channel id and name will be saved: " + slot, 2);
            new Log("Slot.name: " + slot.name, 2);
            new Log("Slot.chnlid: " + slot.chnlid, 2);
            new Log("Channel Name that will be saved in the slot: " + channelname, 2);
            new Log("Channel ID that will be saved in the slot: " + channelid);
        }

        
    }
}

module.exports = { SendMenuHelp, SendHelper, AddHelper }