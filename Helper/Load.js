//#region Important stuff
const DSettings = require('../Config/DSettings.json');
const IDSFormatter = require('./IDSHelper');
const Log = require('../Log/Log');
//#endregion

/**
 * 
 * @param {String} WhatToLoad - Basically loads the thing specified when calling the function
 */
module.exports = (WhatToLoad) => 
{
    var LoadedIDS = 0;
    //here should go the rest of the var that counts the loaded stuff

    //here should go the said loaded thingy

    if(WhatToLoad == "Channel IDS")
    {
        for(var thingy = 0; thingy < DSettings.AmountOfChnlIDsSupp; thingy++)
        {
            IDSFormatter(thingy);
            LoadedIDS ++;
        }
        Log(`Loaded ${LoadedIDS} Channel IDS`, 4);
    }
    //here should go the settings load sys, ig i need to improve the settings or something
    //here should go the commands (still dont know for what this is tho) load sys, ig i need to improve everything of it
}