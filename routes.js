const express = require('express')
const videos = require('./data')
const teachers = require('./teachers')
const routes = express.Router()


routes.get('/', function(req, res){
    return res.render('index')
})

routes.get('/about', function(req, res){
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

routes.get('/studywithme', function(req, res){
    return res.render('studywithme', { items: videos })
})

routes.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if(!video){
        return res.send("Video not found!")
    }

    return res.render('video', { item: video })
})

routes.get('/teachers', function(req, res){
    return res.render('teachers/teachers')
})

routes.get('/teachers/create', function(req, res){
    return res.render('teachers/create')
})

routes.post('/teachers', teachers.post)

routes.get('/students', function(req, res){
    return res.render('students')
})

module.exports = routes