//Idk why I did this but it works I guess

const clc = require('cli-color');
const { channelidslist } = require('../Helper/lists');

class SendMenuHelp {
    constructor(){
        //Should make some foreach thingy but I dont know how to bruh
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
    }
}

module.exports = { SendMenuHelp }