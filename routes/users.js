var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Users(){
  return knex('users')
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/users', function(req, res, next) {
  Users().insert(req.body).then(function(val){
    Users().where('username', req.body.username).first().then(function (result) {
      res.cookie("user", result.id);
      res.cookie("username", result.username);
      res.redirect("/");
    })
  });
});

router.post('/users/uName', function(req, res, next){
  Users().where('id', req.body.userId).update('username', req.body.uName).then(function(results){
    res.cookie('username', req.body.uName)
    res.redirect('/')
  })
})
module.exports = router;
