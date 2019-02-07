const YTDL = require("ytdl-core");
const Discord = require('discord.js');

var servers = {};

function processCommand(msg) {
    let fullCmd = msg.content.substr(1) // Remove o !
    let splitCmd = fullCmd.split(" ") // Transforma num array pelos espaços
    let primaryCmd = splitCmd[0];
    let args = splitCmd.slice(1);

    switch(primaryCmd) {
        case 'help':
            help(args, msg);
            break;
        case 'multiply':
            multiply(args, msg);
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
                queue: [],
                cache: [],
            }

            var server = servers[msg.guild.id];

            server.queue.push(args[0]);
            server.cache.push(args[0]);

            if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(conn) {
                play(conn, msg);
            });

            break;

        case 'next':
            var server = servers[msg.guild.id];

            if(server.dispatcher) servers.dispatcher.end();
            break;

        case 'stop':
            var server = servers[msg.guild.id];

            if(msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
            break;

        case 'queue':
            var server = servers[msg.guild.id];

            if(server == undefined || server.cache.length <= 0) {
                msg.channel.send({embed: {
                    title: 'A playlist dos cornos está sem músicas no momento ;-;',
                    color: 15105570
                }});
            } else {
                const embed = new Discord.RichEmbed();
                embed.setTitle('Playlist dos cornos');
                embed.setColor(15105570);
                let wait = 0;
                let description = "";
                server.cache.forEach(url => {
                    YTDL.getInfo(url, (err, info) => {
                        if(url == server.queue[-1]) {
                            description = description.concat(`** - ${info.title}**
                            `);
                        } else {
                            description = description.concat(` - ${info.title}
                            `);
                        }
                        wait++;
                        if(wait == server.cache.length) {
                            embed.setDescription(description);
                            msg.channel.send(embed);
                        }
                    });
                });
            }
            break;

        case 'team':
            const embed = new Discord.RichEmbed();
            embed.setTitle('Line up principal dos cornos');
            embed.setColor(15105570);
            break;  

        default:
            msg.channel.send('Faça seu berrante tocar mais alto, não entendi seu comando. Tente pedir ajuda `!help`');
            break;
            
    }
}

function help(args, msg) {
    if(args.length > 0) {
        msg.channel.send("Parece que o corno precisa de ajuda com " + args);
    }  else {
        msg.channel.send("Não entendi com o que o corno precisa de ajuda. Tente `!help [tópico]`");
    }
}

function multiply(args, msg) {
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

    server.dispatcher = conn.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    YTDL.getInfo(server.queue[0], (err, info) => {
        msg.channel.send({embed: {
            color: 3447003,
            title: "Um corno chorando ao som de " + info.title,
            url: info.video_url,
        }});
    });
    server.queue[-1] = server.queue[0];
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
        if(server.queue[0]) {
            play(conn, msg);
        } 
        else conn.disconnect();
    });
}

exports.processCommand = processCommand;


