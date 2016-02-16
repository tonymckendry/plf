var express = require('express');
var router = express.Router();
var passport = require('passport')
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgress://localhost/plf'
})

function User(){
return knex('users');
}


router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}),
function(req, res, next){
  var useriD = req.user.fb_id
  if (req.user[0] !== undefined){
    User().select().where('username', req.user[0].username).then(function(results){
      res.cookie('user', results[0].id)
      res.cookie('username', results[0].username)
      res.redirect('/')

    })
  } else{
    User().select().where('fb_id', useriD).then(function(results){
      res.cookie('user', results[0].id)
      res.redirect('/auth/choose')
    })
  }
})

router.get('/choose', function(req, res, next){
  var user = req.cookies.user
  res.render('auth/choose', {user: user})
})

router.get('/signin', function(req, res, next){
  res.render('auth/signin')
})

router.get('/signout', function(req, res, next) {
  console.log('signout route');
  res.clearCookie("user");
  res.clearCookie("username");
  res.redirect("/");
});

router.get('/profile', function(req, res, next){
  User().where('id', req.cookies.id).first().then(function(result){
    res.render('auth/profile', {username: req.cookies.username, user: result})
  })
})

module.exports = router;
