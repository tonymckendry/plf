var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgress://localhost/plf'
})

router.get('/signin', function(req, res, next){
  res.render('auth/signin')
})

module.exports = router;
