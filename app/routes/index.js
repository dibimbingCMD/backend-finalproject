module.exports = (app) => {
  const users = require('../controllers/users.controller');
  const news = require('../controllers/news.controller');
  const router = require('express').Router();

  router.get('/user', users.findAll);
  router.post('/register', users.create);
  router.post('/login', users.login);
  router.get('/user/:_id', users.findOne);
  router.put('/user/:_id', users.update);
  router.delete('/user/:_id', users.delete);

  router.get('/news', news.findAll);
  router.post('/news/:_id', news.create);
  router.get('/news/:_id', news.findOne);
  router.post('/search', news.searchNews);
  router.get('/dashboard/:_id', news.findUser);
  router.put('/news/:_id', news.update);
  router.delete('/news/:_id', news.delete);

  app.use(router);
};
