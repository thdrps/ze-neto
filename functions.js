const YTDL = require("ytdl-core");

var servers = {};

function processCommand(msg) {
    let fullCmd = msg.content.substr(1) // Remove o !
    let splitCmd = fullCmd.split(" ") // Transforma num array pelos espaços
    let primaryCmd = splitCmd[0];
    let args = splitCmd.slice(1);

    console.log("Comando recebido:" + primaryCmd);
    console.log("Argumentos:" + args);

    switch(primaryCmd) {
        case 'help':
            helpCommand(args, msg);
            break;
        case 'multiply':
            multiplyCommand(args, msg);
            break;
        case 'play':
            if(!args[0]) {
                msg.channel.send("Por favor, coloque uma música de corno!");
                return;
            }
            
            if(!msg.member.voiceChannel) {
                msg.channel.send("Esteja em um canal de voz!");
                return;
            }

            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }

            var server = servers[msg.guild.id];

            server.queue.push(args[0]);

            if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(conn) {
                play(conn, msg);
            });

            break;

        case 'skip':
            var server = servers[msg.guild.id];

            if(server.dispatcher) servers.dispatcher.end();
            break;

        case 'stop':
            var server = servers[msg.guild.id];

            if(msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
            break;

        default:
            msg.channel.send('Faça seu berrante tocar mais alto, não entendi seu comando. Tente pedir ajuda `!help`');
            break;
    }
}

function helpCommand(args, msg) {
    if(args.length > 0) {
        msg.channel.send("Parece que o corno precisa de ajuda com " + args);
    }  else {
        msg.channel.send("Não entendi com o que o corno precisa de ajuda. Tente `!help [tópico]`");
    }
}

function multiplyCommand(args, msg) {
    if(args.length < 2) {
        msg.channel.send("Sem valores o suficiente. Tente `!multiply 2 4 10` ou `!multiply 5.2 7`");
        return;
    }

    let product = 1;
    args.forEach(value => {
        product *= parseFloat(value);
    });

    msg.channel.send(`O produto de ${args} multiplicados juntos é: ${product.toString()}`)
}

function play(conn, msg) {
    let server = servers[msg.guild.id];
    console.log(server.queue);
    server.dispatcher = conn.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if(server.queue[0]) play(conn, msg);
        else conn.disconnect();
    });
}

exports.processCommand = processCommand;


