//Redo the channelids system in a way that it isnt a lot of useless code lol

//#region Discord stuff
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Voice = require('@discordjs/voice');
//#endregion

//#region Config stuff, Terminal and Discord Bot
//#region Imports
const fs = require("fs");
const clc = require('cli-color');
const readline = require('readline');
//#endregion

//#region Discord Imports

//These settings would go in the terminal imports but it crashes due to the order of some other region or something like that
//I have to figure out a way that it doesn't give an error when starting the console

const { HelpMenuEntry } = require('./Commands/helpmenu');
const { SettingsMenuEntry, optionlist} = require('./Commands/settingsmenu');
const { SendMenuHelp } = require('./Commands/sendmenu');

const { token, prefix, activityname, status, 
mainaccowner, altaccowner} = require('./Config/DiscordSettings.json');
    
const { executedcmdslist, defaultembedcolor, channelidslist, formusicstuff} = require('./Helper/lists');
    
//Previously called idkwhylol
const {terminalver, newterminalfeatures, terminalbugfixes, terminalissues,
newfeatures, bugfixes, issues, todo, } = require('./Helper/changelog.json');    
//#endregion    

//#region Check for important files
//I literally copied the fields from the exit event bruh, also im really fucking lazy to fix the spaces and shit in the channel ids field thingy
//#region TerminalConfig.json file fields
    const clearconsoleoptions = {
        "option": optionlist[0].option,
        "state": optionlist[0].state,
    };
        
    const consoletitleoption = {
        "option": optionlist[1].option,
        "value": optionlist[1].value,
    };
        
    const displaytermveroption = {
        "option": optionlist[2].option,
        "state": optionlist[2].state,
    };
        
    const alltogetherig = {
        clearconsoleoptions,
        consoletitleoption,
        displaytermveroption,
    }
        
    const fixedoptionsig = JSON.stringify(alltogetherig, null, 4);
//#endregion
        
//#region New ChannelIDS.json file fields
        //I'm really fucking sorry for all of this
        const fstchnlid = {
            "name": channelidslist[0].name,
            "chnlid": channelidslist[0].chnlid
        };
        const scndchnlid = {
            "name": channelidslist[1].name,
            "chnlid": channelidslist[1].chnlid
        };
        const thrdchnlid = {
            "name": channelidslist[2].name,
            "chnlid": channelidslist[2].chnlid
        };
        const fthchnlid = {
            "name": channelidslist[3].name,
            "chnlid": channelidslist[3].chnlid
        };
        const fifthchlid = {
            "name": channelidslist[4].name,
            "chnlid": channelidslist[4].chnlid
        };
        const sixthchnlid = {
            "name": channelidslist[5].name,
            "chnlid": channelidslist[5].chnlid
        };
        const svnthchnlid = {
            "name": channelidslist[6].name,
            "chnlid": channelidslist[6].chnlid
        };
        const eigthchnlid = {
            "name": channelidslist[7].name,
            "chnlid": channelidslist[7].chnlid
        };
        const nnthchnlid = {
            "name": channelidslist[8].name,
            "chnlid": channelidslist[8].chnlid
        };
        const tnthchnlid = {
            "name": channelidslist[9].name,
            "chnlid": channelidslist[9].chnlid
        };
        const elvnthchnlid = {
            "name": channelidslist[10].name,
            "chnlid": channelidslist[10].chnlid
        };

        const twlvchnlid = {
            "name": channelidslist[11].name,
            "chnlid": channelidslist[11].chnlid
        };
        
        const thrtnchnlid = {
            "name": channelidslist[12].name,
            "chnlid": channelidslist[12].chnlid
        };

        const frtnchnlid = {
            "name": channelidslist[13].name,
            "chnlid": channelidslist[13].chnlid
        };

        const ftennchnlid = {
            "name": channelidslist[14].name,
            "chnlid": channelidslist[14].chnlid
        };

        const sxtennchnlid = {
            "name": channelidslist[15].name,
            "chnlid": channelidslist[15].chnlid
        };

        const svtnchnlid = {
            "name": channelidslist[16].name,
            "chnlid": channelidslist[16].chnlid
        };

        const eitnchnlid = {
            "name": channelidslist[17].name,
            "chnlid": channelidslist[17].chnlid
        };

        const nntnchnlid = {
            "name": channelidslist[18].name,
            "chnlid": channelidslist[18].chnlid
        };

        const twntchnlid = {
            "name": channelidslist[19].name,
            "chnlid": channelidslist[19].chnlid
        };

        const twntochnlid = {
            "name": channelidslist[20].name,
            "chnlid": channelidslist[20].chnlid
        };

        //I'm also really fucking sorry for this too
        const allchannelidstogether = {
            //1, 0
            fstchnlid,
            //2, 1
            scndchnlid,
            //3, 2
            thrdchnlid,
            //4, 3
            fthchnlid,
            //5, 4
            fifthchlid,
            //6, 5
            sixthchnlid,
            //7, 6
            svnthchnlid,
            //8, seven
            eigthchnlid,
            //9, 8
            nnthchnlid,
            //10, 9
            tnthchnlid,
            //11, 10
            elvnthchnlid,
            //New slots
            //12, 11
            twlvchnlid,
            //13, 12
            thrtnchnlid,
            //14, 13
            frtnchnlid,
            //15, 14
            ftennchnlid,
            //16, 15
            sxtennchnlid,
            //17, 16
            svtnchnlid,
            //18, 17
            eitnchnlid,
            //19, 18
            nntnchnlid,
            //20, 19
            twntchnlid,
            //21, 20
            twntochnlid
        }

        const fixedchannelidsig = JSON.stringify(allchannelidstogether, null, 4);
        //#endregion

