const channelidsthing = require('./channelids.json');
const annchannelidsthing = require('./annchannelids.json');

const statusquestions = [
    {
        type: 'input',
        name: 'newprsnc',
        message: 'Change the activity name to: '
    },
    {
        type: 'list',
        name: 'selstatus',
        message: 'Change the status of the bot  (dnd, idle, etc): ',
        choices: ['online', 'idle', 'dnd', 'invisible']
    }
]

const normalmsgquestions = [
    {
        type: 'list',
        name: 'selchnlid',
        message: 'To which channel do you want to send the message?',
        choices: ["General (Prueba bot)", "Prueba (Prueba bot)"]
    },
    {
        type: 'input',
        name: 'msgcont',
        message: 'What do you want to say? '
    }
]

const embedmsgquestions = [
    {
        //wip
    }
]

const addchannelquestions = [
    {
        type: 'input',
        name: 'channelidname',
        message: 'Type the name of the channel: '
    },
    {
        type: 'input',
        name: 'channelid',
        message: 'Paste the Channel ID: '
    }
]

module.exports = {
    statusquestions,
    normalmsgquestions,
    embedmsgquestions,
    addchannelquestions
}