module.exports = (app) => {
    const users = require('../controllers/users.controller');
    const news = require('../controllers/news.controller');
    const router = require('express').Router();

    router.get('/users', users.findAll)
    router.post('/user', users.create)
    router.get('/user/:_id', users.findOne)
    router.put('/user/:_id', users.update)
    router.delete('/user/:_id', users.delete)

    router.get('/news', news.findAll)
    router.post('/news', news.create)
    router.get('/news/:_id', news.findOne)
    router.put('/news/:_id', news.update)
    router.delete('/news/:_id', news.delete)

    app.use(router)
}