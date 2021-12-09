const clc = require('cli-color');

/**
 * 
 * @param {String} message - Message to log
 * @param {Number} loglevel - 0 Info | 1 Warning | 2 Error | 3 Debug | 4 Successful
 */
module.exports = (message, loglevel) => {
    const infoColor = clc.greenBright;
    const warningColor = clc.yellowBright;
    const errorColor = clc.redBright.bold;
    const debugColor = clc.cyanBright;
    const succColor = clc.cyan;

    switch(loglevel)
    {
        case 0:
            console.log(infoColor("Info: ") + message);
            break;
        case 1:
            console.log(warningColor("Warning! ") + message);
            break;
        case 2:
            throw errorColor("ERROR! ") + message;
        case 3:
            console.log(debugColor("Debug: ") + message);
            break;
        case 4:
            console.log(succColor("Successful! ") + message);
            break;
        default:
            console.log(warningColor("Warning! Log Level Not Set or Not Recognized ") + message);
            break;
    }
}