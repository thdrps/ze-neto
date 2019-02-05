const Discord = require('discord.js');
const cmd = require('./functions.js');
const config = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity(config.activity.doing, {type: config.activity.type});

    // Canais
    const batePapo = client.channels.get(config.channels.batePapo);
    const musica = client.channels.get(config.channels.musica);

    // Mandando uma mensagem no canal
    batePapo.send("ATENÇÃO, ESTÁ ABERTA A REUNIÃO DE TODOS OS CORNOS");

    // Postando uma imagem ou um arquivo no canal
    const img = new Discord.Attachment(config.image);
    batePapo.send(img);
});

// Respondendo uma mensagem
client.on('message', message => {
    // Previnir o bot de responder sua própria mensagem
    if(message.author == client.user) return;

    if(message.content.startsWith(config.prefix)) {
        cmd.processCommand(message);
        message.react(config.emojis.boi);
    }
});

client.login(config.token);