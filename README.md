# Zé neto
![variableunlawfulleafwing-size_restricted](https://user-images.githubusercontent.com/31370547/52280006-fca81e00-2941-11e9-8c23-a4256ba08568.gif)

## História
Nascido em 2019. Zé Neto é um bot que foi desenvolvido para um servidor no discord cujo objetivo era ajudar na sofrências de seus usuários. Com o nome inspirado no canto Zé Neto da dupla Zé Neto e Cristiano, o bot tem a capacidade de tocar músicas em que o chifre começa a doer, a tristeza começa a chegar e bebida desce pela garganta. Aproveitando as mais diversas funcionalidades, o bot foi feito para todos seus amigos gados demais que você conhece. Conhece aquele seu amigo que sofre pela morena? Esse bot foi feito pra ele.

## Configurações iniciais
Primeiramente, instale todas as dependências com
```
npm install
```

Logo após, você precisa ter um arquivo ```config.json``` igual a esse:
```
{
    "token": "" // Aqui vai o token do seu bot,
    "prefix": "" // Aqui vai o prefixo dos comandos,
    "image": "" // Aqui vai a imagem de quando o bot é startado, se desejar,
    "activity": { // A atividade que estará sendo mostrado no bot
        "doing": "",
        "type": "" // Existem quatro tipos. WATCHING, STREAMING, LISTENING, PLAYING
    },
    "channels": { // Aqui são os canais em que o bot pode se comunir
        "channel": "" // ID do canal,
    },
    "emojis": { // Aqui são emojis q você pode colar para utilizar no seu bot
        "boi": "🐂"
    }
}
```
