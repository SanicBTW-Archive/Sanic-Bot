//I have to comment this, too lazy to do it rn bruh

//Used to save values for the lastexecuted command for the terminal
//I have to port this to support new command handler bruh
var executedcmdslist = [
    { sprcmd: 'ping', exectimes: 0, lastusertoexec: 'user', latestexc: false},
];

//Used to log the user who sent the shutdown petition
//and to save the vorpal answer towards the petition
var shutdownlistig = [
    { userwhosentshutdown: 'user', vorpalanswer: true | false}
];

//Although its not permament ill see a way to save the channel ids and then manually saving them into the file
var tempchannelids = [
    { channelIDName: 'Channel ID Name', channelIDSubmit: 'Channel ID'},
];

module.exports = {
    executedcmdslist,
    shutdownlistig,
    tempchannelids
}