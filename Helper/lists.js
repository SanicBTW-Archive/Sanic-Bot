//Used to save values for the lastexecuted command for the terminal
//I have to port this to support new command handler bruh
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

//please tell me there is an easier way or something to do this
var idkwhythefuck = [
    { lasttime: Date.now()}
]

module.exports = {
    executedcmdslist,
    idkwhythefuck
}