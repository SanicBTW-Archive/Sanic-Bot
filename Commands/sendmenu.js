//Idk why I did this but it works I guess

const clc = require('cli-color');
const { channelidslist } = require('../Helper/lists');

class SendMenuHelp {
    constructor(){
        //Should make some foreach thingy but I dont know how to bruh and this is really fucking stupid too
        console.log(clc.yellow("You can type 'add channelid' to add a channel id to the list"))
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

module.exports = { SendMenuHelp }