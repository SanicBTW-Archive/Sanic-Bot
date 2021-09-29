//probably not the best way on doing settings stuff, probably have to 
//figure out some way to make some list to save settings temp and then 
//save it into a json file that will load from it automatically ig
const clc = require('cli-color');

//idk why i did it here but ig it fits here
var optionlist = [
    { option: 'clear console on startup', state: 'Disabled', value: null},
    { option: 'console title', state: null, value: 'Sanic Bot Terminal'},
    { option: 'display terminal version', state: 'Enabled', value: null},
    { option: 'use channelids.json', state: 'Disabled', value: null},
];

class SettingsMenuEntry {
    constructor(option, description, curstate, value) {
        this.option = option;
        this.description = description;
        this.curstate = curstate;
        this.value = value;

        if(curstate == "Active" || curstate == "On" || curstate == "Enabled" && value == null){
            console.log(clc.cyan(option) + " " + clc.white(description) + "\nCurrent state: " + clc.green(curstate));
        }

        else if (curstate == "Inactive" || curstate == "Off" || curstate == "Disabled" && value == null) {
            console.log(clc.cyan(option) + " " + clc.white(description) + "\nCurrent state: " + clc.red(curstate));
        }
         
        else if (curstate == null && value.length > 0){
            console.log(clc.cyan(option) + " " + clc.white(description) + "\nCurrent value: " + clc.white(value)); 
        }

    }
}

module.exports = { SettingsMenuEntry, optionlist }