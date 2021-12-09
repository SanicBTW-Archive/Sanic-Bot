//it uses lists to get real time changes and stuff
const ChannelIDSDataJSON = require('../Data/ChannelIDS.json');
const Log = require('../Log/Log');
const {ChannelIDSDataLIST} = require('./Lists');
const DSettings = require('../Config/DSettings.json');

/**
 * 
 * @param {Number} SlotSomething - To access the specified channel id thingy on json and the list lol
 */
module.exports = (SlotSomething) => {
    //nigga what, it ill let me load the thingy here but not in the load function
    //I could do it with the for statement but uhhhhhhhhhh
    var Max = 55; //Dumb shit
    var Min = 5; //Stupid shit
    if(DSettings.AmountOfChnlIDsSupp > Max)
    {
        Log("Exceeding the Channel IDS Limit", 2);
    }
    else if(DSettings.AmountOfChnlIDsSupp < Min)
    {
        Log("Not enough Channel IDS to load", 2);
    }
    else if(DSettings.AmountOfChnlIDsSupp < Max || DSettings.AmountOfChnlIDsSupp == Max)
    {
        switch(SlotSomething)
        {
            case 0:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 1:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 2:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 3:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 4:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 5:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 6:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 7:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 8:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 9:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 10:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 11:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 12:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 13:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 14:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 15:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 16:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 17:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 18:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 19:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 20:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 21:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 22:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 23:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 24:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 25:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 26:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 27:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 28:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 29:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 30:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 31:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 32:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 33:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 34:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 35:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 36:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 37:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 38:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 39:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 40:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 41:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 42:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 43:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 44:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 45:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 46:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 47:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 48:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 49:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 50:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 51:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 52:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 53:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 54:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
            case 55:
                if(ChannelIDSDataJSON[SlotSomething].ChannelID.length == 18)
                {
                    ChannelIDSDataLIST[SlotSomething].ChannelID = ChannelIDSDataJSON[SlotSomething].ChannelID;
                    ChannelIDSDataLIST[SlotSomething].ChannelName = ChannelIDSDataJSON[SlotSomething].ChannelName;
                }
            break;
        }
    }
}