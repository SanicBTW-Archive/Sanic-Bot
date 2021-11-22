//TODO: Redo the code sometime for now its working okay ig
//TODO 2: Add debug stuff 
//Check todo lol
//Also I think this is kind of unncessary as you will download the source stuff with everything in it ig lol but just in case
const { optionlist } = require('../Commands/Settings');
const { channelidslist, quotesoptions } = require('./Lists');
const fs = require('fs');
const { Log } = require('./Log');
const path = require('path');
const termsetdir = path.join(__dirname, '..', "Config"  ,'TerminalSettings.json');
const chnlidfiledir = path.join(__dirname, 'ChannelIDS.json');

//#region Terminal Settings Fields
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

const useconsole = {
    "option": optionlist[3].option,
    "state": optionlist[3].state,
}

const debuglogs = {
    "option": optionlist[4].option,
    "state": optionlist[4].state
}
    
const alltogetherig = {
    clearconsoleoptions,
    consoletitleoption,
    displaytermveroption,
    useconsole,
    debuglogs
}
    
const fixedoptionsig = JSON.stringify(alltogetherig, null, 4);
//#endregion

//#region New ChannelIDS.json file fields
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

class CheckFiles {
    constructor(wtcheck){
        this.wtcheck = wtcheck; //wtcheck = what to check

        if(wtcheck == "TerminalSettings"){
            try{
                if(!fs.existsSync(termsetdir)){
                    new Log("You don't seem to have the Settings File, creating it...", 3);
                    fs.writeFileSync(termsetdir, fixedoptionsig);
                    new Log("Created TerminalSettings.json", 1);
                }
            }
            catch (ex){
                new Log(ex, 4);
            }
        } else if (wtcheck == "ChannelIDS"){
            try{
                if(!fs.existsSync(chnlidfiledir)){
                    new Log("You don't seem to have the Channel IDS File, creating it...", 3);
                    fs.writeFileSync(chnlidfiledir, fixedchannelidsig);
                    new Log("Created ChannelIDS.json", 1);
                }
            }
            catch (ex){
                new Log(ex, 4);
            }
        }
    }
}

module.exports = { CheckFiles };