//stolen from my typescript test project
//i have a problem, if i only want to show debug logs when the setting is enabled then ill have a problem when trying to hide them when the logger is already running (idk how to explain)

import clc from 'cli-color';
import { ReturnFields, ReturnOptState} from './Returner';

//it gets the option from the json because when the load function is called the logger is used in some cases
let MainJSON = ReturnFields(3);
let LogColorsState = ReturnOptState(MainJSON);

var infoColor = clc.greenBright;
var warningColor = clc.yellowBright;
var errorColor = clc.redBright.bold;
var debugColor = clc.cyanBright;
var succColor = clc.cyan;

enum LogLevels
{
    "INFO",
    "WARNING",
    "ERROR",
    "DEBUG",
    "SUCCESSFUL"
}

type LogLevelStrings = keyof typeof LogLevels;

export function Logger(message:any, key:LogLevelStrings)
{
    const theThing = `[ ${key} ] `;
    /* for debug purposes
    const num = LogLevels[key];
    console.log("log level key " + key);
    console.log("log level val " + num);
    console.log("log level message " + message);*/

    switch(key)
    {
        case 'INFO':
            if(LogColorsState == "enabled") return console.log(infoColor(theThing) + message);
            else if(LogColorsState == "disabled") return console.log(theThing + message);
            break;
        case 'WARNING':
            if(LogColorsState == "enabled") return console.log(warningColor(theThing) + message);
            else if(LogColorsState == "disabled") return console.log(theThing + message);
            break;
        case 'ERROR':
            if(LogColorsState == "enabled") return console.log(errorColor(theThing) + message);
            else if(LogColorsState == "disabled") return console.log(theThing + message);
            break;
        case 'DEBUG':
            if(LogColorsState == "enabled") return console.log(debugColor(theThing) + message);
            else if(LogColorsState == "disabled") return console.log(theThing + message);
            break;
        case 'SUCCESSFUL':
            if(LogColorsState == "enabled") return console.log(succColor(theThing) + message);
            else if(LogColorsState == "disabled") return console.log(theThing + message);
            break;
    }
}