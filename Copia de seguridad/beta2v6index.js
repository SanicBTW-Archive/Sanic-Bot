const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const spprchnlids = require('./channelids.json')

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

client.on('ready', () => {
  //#region Logs innecesarios lol
  console.log(' - INICIO DE SESIÓN - ')
  console.log(`Se ha iniciado sesión como ${client.user.tag}`)

  console.log(' - ARCHIVOS CARGADOS (.json) - ')
  console.log('Archivo de configuración cargado (config.json)')
  console.log('Archivo de IDs de canales soportados cargado (channelids.json)')

  console.log(' - CONFIGURACIÓN DEL BOT - ')
  console.log('El prefijo actual es: ' + config.prefix)
  console.log('El estado actual es: ' + config.estado)
  console.log('El estado largo actual es: ' + config.estadolargo)
  //#endregion

  client.user.setPresence({
    activity: {
      name: config.estado,
      type: 0,
    },
  })

  //#region Cosas de la entrada de la consola
  rl.prompt();

  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'controlando':
        console.log(`Actualmente estas controlando a: ${client.user.tag}`)
      break;

      case 'cambiar estado':
        rl.question('Que quieres poner de estado personalizado: ', (respuesta) => {
          client.user.setPresence({
            activity: {
              name: respuesta,
              type: 0,
            },
          })
          rl.prompt();
        })
      break;

      case 'reiniciar estado':
        client.user.setPresence({
          activity: {
            name: config.estado,
            type: 0,
          },
        })      
      break;

      case 'enviar':
        console.log('1 General (Prueba bot): ' + spprchnlids['General (Prueba bot)'] + '\n' 
        + '2 Prueba (Prueba bot): ' + spprchnlids['Prueba (Prueba bot'])
        rl.question('A donde quieres enviarlo? ', (selectedchnldid) => {
          rl.question('Que quieres decir: ', (msgcont) => {
            if (msgcont.length > 0){
              if (selectedchnldid === '1'){
                client.channels.cache.get(spprchnlids['General (Prueba bot)']).send(msgcont)
              } else if (selectedchnldid === '2'){
                client.channels.cache.get(spprchnlids['Prueba (Prueba bot']).send(msgcont)
              }  
            }
            /*

            if (chnlid.length > 0 && msgcont.length > 0){
              client.channels.cache.get(chnlid).send(msgcont);
            }
            */
            rl.prompt();
          })
        })
      break;

      case 'ejecutar':
        rl.question('Que quieres ejecutar? ', (respuesta) => {
          eval(respuesta);
          rl.prompt();
        })
      break;

      case 'salir':
        rl.close();
      break

      default:
        console.log(`error ejecutando: '${line.trim()}', seguramente no existe`);
      break;
    }
    rl.prompt();
  }).on('close', () => {
    console.log('\nApagando Sanic Bot V6...');
    client.destroy();
    console.log('Saliendo...')
    process.exit(0);
  });
  //#endregion

})

client.on('message', (message) => {

})

client.login(config.token);