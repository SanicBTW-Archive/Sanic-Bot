//Used to save values for the lastexecuted command for the terminal
//{ sprcmd: '', exectimes: 0, lastusertoexec: 'user', latestexc: false},

//should improve it or something lol, also i should make something for the args thingy
//once this update is pushed i will look a way to improve this
//also the args arent really that important because im stupid or something lol
var commands = [
    { name: String}, //ping
    { name: String, argtip: String}, //play
    { name: String}, //stop
    { name: String, arg1: String, arg2: String, arg3: String}, //ayuda
    { name: String, arg1: String}, //apagar
    { name: String, arg1: String}, //preguntar consola
    { name: String, argtip: String}, //purge
    { name: String, arg1: String, argtip: String}, //add channelid
    { name: String, arg1: String, arg2: String, argtip: String}, //repetir
    { name: String} //servidores
];

//I want to remake this br

var executedcmdslist = [
    { sprcmd: 'ping', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'play', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'stop', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'ayuda', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'apagar', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'preguntar consola', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'purge', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'add channelid', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'repetir', exectimes: 0, lastusertoexec: 'user', latestexc: false}, //funny thing is that i aint doing shit for the args, global command only
];

//Gonna try to improve the channel ids system 
//The type should be normal or announcements, probably gonna work on this new sys whenever i feel like it
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
    //New slots
    { chnlid: 0, name: ''}, //11
    { chnlid: 0, name: ''}, //12
    { chnlid: 0, name: ''}, //13
    { chnlid: 0, name: ''}, //14
    { chnlid: 0, name: ''}, //15
    { chnlid: 0, name: ''}, //16
    { chnlid: 0, name: ''}, //17
    { chnlid: 0, name: ''}, //18
    { chnlid: 0, name: ''}, //19
    { chnlid: 0, name: ''}, //20
];

//I'm extremely fucking sorry for this, I don't know any other way to check if I'm playing music
var formusicstuff = [
    { curplayingmusic: true | false, repeat: false, repeaturl: null}
]

var loaderstuff = [
    { saidloaded: false}
];

module.exports = {
    commands,
    channelidslist,
    formusicstuff,
    loaderstuff,
    executedcmdslist
}