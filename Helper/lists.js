//Used to save values for the lastexecuted command for the terminal
var executedcmdslist = [
    { sprcmd: 'ping', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'changelog', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'shutdown', exectimes: 0, lastusertoexec: 'user', latestexc: false}
];

//Really bad way to store a value but meh
//Plus doesn't really work for some reason so uh yeah
var defaultembedcolor = [
    { defaultcolor: '#0099ff', oldcolor: '#0099ff'}
];

//Gonna try to improve the channel ids system 
var channelidslist = [
    { chnlid: 0, name: ''}, //0
    { chnlid: 0, name: ''}, //1
    { chnlid: 0, name: ''}, //2
    { chnlid: 0, name: ''}, //3
    { chnlid: 0, name: ''}, //4
    { chnlid: 0, name: ''}, //5
    { chnlid: 0, name: ''}, //6
    { chnlid: 0, name: ''}, //7
    { chnlid: 0, name: ''}, //8
    { chnlid: 0, name: ''}, //9
    { chnlid: 0, name: ''}, //10
];


module.exports = {
    executedcmdslist,
    channelidslist
}