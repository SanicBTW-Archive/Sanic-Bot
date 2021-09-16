//Used to save values for the lastexecuted command for the terminal
//I have to port this to support new command handler bruh
var executedcmdslist = [
    { sprcmd: 'ping', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'changelog', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'shutdown', exectimes: 0, lastusertoexec: 'user', latestexc: false}
];

//Used to log the user who sent the shutdown petition
//and to save the vorpal answer towards the petition
var shutdownlistig = [
    { userwhosentshutdown: 'user', vorpalanswer: true | false}
];

//Really bad way to store a value but meh
//Plus doesn't really work for some reason so uh yeah
var defaultembedcolor = [
    { defaultcolor: '#0099ff', oldcolor: '#0099ff'}
];

module.exports = {
    executedcmdslist,
    shutdownlistig,
    
}