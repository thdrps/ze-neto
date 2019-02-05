function processCommand(msg) {
    let fullCmd = msg.content.substr(1) // Remove o !
    let splitCmd = fullCmd.split(" ") // Transforma num array pelos espaços
    let primaryCmd = splitCmd[0];
    let args = splitCmd.slice(1);

    console.log("Comando recebido:" + primaryCmd);
    console.log("Argumentos:" + args);

    if(primaryCmd == 'help') {
        helpCommand(args, msg);
    } else if(primaryCmd == 'multiply') {
        multiplyCommand(args, msg);
    } else {
        msg.channel.send('Faça seu berrante tocar mais alto, não entendi seu comando. Tente pedir ajuda `!help`');
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

exports.processCommand = processCommand;


