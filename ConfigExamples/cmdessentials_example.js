//This is used for some vorpal commands that uses questions which includes inquirer.js so you can modify these
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
        message: 'what channel do you want to send the message to',
        choices: ["your choices here or specified channel ids in the json file"]
    },
    {
        type: 'input',
        name: 'msgcont',
        message: 'what do you want to say? '
    }
]

const embedmsgquestions = [
    {
        //This is in work, I will probably update this when I finish the main one lol
    }
]

module.exports = {
    statusquestions,
    normalmsgquestions
}