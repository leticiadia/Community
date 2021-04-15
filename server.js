// Essa linha de código, está sendo responsável por importar o express, através do require.
// Require é uma opção do node para chamar o express para a variável express.
const express = require('express')

// Essa linha de código, está sendo responsável por importar o nunjucks, através do require.
const nunjucks = require('nunjucks')

// Quando você quiser chamar um arquivo que não está na pasta node_modules ou npm
// Você coloca um ./ (raiz do projeto)
const videos = require('./data')

// Aqui criamos uma variável chamada server que está recebendo como valor a função express()
// Pode parecer confuso, mas a função express está sendo exportada a partir do módulo express.
// Lembrando que o express é um framework e ele vai trazer funcionalidades que facilitam processar as coisas no servidor.
const server = express()

// Inicializando o servidor... Lembre-se que o servidor fica ouvindo alguma coisa, que nesse caso é uma porta.
// Essa function é uma callback, que seria uma função dentro de outra função.
server.listen(5502, function(){
    console.log('server is running')
})

// Pegando a rota principal...
// req = require (requisição) | res = response (resposta)
// render() é usado para renderizar um arquivo.
server.get('/', function(req, res){
    return res.render('index')
})

server.get('/studywithme', function(req, res){
    return res.render('studywithme', { items: videos })
})

server.get('/about', function(req, res){
    const about = {
        image_logo: "image/logocommunity.jpg",
        title: "Community",
        description: "Platform that aims to create study environments for students.",
        list: [
            {stack: "HTML"},
            {stack: "CSS"},
            {stack: "JavaScript"}
        ],

        link: [
            {name: "Github", url: "https://github.com/"},
            {name: "Twitter", url: "https://twitter.com/"},
            {name: "Instagram", url: "https://www.instagram.com/"}
        ]
    }

    return res.render('about', { about })
})

// Definir qual o motor de busca...
server.set('view engine', 'njk')

// Configurando o nunjucks. Primeiramente você vai dizer a pasta onde está o arquivo.
// Em seguida pede as opções, que passamos em forma de objeto.
// express: server, que dizer que vou usar o express e que a variável que estou usando para express é o server.
nunjucks.configure('views', {
    express: server,
    noCache: true
})

// Para o servidor usar arquivos estaticos...
server.use(express.static('public'))

// Para o servidor pegar o id do vídeo...
server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        if(video.id == id){
            return true
        }
    })

    if(!video){
        return res.send("Video not found!")
    }

    return res.render('video', { item: video })
})