//#region Example status options fields ig
const quotesthingyfields = {
    "firstquote": "Nunca valoras lo que tienes hasta que lo pierdes",
    "secondstatus": "Yo que se",
    "thirdstatus": "Hola que tal"
};

//I'm extremely sorry for these I'm really fucking dumb
const fixedquotesig = JSON.stringify(quotesthingyfields, null, 4);
//#endregion

try {
    if(!fs.existsSync(__dirname + '/Config/TerminalSettings.json')){
        console.log(clc.yellow("Looks like you don't have a TerminalSettings.json, creating it..."));
        fs.writeFileSync(__dirname + '/Config/TerminalSettings.json', fixedoptionsig);
        console.log(clc.greenBright("Successfully created TerminalSettings.json!\n"));
    }

    if(!fs.existsSync(__dirname + '/Helper/ChannelIDS.json')){
        console.log(clc.yellow("Looks like you don't have a ChannelIDS.json, creating it..."));
        fs.writeFileSync(__dirname + '/Helper/ChannelIDS.json', fixedchannelidsig);
        console.log(clc.greenBright("Successfully created ChannelIDS.json!\n"));
    }

    if(!fs.existsSync(__dirname + '/Helper/StatusOptions.json')){
        console.log(clc.yellow("Looks like you don't have a StatusOptions.json, creating it..."));
        fs.writeFileSync(__dirname + '/Helper/StatusOptions.json', fixedquotesig);
        console.log(clc.greenBright("Successfully created StatusOptions.json!\n"));
    }
} catch (error){
    console.error(error);
    console.log(clc.red("Couldn't make the missing files"))
}
//#endregion

//#region Console Imports
const annchnls = require('./Helper/annchannelids.json');

const TerminalSettings = require('./Config/TerminalSettings.json');

const QuotesOptions = require('./Helper/StatusOptions.json');
//#endregion

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});
//#endregion

