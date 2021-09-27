//probably not the best way on doing settings stuff, probably have to 
//figure out some way to make some list to save settings temp and then 
//save it into a json file that will load from it automatically ig
const clc = require('cli-color');

//idk why i did it here but ig it fits here
var optionlist = [
    { option: 'clear console on startup', state: 'Disabled', value: null},
    { option: 'console title', state: null, value: 'Sanic Bot Terminal'},
    { option: 'display terminal version', state: 'Enabled', value: null},
];

class SettingsMenu {
    //hardcoded :pensive: :sob:
    constructor(category) {
        this.category = category;

        if(category == "Terminal"){
            console.log(clc.white('--- TERMINAL ---'));

            if(optionlist[0].state == "Enabled"){
                console.log(clc.cyan(optionlist[0].option) + " " + clc.white("When started up the console will be cleared") +
                "\nCurrent state: " + clc.green(optionlist[0].state));
            } else {
                console.log(clc.cyan(optionlist[0].option) + " " + clc.white("When started up the console will be cleared") +
                "\nCurrent state: " + clc.red(optionlist[0].state));
            }

            console.log(clc.cyan(optionlist[1].option) + " " + clc.white("Change the console title") + 
            "\nCurrent value: " + optionlist[1].value);

            if(optionlist[2].state == "Enabled"){
                console.log(clc.cyan(optionlist[2].option) + " " + clc.white("Display the Terminal Version") +
                "\nCurrent state: " + clc.green(optionlist[2].state));
            } else {
                console.log(clc.cyan(optionlist[2].option) + " " + clc.white("Display the Terminal Version") +
                "\nCurrent state: " + clc.red(optionlist[2].state));
            }
        } 

        else if (category == "Discord Bot"){
            console.log(clc.white('--- DISCORD BOT ---'));

            console.log(clc.red('No settings are available'))
        }
    }
}

//useless but looks cool imo
class PrintAvailableCat {
    constructor(category, description, alias){
        this.category = category;
        this.description = description;
        this.alias = alias;

        console.log(clc.blue(category) + " " + clc.yellow(" Alias: " + alias) + "\n" + clc.white(description))
    }
}

module.exports = { SettingsMenu, optionlist, PrintAvailableCat }