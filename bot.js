const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require('./functions.js');
const config = require('./config.json');

client.on('ready', () => {
    client.user.setActivity(config.activity.doing, {type: config.activity.type});

    // Canais
    const batePapo = client.channels.get(config.channels.batePapo);
    const musica = client.channels.get(config.channels.musica);
    

    // Listando os servers em que o bot está conectado
    console.log('Servers:')
    client.guilds.forEach(guild => {
        console.log(" - " + guild.name)

        // Listado todos os canais
        guild.channels.forEach(channel => {
            console.log(` -- ${channel.name} (${channel.type} - ${channel.id})`);
        });
    });

    // Mandando uma mensagem no canal
    batePapo.send("ATENÇÃO, ESTÁ ABERTA A REUNIÃO DE TODOS OS CORNOS");


    // Postando uma imagem ou um arquivo no canal
    const img = new Discord.Attachment('C:/Users/Gugale/Pictures/enrico.jpg');
    batePapo.send(img);
});

// Respondendo uma mensagem
client.on('message', message => {
    // Previnir o bot de responder sua própria mensagem
    if(message.author == client.user) {
        return;
    }

    if(message.content.startsWith(config.prefix)) {
        cmd.processCommand(message);
        message.react(config.emojis.boi);
    }

    // Marcando um usuário
    // message.channel.send(`Mensagem recebida de ${message.author.toString()}: ${message.content}`);
    
    // Checando se o bot foi marcado na mensagem
    // if(message.content.includes(client.user.toString())) {
    //     message.channel.send(`Mensagem recebida de ${message.author.toString()}: ${message.content}`);
    // }
});

client.login(config.token);