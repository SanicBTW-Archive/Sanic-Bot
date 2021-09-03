const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Se ha iniciado sesión como ${client.user.tag}`);
    document.getElementById("botstatus").innerHTML = "Bot Status: Online";
});