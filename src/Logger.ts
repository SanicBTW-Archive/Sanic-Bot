//stolen from my typescript test project
//todo: make so every line that was prompted while calling the logger prints the [ level ] or while using \n instead of calling the logger again
//todo 2: actually use the enum correctly

import clc from 'cli-color';

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

/**
 * 
 * @param message message to print
 * @param loglevel log level to use - 0 info, 1 warning, 2 error, 3 debug, 4 successful
 */
export function Logger(message:any, loglevel:number)
{
    switch(loglevel)
    {
        case 0:
            console.log(infoColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
        case 1:
            console.log(warningColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
        case 2:
            console.error(errorColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
        case 3:
            console.log(debugColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
        case 4:
            console.log(succColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
    }
}