client.on('ready', () => {
    //#region Load Terminal settings/stuff
    optionlist[0].state = TerminalSettings.clearconsoleoptions.state;
    optionlist[1].value = TerminalSettings.consoletitleoption.value;
    optionlist[2].state = TerminalSettings.displaytermveroption.state;
    optionlist[3].state = TerminalSettings.autochangestatus.state;
    
    if(optionlist[0].state.includes("Enabled")){
        console.clear();
    }
    
    if (optionlist[2].state.includes("Enabled")){
        process.title = TerminalSettings.consoletitleoption.value + " " + terminalver;
    } else {
        process.title = TerminalSettings.consoletitleoption.value;
    }

    //#region Hell like those below 
    const channelidsstuff = require('./Helper/ChannelIDS.json');

    channelidslist[0].name = channelidsstuff.fstchnlid.name;
    channelidslist[0].chnlid = channelidsstuff.fstchnlid.chnlid;

    channelidslist[1].name = channelidsstuff.scndchnlid.name;
    channelidslist[1].chnlid = channelidsstuff.scndchnlid.chnlid;

    channelidslist[2].name = channelidsstuff.thrdchnlid.name;
    channelidslist[2].chnlid = channelidsstuff.thrdchnlid.chnlid;

    channelidslist[3].name = channelidsstuff.fthchnlid.name;
    channelidslist[3].chnlid = channelidsstuff.fthchnlid.chnlid;

    channelidslist[4].name = channelidsstuff.fifthchlid.name;
    channelidslist[4].chnlid = channelidsstuff.fifthchlid.chnlid;

    channelidslist[5].name = channelidsstuff.sixthchnlid.name;
    channelidslist[5].chnlid = channelidsstuff.sixthchnlid.chnlid;

    channelidslist[6].name = channelidsstuff.svnthchnlid.name;
    channelidslist[6].chnlid = channelidsstuff.svnthchnlid.chnlid;

    channelidslist[7].name = channelidsstuff.eigthchnlid.name;
    channelidslist[7].chnlid = channelidsstuff.eigthchnlid.chnlid;

    channelidslist[8].name = channelidsstuff.nnthchnlid.name;
    channelidslist[8].chnlid = channelidsstuff.nnthchnlid.chnlid;

    channelidslist[9].name = channelidsstuff.tnthchnlid.name;
    channelidslist[9].chnlid = channelidsstuff.tnthchnlid.chnlid;

    channelidslist[10].name = channelidsstuff.elvnthchnlid.name;
    channelidslist[10].chnlid = channelidsstuff.elvnthchnlid.chnlid;
    
    channelidslist[11].name = channelidsstuff.twlvchnlid.name;
    channelidslist[11].chnlid = channelidsstuff.twlvchnlid.chnlid;

    channelidslist[12].name = channelidsstuff.thrtnchnlid.name;
    channelidslist[12].chnlid = channelidsstuff.thrtnchnlid.chnlid;

    channelidslist[13].name = channelidsstuff.frtnchnlid.name;
    channelidslist[13].chnlid = channelidsstuff.frtnchnlid.chnlid;

    channelidslist[14].name = channelidsstuff.ftennchnlid.name;
    channelidslist[14].chnlid = channelidsstuff.ftennchnlid.chnlid;
    
    channelidslist[15].name = channelidsstuff.sxtennchnlid.name;
    channelidslist[15].chnlid = channelidsstuff.sxtennchnlid.chnlid;

    channelidslist[16].name = channelidsstuff.svtnchnlid.name;
    channelidslist[16].chnlid = channelidsstuff.svtnchnlid.chnlid;

    channelidslist[17].name = channelidsstuff.eitnchnlid.name;
    channelidslist[17].chnlid = channelidsstuff.eitnchnlid.chnlid;

    channelidslist[18].name = channelidsstuff.nnthchnlid.name;
    channelidslist[18].chnlid = channelidsstuff.nnthchnlid.chnlid;

    channelidslist[19].name = channelidsstuff.twntchnlid.name;
    channelidslist[19].chnlid = channelidsstuff.twntchnlid.chnlid;

    channelidslist[20].name = channelidsstuff.twntochnlid.name;
    channelidslist[20].chnlid = channelidsstuff.twntochnlid.chnlid;
    //#endregion

    //I'm extremely sorry for this again, I'm really sorry for everything from the settings thingy
    if (optionlist[3].state.includes("Enabled")){
        

        let counter = 0;
        client.user.setPresence({

        })
    } else {
        client.user.setPresence({
            activities: [{
                name: activityname
            }], status: status
        });    
    }
    //#endregion
        
    console.log(clc.green(`Logged in as ${client.user.tag} (I will probably add more stuff to login thingy)\n`));
    console.log(clc.white("Type 'help' to show the list of available commands"))

    //Set the fucking curplayingmusic thingy to false, using the lists.js from the Helper folder
    formusicstuff[0].curplayingmusic = false;

    //#region Terminal Commands
    rl.prompt();

    rl.on('line', (line) => {
        switch (line.trim()) {
            case 'controlling':
                console.log('Currently controlling: ' + clc.cyan(`${client.user.tag}`));
            break;

            case 'status change':
                rl.question('Change the activity name to: ', (newprsncname) => {

                    rl.question('Change the status of the bot (online, idle, dnd): ', (prsncstatus) => {
                        if (newprsncname.length > 0){

                            if(prsncstatus == "online" || prsncstatus == "idle" || prsncstatus == "dnd"){
                                client.user.setPresence({
                                    activities: [{
                                        name: newprsncname
                                    }], status: prsncstatus
                                })
                                console.log(clc.green('The activity name changed to: ') + newprsncname);
                                console.log(clc.green('And the status changed to: ') + prsncstatus);
                                rl.prompt();
                            } else console.log(clc.red('You might want to provide a new status'));
                            rl.prompt();

                        } else console.log(clc.red('You might want to provide a name for the presence'));
                        rl.prompt();
                    })

                })
            break;

            case 'status restart':
                client.user.setPresence({
                    activities: [{
                        name: activityname
                    }], status: status
                });
                console.log(clc.green('Activity name and status went back to normal!'));
            break;

            case 'exit':
                rl.close();
            break;

            case 'ping':
                if(client.ws.ping > "150")
                    console.log('The current ping is: ' + clc.red(`${client.ws.ping}ms`))
                else if(client.ws.ping > "100")
                    console.log('The current ping is: ' + clc.yellow(`${client.ws.ping}ms`))
                else if (client.ws.ping < "100")
                    console.log('The current ping is: ' + clc.green(`${client.ws.ping}ms`)) 
            break;

            case 'uptime':
                let totalSeconds = (client.uptime / 1000);
                let dias = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
    
                let horas = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
    
                let minutos = Math.floor(totalSeconds / 60);
                let segundos = Math.floor(totalSeconds % 60);
                
                console.log(`${dias} days ${horas} hours ${minutos} minutes ${segundos} seconds`);
            break;

            case 'help':
                //idk why i did this but it looked cool ngl
                new HelpMenuEntry('controlling', 'Tells what bot you are controlling');
                new HelpMenuEntry('status change', 'Changes the bot status');
                new HelpMenuEntry('status restart', 'Restarts the bot status');
                new HelpMenuEntry('exit', 'Shutdown the bot and eit the console');
                new HelpMenuEntry('ping', 'Prints the bot ping');
                new HelpMenuEntry('uptime', 'Prints the bot uptime, separated by the days, hours, minutes and seconds');
                new HelpMenuEntry('send', 'Sends a message to a channel, you can specify it or just use the preset ones in the .json file');
                new HelpMenuEntry('settings', 'Displays a settings menu for the console');
                new HelpMenuEntry('restore settings', 'The name says it all, restore settings to its default value');
                new HelpMenuEntry('add channelid', 'You can add a channel id to a list that you can use to send messages to the specified channel id');
                new HelpMenuEntry('restore channelids', 'Basically restores the channel ids');
            break;

            case 'send':
                new SendMenuHelp();
                rl.question('To which channel do you want to send the message? ', (selectedchnlid) => {
                    rl.question('What do you want to say? ', (msgcont) => {
                        if(msgcont.length > 0 ){
                            switch(selectedchnlid){
                                //Weird code lol
                                case "0":
                                    if(channelidslist[0].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[0].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;
                                
                                case "1":
                                    if(channelidslist[1].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[1].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "2":
                                    if(channelidslist[2].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[2].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "3":
                                    if(channelidslist[3].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[3].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;
                                    
                                case "4":
                                    if(channelidslist[4].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[4].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "5":
                                    if(channelidslist[5].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[5].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "6":
                                    if(channelidslist[6].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[6].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "7":
                                    if(channelidslist[7].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[7].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "8":
                                    if(channelidslist[8].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[8].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "9":
                                    if(channelidslist[9].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[9].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "10":
                                    if(channelidslist[10].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[10].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "11":
                                    if(channelidslist[11].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[11].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "12":
                                    if(channelidslist[12].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[12].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "13":
                                    if(channelidslist[13].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[13].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "14":
                                    if(channelidslist[14].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[14].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "15":
                                    if(channelidslist[15].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[15].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "16":
                                    if(channelidslist[16].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[16].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "17":
                                    if(channelidslist[17].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[17].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "18":
                                    if(channelidslist[18].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[18].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "19":
                                    if(channelidslist[19].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[19].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;

                                case "20":
                                    if(channelidslist[20].chnlid.toString().length = 18){
                                        client.channels.cache.get(channelidslist[20].chnlid.toString()).send(msgcont);
                                    } else {
                                        console.log(clc.red("Couldn't find a Channel ID on that list number"));
                                    }
                                    break;
                            }

                            if(selectedchnlid.toString().length == 18){
                                client.channels.cache.get(selectedchnlid).send(msgcont);
                            }
                        }
                        rl.prompt();
                    })
                })
            break;

            case 'settings':
                //gets the list value from the settingsmenu.js lol
                //also i should try to improve this code or smth
                new SettingsMenuEntry(optionlist[0].option, 'When started up the console will be cleared\nIf enabled the console will be wiped once the bot starts', optionlist[0].state, null);
                new SettingsMenuEntry(optionlist[1].option, 'Change the console title\nIts really basic stuff right?', null, optionlist[1].value);
                new SettingsMenuEntry(optionlist[2].option, 'Display the Terminal Version\nIf disabled it wont display the Terminal Version', optionlist[2].state, null);
                new SettingsMenuEntry(optionlist[3].option, 'Auto changes the Bot status/presence', optionlist[3].state, null);

                rl.question('Do you wish to modify some setting? (y/n) ', (confirmation) => {
                    switch(confirmation) {
                        case 'y':
                            rl.question('What option do you want to modify? ', (modifyopt) => {
                                switch(modifyopt){
                                    //for the first option
                                    case optionlist[0].option:
                                        rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                            switch(newoptstate) {
                                                case 'enable':
                                                    optionlist[0].state = "Enabled";
                                                    console.log(clc.green('Successfully enabled ' + clc.white(optionlist[0].option)));
                                                    rl.prompt();
                                                break;

                                                case 'disable':
                                                    optionlist[0].state = "Disabled";
                                                    console.log(clc.green('Successfully disabled ' + clc.white(optionlist[0].option)));
                                                    rl.prompt();
                                                break;

                                                default:
                                                    console.log(clc.red('Maybe you should provide a new state for the option'));
                                                    rl.prompt();
                                                break;
                                            }
                                        })
                                    break;

                                    case optionlist[1].option:
                                        rl.question('Type a new title for the console ', (newconsoletitle) => {
                                            if(newconsoletitle.length > 0){
                                                optionlist[1].value = newconsoletitle;
                                                console.log(clc.green('Successfully changed the console title to ' + clc.white(newconsoletitle)));
                                                rl.prompt();
                                            } else {
                                                console.log(clc.red('Type something longer'));
                                                rl.prompt();
                                            }
                                        })
                                    break;

                                    case optionlist[2].option:
                                        //just a copy paste of the first option lol
                                        rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                            switch(newoptstate) {
                                                case 'enable':
                                                    optionlist[2].state = "Enabled";
                                                    console.log(clc.green('Successfully enabled ' + clc.white(optionlist[2].option)));
                                                    rl.prompt();
                                                break;

                                                case 'disable':
                                                    optionlist[2].state = "Disabled";
                                                    console.log(clc.green('Successfully disabled ' + clc.white(optionlist[2].option)));
                                                    rl.prompt();
                                                break;

                                                default:
                                                    console.log(clc.red('Maybe you should provide a new state for the option'));
                                                    rl.prompt();
                                                break;
                                            }
                                        })
                                    break;

                                    case optionlist[3].option:
                                        //just a copy paste of the first option lol
                                        rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                            switch(newoptstate) {
                                                case 'enable':
                                                    optionlist[3].state = "Enabled";
                                                    console.log(clc.green('Successfully enabled ' + clc.white(optionlist[3].option)));
                                                    rl.prompt();
                                                break;

                                                case 'disable':
                                                    optionlist[3].state = "Disabled";
                                                    console.log(clc.green('Successfully disabled ' + clc.white(optionlist[3].option)));
                                                    rl.prompt();
                                                break;

                                                default:
                                                    console.log(clc.red('Maybe you should provide a new state for the option'));
                                                    rl.prompt();
                                                break;
                                            }
                                        })
                                    break;

                                    default:
                                        console.log(clc.red('Maybe you should provide an option to modify lol'));
                                        rl.prompt();
                                    break;
                                }
                            })
                        break;

                        //these two are useless ig
                        case 'n':
                            rl.prompt();
                        break;

                        default:
                            rl.prompt();
                        break;
                    }
                })
            break;

            case 'restore settings':
                rl.question('Are you sure that you want to restore the Terminal Settings? (y/n) ', (restoreconf) => {
                    switch(restoreconf){
                        case 'y':
                            console.log(clc.red('Restoring Terminal Settings...'));
                            optionlist[0].state = 'Disabled';
                            optionlist[1].value = 'Sanic Bot Terminal';
                            optionlist[2].state = 'Enabled';
                            optionlist[3].state = 'Enabled';
                            console.log(clc.green('Terminal Settings restored! Restart the console to apply the changes'));
                            rl.prompt();
                        break;

                        case 'n':
                            rl.prompt();
                        break;

                        default:
                            console.log(clc.red('Provide a valid answer'));
                            rl.prompt();
                        break;
                    }
                })
            break;

            case 'add channelid':
                rl.question('Please enter the Channel Name: ', (chnlidname) => {
                    if(chnlidname.length > 0){
                        rl.question('Please enter the Channel ID: ', (chnlid) => {
                            if(chnlid.length = 18){
                                rl.question('Where do you want to save this info? (0 to 20): ', (wheretosave) => {
                                    switch(wheretosave){
                                        case "0":
                                            channelidslist[0].name = chnlidname.toString();
                                            channelidslist[0].chnlid = chnlid.toString();
                                            console.log(clc.green("Successfully saved the info to the index 0"));
                                            rl.prompt();
                                            break;

                                        case "1":
                                            channelidslist[1].name = chnlidname;
                                            channelidslist[1].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 1"));
                                            rl.prompt();
                                            break;

                                        case "2":
                                            channelidslist[2].name = chnlidname;
                                            channelidslist[2].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 2"));
                                            rl.prompt();
                                            break;

                                        case "3":
                                            channelidslist[3].name = chnlidname;
                                            channelidslist[3].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 3"));
                                            rl.prompt();
                                            break;

                                        case "4":
                                            channelidslist[4].name = chnlidname;
                                            channelidslist[4].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 4"));
                                            rl.prompt();
                                            break;

                                        case "5":
                                            channelidslist[5].name = chnlidname;
                                            channelidslist[5].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 5"));
                                            rl.prompt();
                                            break;

                                        case "6":
                                            channelidslist[6].name = chnlidname;
                                            channelidslist[6].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 6"));
                                            rl.prompt();
                                            break;

                                        case "7":
                                            channelidslist[7].name = chnlidname;
                                            channelidslist[7].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 7"));
                                            rl.prompt();
                                            break;

                                        case "8":
                                            channelidslist[8].name = chnlidname;
                                            channelidslist[8].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 8"));
                                            rl.prompt();
                                            break;

                                        case "9":
                                            channelidslist[9].name = chnlidname;
                                            channelidslist[9].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 9"));
                                            rl.prompt();
                                            break;
                                        
                                        case "10":
                                            channelidslist[10].name = chnlidname;
                                            channelidslist[10].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 10"));
                                            rl.prompt();
                                            break;

                                        case "11":
                                            channelidslist[11].name = chnlidname;
                                            channelidslist[11].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 11"));
                                            rl.prompt();
                                            break;

                                        case "12":
                                            channelidslist[12].name = chnlidname;
                                            channelidslist[12].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 12"));
                                            rl.prompt();
                                            break;

                                        case "13":
                                            channelidslist[13].name = chnlidname;
                                            channelidslist[13].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 13"));
                                            rl.prompt();
                                            break;

                                        case "14":
                                            channelidslist[14].name = chnlidname;
                                            channelidslist[14].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 14"));
                                            rl.prompt();
                                            break;

                                        case "15":
                                            channelidslist[15].name = chnlidname;
                                            channelidslist[15].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 15"));
                                            rl.prompt();
                                            break;

                                        case "16":
                                            channelidslist[16].name = chnlidname;
                                            channelidslist[16].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 16"));
                                            rl.prompt();
                                            break;

                                        case "17":
                                            channelidslist[17].name = chnlidname;
                                            channelidslist[17].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 1"));
                                            rl.prompt();
                                            break;

                                        case "18":
                                            channelidslist[18].name = chnlidname;
                                            channelidslist[18].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 18"));
                                            rl.prompt();
                                            break;

                                        case "19":
                                            channelidslist[19].name = chnlidname;
                                            channelidslist[19].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 19"));
                                            rl.prompt();
                                            break;

                                        case "20":
                                            channelidslist[20].name = chnlidname;
                                            channelidslist[20].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 20"));
                                            rl.prompt();
                                            break;
                                    }
                                })
                            } else {
                                console.log(clc.red("This doesn't look like a Channel ID\n(Channel ID must be 18 characters long)"))
                            }
                        })
                    } else {
                        console.log(clc.red('Please provide a longer name'));
                        rl.prompt();
                    }
                })

            break;

            case 'restore channelids':
                rl.question('Are you sure that you want to restore the Channel IDS json? (y/n) ', (restoreconf) => {
                    switch(restoreconf){
                        case 'y':
                            console.log(clc.red('Restoring the Channel IDS json...'));

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

                            console.log(clc.green('Channel IDS json restored! Restart the console to apply the changes'));
                            rl.prompt();
                        break;

                        case 'n':
                            rl.prompt();
                        break;

                        default:
                            console.log(clc.red('Provide a valid answer'));
                            rl.prompt();
                        break;
                    }
                })
            break;

            default:
                console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`)));
            break;
        }
        rl.prompt();
    }).on('close', () => {
        //const clearconsoleonstartupopt = optionlist[0].option + "\n" + optionlist[0].state;
        //#region TerminalConfig.json file fields
        const clearconsoleoptions = {
            "option": optionlist[0].option,
            "state": optionlist[0].state,
        };
        
        const consoletitleoption = {
            "option": optionlist[1].option,
            "value": optionlist[1].value,
        };
        
        const displaytermveroption = {
            "option": optionlist[2].option,
            "state": optionlist[2].state,
        };

        const autochangestatus = {
            "option": optionlist[3].option,
            "state": optionlist[3].state,
        }
        
        const alltogetherig = {
            clearconsoleoptions,
            consoletitleoption,
            displaytermveroption,
            autochangestatus,
        }
        
        const fixedoptionsig = JSON.stringify(alltogetherig, null, 4);
        //#endregion
        
        //#region New ChannelIDS.json file fields, reworking the field names cuz large
        //I'm really fucking sorry for all of this
        const fstchnlid = {
            "name": channelidslist[0].name,
            "chnlid": channelidslist[0].chnlid
        };
        const scndchnlid = {
            "name": channelidslist[1].name,
            "chnlid": channelidslist[1].chnlid
        };
        const thrdchnlid = {
            "name": channelidslist[2].name,
            "chnlid": channelidslist[2].chnlid
        };
        const fthchnlid = {
            "name": channelidslist[3].name,
            "chnlid": channelidslist[3].chnlid
        };
        const fifthchlid = {
            "name": channelidslist[4].name,
            "chnlid": channelidslist[4].chnlid
        };
        const sixthchnlid = {
            "name": channelidslist[5].name,
            "chnlid": channelidslist[5].chnlid
        };
        const svnthchnlid = {
            "name": channelidslist[6].name,
            "chnlid": channelidslist[6].chnlid
        };
        const eigthchnlid = {
            "name": channelidslist[7].name,
            "chnlid": channelidslist[7].chnlid
        };
        const nnthchnlid = {
            "name": channelidslist[8].name,
            "chnlid": channelidslist[8].chnlid
        };
        const tnthchnlid = {
            "name": channelidslist[9].name,
            "chnlid": channelidslist[9].chnlid
        };
        const elvnthchnlid = {
            "name": channelidslist[10].name,
            "chnlid": channelidslist[10].chnlid
        };

        const twlvchnlid = {
            "name": channelidslist[11].name,
            "chnlid": channelidslist[11].chnlid
        };
        
        const thrtnchnlid = {
            "name": channelidslist[12].name,
            "chnlid": channelidslist[12].chnlid
        };

        const frtnchnlid = {
            "name": channelidslist[13].name,
            "chnlid": channelidslist[13].chnlid
        };

        const ftennchnlid = {
            "name": channelidslist[14].name,
            "chnlid": channelidslist[14].chnlid
        };

        const sxtennchnlid = {
            "name": channelidslist[15].name,
            "chnlid": channelidslist[15].chnlid
        };

        const svtnchnlid = {
            "name": channelidslist[16].name,
            "chnlid": channelidslist[16].chnlid
        };

        const eitnchnlid = {
            "name": channelidslist[17].name,
            "chnlid": channelidslist[17].chnlid
        };

        const nntnchnlid = {
            "name": channelidslist[18].name,
            "chnlid": channelidslist[18].chnlid
        };

        const twntchnlid = {
            "name": channelidslist[19].name,
            "chnlid": channelidslist[19].chnlid
        };

        const twntochnlid = {
            "name": channelidslist[20].name,
            "chnlid": channelidslist[20].chnlid
        };

        //I'm also really fucking sorry for this too
        const allchannelidstogether = {
            //1, 0
            fstchnlid,
            //2, 1
            scndchnlid,
            //3, 2
            thrdchnlid,
            //4, 3
            fthchnlid,
            //5, 4
            fifthchlid,
            //6, 5
            sixthchnlid,
            //7, 6
            svnthchnlid,
            //8, seven
            eigthchnlid,
            //9, 8
            nnthchnlid,
            //10, 9
            tnthchnlid,
            //11, 10
            elvnthchnlid,
            //New slots
            //12, 11
            twlvchnlid,
            //13, 12
            thrtnchnlid,
            //14, 13
            frtnchnlid,
            //15, 14
            ftennchnlid,
            //16, 15
            sxtennchnlid,
            //17, 16
            svtnchnlid,
            //18, 17
            eitnchnlid,
            //19, 18
            nntnchnlid,
            //20, 19
            twntchnlid,
            //21, 20
            twntochnlid
        }

        const fixedchannelidsig = JSON.stringify(allchannelidstogether, null, 4);
        //#endregion
        
        try {
            console.log(clc.white('\n-------------------')); //Idk why the fuck did i do this but looks cool ig lol
            console.log(clc.yellowBright('Trying to save the terminal settings...'));
            fs.writeFileSync(__dirname + '/Config/TerminalSettings.json', fixedoptionsig);
            console.log(clc.green('Saved terminal settings!'));
            console.log(clc.white('\n-------------------'));
            console.log(clc.yellowBright('Trying to save the channel ids...'));
            fs.writeFileSync(__dirname + "/Helper/ChannelIDS.json", fixedchannelidsig);
            console.log(clc.green('Saved new channel ids!\nProceeding with the shutdown'));

        } catch (error) {
            console.error(error);
        }

        console.log(clc.white('-------------------'))
        console.log(clc.red('Shutting down Sanic Bot'));
        client.destroy();
        console.log(clc.red('Closing the console...'));
        process.exit(0);
    });
    //#endregion
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    let args = message.content.substring(prefix.length).split(" ");

    let erigai = ["si sos", "no sos"];

    let randomgai2 = erigai[Math.floor(Math.random() * erigai.length)];

    switch(args[0])
    {
        case 'ping':
            const pingembedsomethingfirst = new Discord.MessageEmbed()
            .setTitle('Calculating the bot ping...');

            message.reply({
                embeds: [pingembedsomethingfirst]
            }).then(resultMessage => {
                const msgigping = resultMessage.createdTimestamp - message.createdTimestamp

                const pingembedsomethingsecond = new Discord.MessageEmbed()
                .setTitle('Pong!')
                .addFields
                (
                    { name: 'Bot Latency ', value: `${msgigping}ms`, inline: true},
                    { name: 'Bot Ping ', value: `${client.ws.ping}ms`, inline: true}
                ).setColor('#008000');

                resultMessage.edit({
                    embeds: [pingembedsomethingsecond]
                });
            });

            executedcmdslist[0].exectimes++;
            executedcmdslist[0].lastusertoexec = message.author.tag;

            executedcmdslist[0].latestexc = true;
            executedcmdslist[1].latestexc = false;
            executedcmdslist[2].latestexc = false;
        break;

        case 'changelog':
            const changelogembed = new Discord.MessageEmbed()
            .setTitle('Sanic Bot Changelog')
            .setColor('#0099ff')
            .addFields(
                {name: 'New Terminal Features', value: newterminalfeatures},
                {name: 'Terminal Bug Fixes', value: terminalbugfixes},
                {name: 'Terminal Issues', value: terminalissues},

                {name: '\u200B', value: '\u200B'},

                {name: 'New Features', value: newfeatures},
                {name: 'Bug Fixes', value: bugfixes},
                {name: 'Issues', value: issues},
                {name: 'To Do', value: todo}
            )
            .setFooter('Terminal Version: ' + terminalver + ' | Sanic Bot Version: ' + activityname + '\nA Full changelog will be available soon')
            message.reply({
                embeds: [changelogembed]
            });

            executedcmdslist[1].exectimes++;
            executedcmdslist[1].lastusertoexec = message.author.tag;

            executedcmdslist[0].latestexc = false;
            executedcmdslist[1].latestexc = true;
            executedcmdslist[2].latestexc = false;
        break;

        case 'reproducir':
            const { channel } = message.member.voice;

            if(!channel) return message.reply('Necesitas estar en un canal de voz!');
            const permissions = channel.permissionsFor(message.client.user);
            if(!permissions.has('CONNECT')) return message.reply('No tienes los permisos correctos');
            if(!permissions.has('SPEAK')) return message.reply('No tienes los permisos correctos');
            if(!args[1]) return message.reply('Necesitas añadir un link o poner una frase para buscar la música');

            let VoiceConnection = Voice.joinVoiceChannel({channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator});

            const videoFinder = async(query) => {
                const videoResult = await ytSearch(query);

                return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(args.join(' '));
            
            if(video) {
                const streamurl = ytdl(video.url, {filter: 'audioonly'});

                const resource = Voice.createAudioResource(streamurl, {inlineVolume: true});
                resource.volume.setVolume(0.2);
                const player = Voice.createAudioPlayer();
                VoiceConnection.subscribe(player);
                player.play(resource);

                const funnyvidembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Ahora reproduciendo ***${video.title}***`)
                .setDescription(video.description)
                .setImage(video.image)
                .setAuthor(video.author.name)
                .setURL(video.url);

                await message.channel.send({embeds: [funnyvidembed]});
                formusicstuff[0].curplayingmusic = true;

                VoiceConnection.on(Voice.VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
                    try {
                        await Promise.race([
                            Voice.entersState(connection, Voice.VoiceConnectionStatus.Signalling, 5_000),
                            Voice.entersState(connection, Voice.VoiceConnectionStatus.Connecting, 5_000),
                        ]);
                    } catch (error) {
                        connection.destroy();
                    }
                });
            } else {
                const funnynoresultsfound = new Discord.MessageEmbed()
                .setTitle('No se han encontrado resultados');

                message.channel.send({ embeds: [funnynoresultsfound]});
            }
        break;

        case 'desconectarse':
            const whythefuckitisntworking = message.member.voice;
            const connection = Voice.getVoiceConnection(whythefuckitisntworking.guild.id);

            if(!whythefuckitisntworking.channel) return message.reply('Necesitas estar en un canal de voz para poder parar de reproducir música!');
            //I'm really fucking sorry for this if condition
            if(formusicstuff[0].curplayingmusic == false) return message.reply('No estoy reproduciendo música actualmente'); 
            if(Voice.VoiceConnectionStatus.Ready || formusicstuff[0].curplayingmusic == true){
                const funnystopmusicsad = new Discord.MessageEmbed()
                .setTitle('Parando de reproducir música :pensive:');

                await message.channel.send({ embeds: [funnystopmusicsad]});
                connection.destroy();
                formusicstuff[0].curplayingmusic = true;
            }
        break;
        
        //k mierda man mira como cambiarlo a que sea como antes osea soy gai? 
        case 'gaycheck':
            const funnygaiembedxd = new Discord.MessageEmbed()
            .setTitle(randomgai2)
            .setDescription("Se siente hermano");

            const funnynotgaiembedxd = new Discord.MessageEmbed()
            .setTitle(randomgai2)
            .setDescription("Que suerte tienes manito");

            if(randomgai2 == "si sos"){
                message.reply({embeds: [funnygaiembedxd]});
            } else {
                message.reply({embeds: [funnynotgaiembedxd]});
            }
       
        break;

        
    }
})

client.login(token);