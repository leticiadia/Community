const express = require('express')
const videos = require('./data')
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')
const routes = express.Router()


routes.get('/', function(req, res){
    return res.render('index')
})

routes.get('/index', function(req, res){
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


routes.get('/teachers', teachers.index)

routes.get('/teachers/create', teachers.create)

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/:id/edit', teachers.edit)

routes.post('/teachers', teachers.post)

routes.put('/teachers', teachers.put)

routes.delete('/teachers', teachers.delete)


//

routes.get('/students', students.index)

routes.get('/students/create', students.create)

routes.get('/students/:id', students.show)

routes.get('/students/:id/edit', students.edit)

routes.post('/students', students.post)

routes.put('/students', students.put)

routes.delete('/students', students.delete)

module.exports = routes