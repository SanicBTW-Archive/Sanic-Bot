const normalmsgquestions = [
    {
        type: 'list',
        name: 'selchnlid',
        message: 'A que canal quieres enviarlo?',
        choices: ["General (Prueba bot)", "Prueba (Prueba bot)"]
    },
    {
        type: 'input',
        name: 'msgcont',
        message: 'Que quieres decir? '
    }
]

const embedmsgquestions = [
    {
        //en progreso, revisar tablero de trello para saber que falta
    }
]

module.exports = {
    normalmsgquestions
}