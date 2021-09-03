const Discord = require('discord.js');
const client = new Discord.Client();

//#region Config stuff and channel ids and shit like that
const config = require('./Config/configuracion.json');
const inqquest = require('./Config/inquirerquestions');
const spprchnlids = require('./Config/channelids.json');
const annchnls = require('./Config/annchannelids.json');
//#endregion

const clc = require('cli-color');

const vorpal = require('vorpal')();

client.on('ready', () => {
    console.log(`Se ha iniciado sesión como ${client.user.tag}`);

    client.user.setPresence({
        activity: {
            name: config.estado,
            type: 0,
        },
    })

    //#region Vorpal
    
    //#region Configuracion vorpal ig
    vorpal
        .delimiter(clc.cyan('sanicbotcli~$'))
        .show();

    const exit = vorpal.find('exit');
    if(exit) {
        exit.remove();
    }
    //#endregion

    //#region Apagado/Salida
    vorpal
        .command('salir')
        .description('Apaga Sanic Bot V6 y termina el proceso de la consola')
        .action(function(callback){
            this.log(clc.cyan('Apagando Sanic Bot V6 y saliendo de la consola...'));
            client.destroy();
        })
    //#endregion

    //#region Controlando
    vorpal
        .command('controlando')
        .description('Te dice a que bot estas controlando actualmente')
        .action(function(args, callback){
            this.log('Estas controlando a: ' + clc.cyan(`${client.user.tag}`))
            callback();
        })
    //#endregion

    //#region Estado
    vorpal
        .command('estado')
        .description('Cambia el estado de Sanic Bot V6')
        .option('-r, --reiniciar')
        .option('-c, --cambiar')
        .action(function(args, callback) {

            const self = this;

            if(args.options.reiniciar){
                client.user.setPresence({
                    activity: {
                        name: config.estado,
                        type: 0,
                    },
                })
                self.log(clc.green('Estado reiniciado!'))
            } else if (args.options.cambiar) {
                return this.prompt({
                    type: 'input',
                    name: 'newprsnc',
                    message: 'Que quieres poner de estado personalizado: ',
                }).then((answers) => {
                    client.user.setPresence({
                        activity: {
                            name: answers.newprsnc.toString(),
                            type: 0,
                        },
                    })
                    self.log(clc.green('Se ha cambiado el estado a: ') + answers.newprsnc.toString())
                })
            } else {
                self.log(clc.red('Necesitas añadir una opción para poder usar este comando ("-r o -c")'))
            }
            callback();
        })
    //#endregion

    //#region Enviar
    vorpal
        .command('enviar')
        .description('Envia un mensaje a un canal soportado')
        .option('-n, --normalmsg', 'Envia mensaje normal, sin embed')
        .option('-e, --embedmsg', 'Envia mensaje con embed, restringido a canales para anunciar cosas')
        .action(function(args, callback){

            const self = this;

            if(args.options.normalmsg) 
            {
                return this.prompt(inqquest.normalmsgquestions).then((answers) => {
                    if(answers.msgcont.length > 0)
                    {
                        switch (answers.selchnlid)
                        {
                            case 'General (Prueba bot)':
                                client.channels.cache.get(spprchnlids['General (Prueba bot)']).send(answers.msgcont)
                            break;

                            case 'Prueba (Prueba bot)':
                                client.channels.cache.get(spprchnlids['Prueba (Prueba bot)']).send(answers.msgcont)
                            break;
                        }
                    }
                })
            } 

            else if (args.options.embedmsg)
            {
                self.log(clc.yellow('En desarrollo'))
            }

            else 
            {
                self.log(clc.red('Necesitas poner una opción para poder usar el comando ("-n o -e")'))
            }
            callback();
        })
    //#endregion

    //#region Ping
    vorpal
        .command('ping')
        .description('Te dice el ping actual del bot')
        .action(function(args, callback) {
            this.log('El ping actual de Sanic Bot es de: ' + clc.yellow(`${client.ws.ping}ms`))
            callback();
        })
    //#endregion

    //#endregion
})

client.on('message', message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    let args = message.content.substring(config.prefix.length).split(" ");

    switch(args[0])
    {
        case 'ping':
            message.reply('pong');
            vorpal.log('El siguiente usuario ha ejecutado "ping": ' + clc.blue(message.author.tag))
        break;
    }
})

client.login(config.token);