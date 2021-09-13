const channelidsthing = require('./channelids.json');
const annchannelidsthing = require('./annchannelids.json');
const inquirer = require('inquirer');

//these can be simplified but i like it this way and probably i have more control over this than other cases so
//my english sucks ass lmao

const statusquestions = [
    {
        type: 'input',
        name: 'newprsnc',
        message: 'Change the activity name to: '
    },
    {
        type: 'list',
        name: 'selstatus',
        message: 'Change the status of the bot (You have to be mentally retarded to choose invisible): ',
        choices: ['online', 'idle', 'dnd', 'invisible']
    }
]

const msgtypethingy = [
    {
        type: 'list',
        name: 'msgtype',
        message: 'What type of message do you want to send?',
        choices: ['Normal', 'Embed', 'Custom']
    }
]

const normalmsgquestions = [
    {
        type: 'list',
        name: 'selchnlid',
        message: 'To which channel do you want to send the message?',
        choices: ["General (Prueba bot)", "Prueba (Prueba bot)", new inquirer.Separator()]
    },
    {
        type: 'input',
        name: 'msgcont',
        message: 'What do you want to say? '
    }
]

const embedmsgquestions = [
    {
        type: 'list',
        name: 'selchnlid',
        message: 'To which channel do you want to send the message?',
        choices: ["Noticias (Prueba bot)", new inquirer.Separator()]
    },
    {
        type: 'input',
        name: 'embedtitle',
        message: 'What should be the embed title? '
    },
    {
        type: 'input',
        name: 'embeddesc',
        message: 'What should be the embed description? '
    },
    {
        type: 'input',
        name: 'embedfooter',
        message: 'What should be the embed footer? '
    },
    //I have to make a list to get the default embed color and to change it instead of using a json because i can use it after changing it
    {
        type: 'input',
        name: 'embedcolor',
        message: 'What should be the color of the embed? (Leaving it blank it will use the default color, ONLY HEX VALUES) '
    }
]

const custommsgtype = [
    {
        type: 'list',
        name: 'custommsgtype',
        message: 'What type of message do you want to send?',
        choices: ['Normal', 'Embed']
    },
]

const custommsgquestions = [
    {
        type: 'input',
        name: 'customchnlid',
        message: 'Please type a Channel ID you want to send a message to: '
    },
    {
        type: 'input',
        name: 'msgcont',
        message: 'What to do you want to say? '
    }
]

const custommsgquestionsembed = [
    //pending, also should change the example js thingy
]


module.exports = {
    statusquestions,
    msgtypethingy,
    normalmsgquestions,
    embedmsgquestions,
    custommsgtype,
    custommsgquestions,
    custommsgquestionsembed,
}