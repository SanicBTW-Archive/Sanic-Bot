//Redo the channelids system in a way that it isnt a lot of useless code lol

//#region Discord stuff
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
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
    
const { executedcmdslist, defaultembedcolor, channelidslist} = require('./Helper/lists');
    
//Previously called idkwhylol
const {terminalver, newterminalfeatures, terminalbugfixes, terminalissues,
newfeatures, bugfixes, issues, todo, } = require('./Helper/changelog.json');    
//#endregion    

//#region Check if the term settings file exists, due to my horrible coding skills cant figure out how to check if the file exists without moving the important shit
try {
    if(!fs.existsSync(__dirname + '/Config/TerminalSettings.json')){
        console.log(clc.yellow("Looks like you don't have a TerminalSettings.json"));
        console.log(clc.red("Can't proceed with the bot startup"));
    }
} catch (error){
    console.error(error);
    console.log(clc.red("Couldn't make TerminalSettings.json"))
}
//#endregion

//#region Console Imports
//const spprchnlids = require('./Helper/channelids.json');

const annchnls = require('./Helper/annchannelids.json');

const TerminalSettings = require('./Config/TerminalSettings.json');
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
    
    if(optionlist[0].state.includes("Enabled")){
        console.clear();
    }
    
    if (optionlist[2].state.includes("Enabled")){
        process.title = TerminalSettings.consoletitleoption.value + " " + terminalver;
    } else {
        process.title = TerminalSettings.consoletitleoption.value;
    }

    const channelidsstuff = require('./Helper/ChannelIDS.json');

    //Load the first thingy lol
    channelidslist[0].name = channelidsstuff.firstchannelid.name;
    channelidslist[0].chnlid = channelidsstuff.firstchannelid.chnlid;

    //Load the second thingy lol
    channelidslist[1].name = channelidsstuff.secondchannelid.name;
    channelidslist[1].chnlid = channelidsstuff.secondchannelid.chnlid;

    //Load the third thingy lol
    channelidslist[2].name = channelidsstuff.thirdchannelid.name;
    channelidslist[2].chnlid = channelidsstuff.thirdchannelid.chnlid;

    //Load the fourth thingy lol
    channelidslist[3].name = channelidsstuff.fourthchannelid.name;
    channelidslist[3].chnlid = channelidsstuff.fourthchannelid.chnlid;

    //Load the fifth thingy lol
    channelidslist[4].name = channelidsstuff.fifthchannelid.name;
    channelidslist[4].chnlid = channelidsstuff.fifthchannelid.chnlid;

    //Load the sixth thingy lol
    channelidslist[5].name = channelidsstuff.sixthchannelid.name;
    channelidslist[5].chnlid = channelidsstuff.sixthchannelid.chnlid;

    //Load the seventh thingy lol
    channelidslist[6].name = channelidsstuff.seventhchannelid.name;
    channelidslist[6].chnlid = channelidsstuff.seventhchannelid.chnlid;

    //Load the eighth thingy lol
    channelidslist[7].name = channelidsstuff.eighthchannelid.name;
    channelidslist[7].chnlid = channelidsstuff.eighthchannelid.chnlid;

    //Load the nineth thingy lol
    channelidslist[8].name = channelidsstuff.ninethchannelid.name;
    channelidslist[8].chnlid = channelidsstuff.ninethchannelid.chnlid;

    //Load the tenth thingy lol
    channelidslist[9].name = channelidsstuff.tenthchannelid.name;
    channelidslist[9].chnlid = channelidsstuff.tenthchannelid.chnlid;

    //Load the eleventh thingy lol
    channelidslist[10].name = channelidsstuff.eleventhchannelid.name;
    channelidslist[10].chnlid = channelidsstuff.eleventhchannelid.chnlid;

    //#endregion
        
    console.log(clc.green(`Logged in as ${client.user.tag} (I will probably add more stuff to login thingy)\n`));
    console.log(clc.white("Type 'help' to show the list of available commands"))

    client.user.setPresence({
        activities: [{
            name: activityname
        }], status: status
    });

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
                                rl.question('Where do you want to save this info? (0 to 10): ', (wheretosave) => {
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
                            const channelidsstuff = require('./Helper/ChannelIDS.json');

                            //Restore the first thingy lol
                            channelidslist[0].name = "";
                            channelidslist[0].chnlid = 0;
                    
                            //Restore the second thingy lol
                            channelidslist[1].name = "";
                            channelidslist[1].chnlid = 0;
                    
                            //Restore the third thingy lol
                            channelidslist[2].name = "";
                            channelidslist[2].chnlid = 0;
                    
                            //Restore the fourth thingy lol
                            channelidslist[3].name = "";
                            channelidslist[3].chnlid = 0;
                    
                            //Restore the fifth thingy lol
                            channelidslist[4].name = "";
                            channelidslist[4].chnlid = 0;
                    
                            //Restore the sixth thingy lol
                            channelidslist[5].name = "";
                            channelidslist[5].chnlid = 0;
                    
                            //Restore the seventh thingy lol
                            channelidslist[6].name = "";
                            channelidslist[6].chnlid = 0;
                    
                            //Restore the eighth thingy lol
                            channelidslist[7].name = "";
                            channelidslist[7].chnlid = 0;
                    
                            //Restore the nineth thingy lol
                            channelidslist[8].name = "";
                            channelidslist[8].chnlid = 0;
                    
                            //Restore the tenth thingy lol
                            channelidslist[9].name = "";
                            channelidslist[9].chnlid = 0;
                    
                            //Restore the eleventh thingy lol
                            channelidslist[10].name = "";
                            channelidslist[10].chnlid = 0;
                    
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

        const usechannelidsjson = {
            "option": optionlist[3].option,
            "state": optionlist[3].state
        };
        
        
        const alltogetherig = {
            clearconsoleoptions,
            consoletitleoption,
            displaytermveroption,
            usechannelidsjson
        }
        
        const fixedoptionsig = JSON.stringify(alltogetherig, null, 4);
        //#endregion
        
        //#region New ChannelIDS.json file fields
        //Holy shit what in the world is this
        const firstchannelid = {
            "name": channelidslist[0].name,
            "chnlid": channelidslist[0].chnlid
        };
        const secondchannelid = {
            "name": channelidslist[1].name,
            "chnlid": channelidslist[1].chnlid
        };
        const thirdchannelid = {
            "name": channelidslist[2].name,
            "chnlid": channelidslist[2].chnlid
        };
        const fourthchannelid = {
            "name": channelidslist[3].name,
            "chnlid": channelidslist[3].chnlid
        };
        const fifthchannelid = {
            "name": channelidslist[4].name,
            "chnlid": channelidslist[4].chnlid
        };
        const sixthchannelid = {
            "name": channelidslist[5].name,
            "chnlid": channelidslist[5].chnlid
        };
        const seventhchannelid = {
            "name": channelidslist[6].name,
            "chnlid": channelidslist[6].chnlid
        };
        const eighthchannelid = {
            "name": channelidslist[7].name,
            "chnlid": channelidslist[7].chnlid
        };
        const ninethchannelid = {
            "name": channelidslist[8].name,
            "chnlid": channelidslist[8].chnlid
        };
        const tenthchannelid = {
            "name": channelidslist[9].name,
            "chnlid": channelidslist[9].chnlid
        };
        const eleventhchannelid = {
            "name": channelidslist[10].name,
            "chnlid": channelidslist[10].chnlid
        };

        const allchannelidstogether = {
            firstchannelid,
            secondchannelid,
            thirdchannelid,
            fourthchannelid,
            fifthchannelid,
            sixthchannelid,
            seventhchannelid,
            eighthchannelid,
            ninethchannelid,
            tenthchannelid,
            eleventhchannelid
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

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    let args = message.content.substring(prefix.length).split(" ");

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
    }

})

client.login(token);